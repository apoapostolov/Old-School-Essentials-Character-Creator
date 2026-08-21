import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
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
    const codexApiProxy = {
        '/__codex_api': {
            target: 'https://chatgpt.com',
            changeOrigin: true,
            secure: true,
            rewrite: (p: string) => p.replace(/^\/__codex_api/, ''),
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
                ...codexApiProxy,
            },
        },
        preview: {
            proxy: {
                ...xaiOauthProxy,
                ...codexOauthProxy,
                ...codexApiProxy,
            },
        },
        plugins: [react()],
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
