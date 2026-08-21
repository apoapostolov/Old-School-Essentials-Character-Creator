import { describe, expect, it } from 'vitest';
import { AI_PROVIDER_OPTIONS, isAiProviderId } from '../lib/ai/provider-options';

describe('provider options', () => {
    it('registers multi-provider list including zhipu and xAI OAuth', () => {
        expect(AI_PROVIDER_OPTIONS.map(option => option.value)).toEqual([
            'openai',
            'openai-codex',
            'anthropic',
            'gemini',
            'openrouter',
            'xai',
            'xai-oauth',
            'zhipu',
            'deepseek',
            'opencode-go',
        ]);
        expect(isAiProviderId('xai-oauth')).toBe(true);
        expect(isAiProviderId('zhipu')).toBe(true);
        expect(isAiProviderId('openai-codex')).toBe(true);
    });
});
