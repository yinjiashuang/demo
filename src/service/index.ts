import type {RequestConfig} from './request/types';
import {AxiosResponse} from 'axios';
import Request from './request/request.ts';

interface BaseResponse<T> {
    code: number,
    msg?: string,
    result?: T
}

interface BaseRequestConfig<T, R> extends RequestConfig<BaseResponse<R>> {
    data?: T;
}

const request = new Request({
    baseURL: import.meta.env.BASE_URL,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => config,
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result;
        },
    },
});

const BaseRequest = <D, T = any>(config: BaseRequestConfig<D, T>) => {
    const {method = 'GET'} = config;
    if (method === 'GET' || method == 'get') {
        config.params = config.data;
    }
    return request.request<BaseResponse<T>>(config);
};

export default BaseRequest;
