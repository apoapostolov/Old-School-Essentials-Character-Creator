import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { hostOauthPlugin } from './vite/host-oauth';

/**
 * Dev/preview server endpoint: saves a base64 portrait into the Foundry
 * world's assets folder so the OSE Statblock Importer can hotlink it.
 * POST /__save_portrait  { dataUrl, name } -> { url }
 */
const foundryWorldId = 'old-school-adventures';
const foundryAssetsDir = path.resolve(
    process.env.HOME || '/home/apoapostolov',
    `FoundryData.14/Data/worlds/${foundryWorldId}/assets`,
);
const wanOrigin = 'http://192.168.1.217:30002';

const portraitSavePlugin = (imgurClientId: string): Plugin => {
    const attachEndpoints = (middlewares: any) => {
        // Read-only probe: is any Imgur Client-ID configured server-side?
        middlewares.use('/__imgur_status', (_req: any, res: any) => {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({
                available: Boolean(imgurClientId),
                source: imgurClientId ? 'env' : 'none',
                configured: Boolean(imgurClientId),
            }));
        });
        middlewares.use('/__save_portrait', (req: any, res: any) => {
            if (req.method !== 'POST') {
                res.statusCode = 405;
                res.end('POST only');
                return;
            }
            let body = '';
            req.on('data', (chunk) => { body += chunk; });
            req.on('end', async () => {
                try {
                    const { dataUrl, name, imgurClientId: bodyClientId } = JSON.parse(body || '{}');
                    const match = String(dataUrl || '').match(/^data:image\/(png|jpeg|webp);base64,(.+)$/);
                    if (!match) throw new Error('expected data:image/*;base64 payload');
                    const safeName = String(name || 'portrait')
                        .replace(/[^a-z0-9]+/gi, '-')
                        .replace(/^-+|-+$/g, '')
                        .toLowerCase() || 'portrait';

                    // Prefer an Imgur hotlink (CDN-cached, survives this PC);
                    // UI-provided Client-ID wins, then the .env default.
                    const clientId = /^[A-Za-z0-9]{10,40}$/.test(String(bodyClientId || ''))
                        ? String(bodyClientId)
                        : imgurClientId;
                    if (clientId) {
                        try {
                            const up = await fetch('https://api.imgur.com/3/image', {
                                method: 'POST',
                                headers: {
                                    Authorization: `Client-ID ${clientId}`,
                                    'Content-Type': 'application/json',
                                },
                                body: JSON.stringify({
                                    image: match[2],
                                    type: 'base64',
                                    name: `${safeName}.png`,
                                    title: `${safeName} portrait`,
                                }),
                            });
                            const j: any = await up.json();
                            if (up.ok && j?.data?.link) {
                                res.setHeader('Content-Type', 'application/json');
                                res.end(JSON.stringify({ url: j.data.link, host: 'imgur' }));
                                return;
                            }
                            console.warn('[ose-portrait-save] imgur upload failed:', up.status, j?.data?.error || j?.data?.message);
                        } catch (err: any) {
                            console.warn('[ose-portrait-save] imgur upload error:', err?.message);
                        }
                    }

                    const fileName = `${safeName}-portrait-${Date.now()}.${match[1] === 'jpeg' ? 'jpg' : match[1]}`;
                    fs.mkdirSync(foundryAssetsDir, { recursive: true });
                    fs.writeFileSync(path.join(foundryAssetsDir, fileName), Buffer.from(match[2], 'base64'));
                    res.setHeader('Content-Type', 'application/json');
                    res.end(JSON.stringify({ url: `${wanOrigin}/worlds/${foundryWorldId}/assets/${fileName}`, host: 'local' }));
                } catch (err: any) {
                    res.statusCode = 400;
                    res.end(JSON.stringify({ error: String(err?.message || err) }));
                }
            });
        });
    };

    return {
        name: 'ose-portrait-save',
        configureServer(server) {
            attachEndpoints(server.middlewares);
        },
        configurePreviewServer(server) {
            attachEndpoints(server.middlewares);
        },
    };
};

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
    const imgurClientId =
        env.IMGUR_CLIENT_ID || process.env.IMGUR_CLIENT_ID || '';
    const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || env.API_KEY || '';
    const openRouterApiKey = env.VITE_OPENROUTER_API_KEY || env.OPENROUTER_API_KEY || '';
    const openCodeGoApiKey = env.VITE_OPENCODE_GO_API_KEY || env.OPENCODE_GO_API_KEY || '';
    const deepSeekApiKey = env.VITE_DEEPSEEK_API_KEY || env.DEEPSEEK_API_KEY || '';
    const openAiApiKey = env.VITE_OPENAI_API_KEY || env.OPENAI_API_KEY || '';
    const anthropicApiKey = env.VITE_ANTHROPIC_API_KEY || env.ANTHROPIC_API_KEY || '';
    const zhipuApiKey = env.VITE_ZHIPU_API_KEY || env.ZHIPU_API_KEY || env.VITE_ZAI_API_KEY || env.ZAI_API_KEY || '';
    const xaiApiKey = env.VITE_XAI_API_KEY || env.XAI_API_KEY || '';
    const xaiOauthProxy = {
        '/__xai_oauth': {
            target: 'https://auth.x.ai',
            changeOrigin: true,
            secure: true,
            rewrite: (p: string) => p.replace(/^\/__xai_oauth/, ''),
        },
    };
    const codexOauthProxy = {
        '/__codex_oauth': {
            target: 'https://auth.openai.com',
            changeOrigin: true,
            secure: true,
            rewrite: (p: string) => p.replace(/^\/__codex_oauth/, ''),
        },
    };
    return {
        server: {
            port: 3003,
            host: '0.0.0.0',
            // /mnt/c does not always emit inotify events — poll so HMR works from WSL.
            watch: {
                usePolling: true,
                interval: 300,
            },
            hmr: {
                overlay: true,
            },
            proxy: {
                ...xaiOauthProxy,
                ...codexOauthProxy,
            },
        },
        preview: {
            proxy: {
                ...xaiOauthProxy,
                ...codexOauthProxy,
            },
        },
        plugins: [react(), portraitSavePlugin(imgurClientId), hostOauthPlugin()],
        define: {
            'process.env.API_KEY': JSON.stringify(geminiApiKey),
            'process.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
            'process.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
            'process.env.OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
            'process.env.VITE_OPENROUTER_API_KEY': JSON.stringify(openRouterApiKey),
            'process.env.OPENCODE_GO_API_KEY': JSON.stringify(openCodeGoApiKey),
            'process.env.VITE_OPENCODE_GO_API_KEY': JSON.stringify(openCodeGoApiKey),
            'process.env.DEEPSEEK_API_KEY': JSON.stringify(deepSeekApiKey),
            'process.env.VITE_DEEPSEEK_API_KEY': JSON.stringify(deepSeekApiKey),
            'process.env.OPENAI_API_KEY': JSON.stringify(openAiApiKey),
            'process.env.VITE_OPENAI_API_KEY': JSON.stringify(openAiApiKey),
            'process.env.ANTHROPIC_API_KEY': JSON.stringify(anthropicApiKey),
            'process.env.VITE_ANTHROPIC_API_KEY': JSON.stringify(anthropicApiKey),
            'process.env.ZHIPU_API_KEY': JSON.stringify(zhipuApiKey),
            'process.env.VITE_ZHIPU_API_KEY': JSON.stringify(zhipuApiKey),
            'process.env.XAI_API_KEY': JSON.stringify(xaiApiKey),
            'process.env.VITE_XAI_API_KEY': JSON.stringify(xaiApiKey),
            'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
            'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
            'import.meta.env.API_KEY': JSON.stringify(geminiApiKey),
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '.'),
            },
        },
        build: {
            rollupOptions: {
                output: {
                    manualChunks(id) {
                        if (id.includes('node_modules/pdf-lib')) return 'pdf-lib';
                        if (id.includes('node_modules/@google/genai')) return 'google-genai';
                        if (id.includes('openrouter-model-cache')) return 'openrouter-models';
                        if (id.includes('/third-party/dolmenwood/')) return 'source-dolmenwood';
                        if (id.includes('/third-party/gods/')) return 'source-gods';
                        if (id.includes('/third-party/mystara/')) return 'source-mystara';
                        if (id.includes('/third-party/northland/')) return 'source-northland';
                        if (id.includes('/third-party/the-shrike/')) return 'source-shrike';
                    },
                },
            },
            chunkSizeWarningLimit: 700,
        },
    };
});
