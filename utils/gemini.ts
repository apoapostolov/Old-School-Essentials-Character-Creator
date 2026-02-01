export const getGeminiApiKey = (): string => {
    const env = import.meta.env as Record<string, string | undefined>;
    return env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.API_KEY || '';
};

export const getGeminiTextModel = (): string => {
    const env = import.meta.env as Record<string, string | undefined>;
    return env.VITE_GEMINI_TEXT_MODEL || 'gemini-2.5-flash';
};

export const describeGeminiImageFailure = (response: any): string => {
    const blockReason = response?.promptFeedback?.blockReason;
    const blockMessage = response?.promptFeedback?.blockReasonMessage;
    const finishReason = response?.candidates?.[0]?.finishReason;
    const parts = response?.candidates?.[0]?.content?.parts || [];
    const partTypes = Array.isArray(parts)
        ? parts.map((part: any) => part?.inlineData ? 'inlineData' : part?.text ? 'text' : 'other').join(', ')
        : 'unknown';
    return [
        blockReason ? `blockReason=${blockReason}` : null,
        blockMessage ? `blockMessage=${blockMessage}` : null,
        finishReason ? `finishReason=${finishReason}` : null,
        `parts=${partTypes || 'none'}`
    ].filter(Boolean).join(' | ');
};
