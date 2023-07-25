import {defineConfig} from 'vite';
import vue from '@vitejs/plugin-vue';

// https://vitejs.dev/config/
import {resolve} from 'path';

const root = process.cwd();

const pathResolve = (dir: string) => {
    return resolve(root, '.', dir);
};

export default defineConfig({
    plugins: [vue()],
    resolve: {
        extensions: ['.mjs', '.js', '.ts', 'jsx', '.tsx', '.json', '.less', '.css'],
        alias: [
            {
                find: /\@\//,
                replacement: `${pathResolve('src')}`
            }
        ]
    }
});
