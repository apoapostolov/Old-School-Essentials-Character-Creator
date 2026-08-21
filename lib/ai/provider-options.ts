export type AiProviderId =
  | 'openai'
  | 'openai-codex'
  | 'anthropic'
  | 'openrouter'
  | 'gemini'
  | 'opencode-go'
  | 'deepseek'
  | 'zhipu'
  | 'xai'
  | 'xai-oauth';

export interface AiProviderOption {
    value: AiProviderId;
    label: string;
}

/** Providers ordered by typical popularity / direct usage. */
export const AI_PROVIDER_OPTIONS: AiProviderOption[] = [
    { value: 'openai', label: 'OpenAI' },
    { value: 'openai-codex', label: 'OpenAI Codex (OAuth / ChatGPT)' },
    { value: 'anthropic', label: 'Anthropic' },
    { value: 'gemini', label: 'Google Gemini' },
    { value: 'openrouter', label: 'OpenRouter' },
    { value: 'xai', label: 'xAI Grok (API Key)' },
    { value: 'xai-oauth', label: 'xAI Grok (OAuth / SuperGrok)' },
    { value: 'zhipu', label: 'Z.ai GLM (Coding Plan)' },
    { value: 'deepseek', label: 'DeepSeek' },
    { value: 'opencode-go', label: 'OpenCode Go' },
];

export const AI_PROVIDER_IDS = AI_PROVIDER_OPTIONS.map(option => option.value);

export const isAiProviderId = (value: string): value is AiProviderId => (
    AI_PROVIDER_IDS.includes(value as AiProviderId)
);

export const getAiProviderLabel = (provider: AiProviderId) => (
    AI_PROVIDER_OPTIONS.find(option => option.value === provider)?.label || provider
);

/** Text-only providers (no native image gen in our runtime). */
export const isTextOnlyAiProvider = (provider: AiProviderId) => (
    provider === 'opencode-go'
    || provider === 'deepseek'
    || provider === 'zhipu'
);
