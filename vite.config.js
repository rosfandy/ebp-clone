import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';
import i18n from 'laravel-react-i18n/vite';

export default defineConfig({
    server: {
        host: '127.0.0.1',
    },
    plugins: [
        laravel({
            input: [
                'resources/js/app.jsx',
                'resources/js/Pages/Errors/403.jsx',
                'resources/js/Pages/Errors/404.jsx',
            ],
            ssr: 'resources/js/ssr.jsx',
            refresh: true,
        }),
        react(),
        i18n(),
    ],
});