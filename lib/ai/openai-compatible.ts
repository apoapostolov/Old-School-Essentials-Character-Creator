import type { OpenRouterChatMessage, OpenRouterChatCompletionResult } from './openrouter';

const readErrorMessage = async (response: Response) => {
    const fallback = `Request failed (${response.status})`;
    try {
        const body = await response.json();
        return body?.error?.message || body?.message || body?.detail || fallback;
    } catch {
        try {
            const text = await response.text();
            return text || fallback;
        } catch {
            return fallback;
        }
    }
};

const joinUrl = (baseUrl: string, path: string) => {
    const normalizedBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
    return new URL(path.replace(/^\//, ''), normalizedBase).toString();
};

export const fetchOpenAiCompatibleModels = async (params: {
    baseUrl: string;
    apiKey: string;
}): Promise<unknown[]> => {
    if (!params.apiKey) {
        throw new Error('An API key is required to refresh the model list.');
    }

    const response = await fetch(joinUrl(params.baseUrl, '/models'), {
        headers: {
            Authorization: `Bearer ${params.apiKey}`,
        },
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    if (Array.isArray(json?.data)) return json.data;
    if (Array.isArray(json?.models)) return json.models;
    return [];
};

export const fetchOpenAiCompatibleChatCompletion = async (params: {
    baseUrl: string;
    apiKey: string;
    model: string;
    messages: OpenRouterChatMessage[];
    responseFormat?: { type: 'json_object' } | { type: 'json_schema'; json_schema: Record<string, unknown> };
    temperature?: number;
    maxTokens?: number;
    headers?: Record<string, string>;
    extraBody?: Record<string, unknown>;
}): Promise<OpenRouterChatCompletionResult> => {
    const response = await fetch(joinUrl(params.baseUrl, '/chat/completions'), {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${params.apiKey}`,
            'Content-Type': 'application/json',
            ...(params.headers || {}),
        },
        body: JSON.stringify({
            model: params.model,
            messages: params.messages,
            response_format: params.responseFormat,
            temperature: params.temperature,
            max_tokens: params.maxTokens,
            stream: false,
            ...(params.extraBody || {}),
        }),
    });

    if (!response.ok) {
        throw new Error(await readErrorMessage(response));
    }

    const json = await response.json();
    const message = json?.choices?.[0]?.message;
    const content = typeof message?.content === 'string' ? message.content : '';
    const images = Array.isArray(message?.images)
        ? message.images
            .map((image: any) => image?.image_url?.url || image?.imageUrl?.url || '')
            .filter((url: string) => Boolean(url))
        : [];

    return { content, images, raw: json };
};
