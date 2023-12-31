interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_APP_API_V1: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}

declare module '*.vue' {
    import type {DefineComponent} from 'vue';
    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const component: DefineComponent<{}, {}, any>;
    export default component;
}
