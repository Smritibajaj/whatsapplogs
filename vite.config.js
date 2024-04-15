import { defineConfig } from "vite";
import react from '@vitejs/plugin-react';
//import react from "@vitejs/plugin-react-swc";
import * as path from 'path';
import svgr from "vite-plugin-svgr";
// https://vitejs.dev/config/
export default defineConfig({
    server: {
        watch: {
            usePolling: true,
        },
        host: true,
        strictPort: true,
        port: 8082,
    },
    preview: {
        host: '0.0.0.0',
        port: 8082,
    },
    plugins: [
        react(),
        svgr(),
    ],
    define: {
        global: {},
    },
    resolve: {
        alias: [{ find: '@app', replacement: path.resolve(__dirname, 'src/app') }],
    },
});
