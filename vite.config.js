// vite.config.js
import { resolve } from 'path';
import { defineConfig } from 'vite';

process.env.BROWSER = 'firefox';

const root = resolve(__dirname, 'src');

export default defineConfig({
    server: {
        open: '/index.html',
    },
    build: {
        outDir: '../dist',
        rollupOptions: {
            input: {
                main: resolve(root, 'index.html'),
                wishapp: resolve(root, 'wishapp', 'index.html'),
            },
        },
    },
    publicDir: './public',
    root: 'src',
});
