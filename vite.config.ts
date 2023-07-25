import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import * as path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        electron({
            entry: 'electron-main/index.ts', // 主进程文件
        })
    ],
    build: {
        emptyOutDir: false
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src')
        }
    }
});
