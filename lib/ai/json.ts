const stripCodeFences = (value: string) => value
    .replace(/```(?:json)?/gi, '```')
    .replace(/```/g, '')
    .trim();

const extractBracedJson = (value: string) => {
    const cleaned = stripCodeFences(value);
    const firstBrace = cleaned.indexOf('{');
    const lastBrace = cleaned.lastIndexOf('}');
    if (firstBrace >= 0 && lastBrace > firstBrace) {
        return cleaned.slice(firstBrace, lastBrace + 1);
    }

    const firstBracket = cleaned.indexOf('[');
    const lastBracket = cleaned.lastIndexOf(']');
    if (firstBracket >= 0 && lastBracket > firstBracket) {
        return cleaned.slice(firstBracket, lastBracket + 1);
    }

    return cleaned;
};

export const parseJsonLike = (value: unknown) => {
    if (typeof value !== 'string') return value;

    const cleaned = extractBracedJson(value);
    try {
        return JSON.parse(cleaned);
    } catch {
        try {
            return JSON.parse(value);
        } catch {
            return {};
        }
    }
};
