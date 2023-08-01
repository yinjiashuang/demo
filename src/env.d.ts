interface ImportMetaEnv {
    readonly VITE_APP_BASE_URL: string;
    readonly VITE_APP_API_V1: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
