import type { AiProviderId } from './provider-options';

export const getBuildTimeApiKeyForProvider = (provider: AiProviderId) => {
    if (provider === 'openai') {
        return String(process.env.OPENAI_API_KEY || process.env.VITE_OPENAI_API_KEY || '');
    }
    if (provider === 'anthropic') {
        return String(process.env.ANTHROPIC_API_KEY || process.env.VITE_ANTHROPIC_API_KEY || '');
    }
    if (provider === 'openrouter') {
        return String(process.env.OPENROUTER_API_KEY || process.env.VITE_OPENROUTER_API_KEY || '');
    }
    if (provider === 'gemini') {
        return String(process.env.API_KEY || process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || '');
    }
    if (provider === 'opencode-go') {
        return String(process.env.OPENCODE_GO_API_KEY || process.env.VITE_OPENCODE_GO_API_KEY || '');
    }
    if (provider === 'deepseek') {
        return String(process.env.DEEPSEEK_API_KEY || process.env.VITE_DEEPSEEK_API_KEY || '');
    }
    if (provider === 'zhipu') {
        return String(process.env.ZHIPU_API_KEY || process.env.VITE_ZHIPU_API_KEY || process.env.ZAI_API_KEY || process.env.VITE_ZAI_API_KEY || '');
    }
    if (provider === 'xai') {
        return String(process.env.XAI_API_KEY || process.env.VITE_XAI_API_KEY || '');
    }
    // xai-oauth has no build-time secret
    return '';
};
