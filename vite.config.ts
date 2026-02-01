import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, __dirname, '');
    const geminiApiKey = env.VITE_GEMINI_API_KEY || env.GEMINI_API_KEY || '';
    return {
      plugins: [react()],
      define: {
        'import.meta.env.VITE_GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'import.meta.env.GEMINI_API_KEY': JSON.stringify(geminiApiKey),
        'import.meta.env.API_KEY': JSON.stringify(geminiApiKey),
      },
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
