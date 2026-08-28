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

const asNonEmptyString = (value: unknown): string => {
    if (typeof value !== 'string') return '';
    return value.replace(/^[`"']+|[`"']+$/g, '').trim();
};

/**
 * Pull a single text field out of model output.
 * Codex and other slots often ignore json:true and return a bare name.
 */
export const extractNamedText = (raw: unknown, keys: string[]): string => {
    const parsed = parseJsonLike(raw);
    if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
        const record = parsed as Record<string, unknown>;
        for (const key of keys) {
            const hit = asNonEmptyString(record[key]);
            if (hit) return hit;
        }
        const wanted = new Set(keys.map((key) => key.toLowerCase()));
        for (const [key, value] of Object.entries(record)) {
            if (!wanted.has(key.toLowerCase())) continue;
            const hit = asNonEmptyString(value);
            if (hit) return hit;
        }
    }
    if (typeof parsed === 'string') {
        const hit = asNonEmptyString(parsed).split('\n')[0]?.trim() ?? '';
        if (hit) return hit;
    }
    if (typeof raw !== 'string') return '';
    const text = stripCodeFences(raw).trim();
    if (!text) return '';
    for (const key of keys) {
        const re = new RegExp(`(?:^|[\\n{,])\\s*"?${key}"?\\s*[:=]\\s*["']?([^\\n"'}]+)`, 'i');
        const match = text.match(re);
        if (match?.[1]) {
            const hit = asNonEmptyString(match[1]);
            if (hit) return hit;
        }
    }
    if (!text.includes('{')) {
        const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
        if (lines.length >= 1 && lines.length <= 4) {
            const line = lines[lines.length - 1];
            if (line.length <= 80 && !/^(please|sure|here |the name)\b/i.test(line)) {
                return asNonEmptyString(line);
            }
        }
    }
    return '';
};
