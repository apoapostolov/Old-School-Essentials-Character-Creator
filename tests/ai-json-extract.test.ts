import { describe, expect, it } from 'vitest';
import { extractNamedText, parseJsonLike } from '../lib/ai/json';

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
