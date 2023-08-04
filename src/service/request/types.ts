import type {AxiosRequestConfig, AxiosResponse, CreateAxiosDefaults, InternalAxiosRequestConfig} from 'axios';

export interface RequestInterceptors<T> {
    requestInterceptors?: (config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig;
    requestInterceptorsCatch?: (error: any) => any;
    responseInterceptors?: (config: T) => T;
    responseInterceptorsCatch?: (error: any) => any;
}

/**
 * 自定义传入的参数
 */
export interface CreateRequestConfig<T = AxiosResponse> extends CreateAxiosDefaults {
    interceptors?: RequestInterceptors<T>;
}

export interface RequestConfig<T = AxiosResponse> extends AxiosRequestConfig {
    interceptors?: RequestInterceptors<T>
}
