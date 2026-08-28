import { describe, expect, it } from 'vitest';
import { extractNamedText, extractTraits, parseJsonLike } from '../lib/ai/json';

describe('extractNamedText', () => {
    it('reads a JSON name field', () => {
        expect(extractNamedText('{"name":"Branimir"}', ['name'])).toBe('Branimir');
    });

    it('reads a capitalized Name field from fenced JSON', () => {
        expect(extractNamedText('```json\n{"Name":"Ana"}\n```', ['name'])).toBe('Ana');
    });

    it('accepts a bare name when the model ignores json mode', () => {
        expect(extractNamedText('Dragovan', ['name'])).toBe('Dragovan');
    });

    it('reads villageName and falls back to name', () => {
        expect(extractNamedText('{"villageName":"Krakatos Hollow"}', ['villageName', 'name'])).toBe('Krakatos Hollow');
        expect(extractNamedText('Luln', ['villageName', 'name'])).toBe('Luln');
    });

    it('returns empty when parseJsonLike yields an object without the field and the text is not a name', () => {
        expect(extractNamedText('{"foo":1}', ['name'])).toBe('');
        expect(parseJsonLike('{"foo":1}')).toEqual({ foo: 1 });
    });
});

describe('extractTraits', () => {
    it('reads the JSON keys the prompt asks for', () => {
        const traits = extractTraits('{"positivePhysical":"Scarred knuckles","positiveMental":"Keeps a ledger","negative":"Drinks before a fight"}');
        expect(traits.positivePhysical).toBe('Scarred knuckles');
        expect(traits.positiveMental).toBe('Keeps a ledger');
        expect(traits.negative).toBe('Drinks before a fight');
    });

    it('reads Physical / Mental / Flaw labels when Codex skips JSON', () => {
        const traits = extractTraits([
            'Sure, here are the traits.',
            'Physical: Broad shoulders from the mill.',
            'Mental: Quiet around priests.',
            'Flaw: Superstitious about night roads.',
        ].join('\n'));
        expect(traits.positivePhysical).toContain('mill');
        expect(traits.positiveMental).toContain('priests');
        expect(traits.negative).toContain('Superstitious');
    });

    it('reads markdown and numbered labels', () => {
        const traits = extractTraits([
            '**Physical:** Broad shoulders from the mill.',
            '2. Mental quirk: Quiet around priests.',
            '3. Flaw: Superstitious about night roads.',
        ].join('\n'));
        expect(traits.positivePhysical).toContain('mill');
        expect(traits.positiveMental).toContain('priests');
        expect(traits.negative).toContain('Superstitious');
    });

    it('reads nested traits objects and inline keys if JSON is messy', () => {
        const nested = extractTraits('{"traits":{"physical":"Scarred knuckles","mental":"Keeps a ledger","flaw":"Drinks before a fight"}}');
        expect(nested.positivePhysical).toBe('Scarred knuckles');
        expect(nested.positiveMental).toBe('Keeps a ledger');
        expect(nested.negative).toBe('Drinks before a fight');
        const messy = extractTraits('Here you go {positivePhysical:"Scarred knuckles", positiveMental:"Keeps a ledger", negative:"Drinks before a fight"}');
        expect(messy.positivePhysical).toBe('Scarred knuckles');
        expect(messy.positiveMental).toBe('Keeps a ledger');
        expect(messy.negative).toBe('Drinks before a fight');
    });
});
