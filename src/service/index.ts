import Request from './request';
import {AxiosResponse} from 'axios';

import type {RequestConfig} from './request/types';
import {ITokenRes} from '@/api/authentication.ts';

export interface BaseResponse<T> {
    code: number;
    msg: string;
    result: T;
    count?: number;
}

// 重写返回类型
interface BaseRequestConfig<T, R> extends RequestConfig<BaseResponse<R>> {
    result?: T;
}

interface TokenRequestConfig extends RequestConfig<ITokenRes> {

}

const request = new Request({
    baseURL: '/client',
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            if (config.headers) {
                config.headers['Accept-Language'] = 'en';
                const token = window.sessionStorage.getItem('token') || '';
                if (token !== '') {
                    config.headers.Authorization = `Bearer ${token}`;
                }
            }
            return config;
        },
        // 响应拦截器
        responseInterceptors: (result: AxiosResponse) => {
            return result;
        },
    },
})

/**
 * @description: 函数的描述
 * @generic D 请求参数
 * @generic T 响应结构
 * @param {BaseRequestConfig} config 不管是GET还是POST请求都使用data
 * @returns {Promise}
 */
const BaseRequest = <D = any, T = any>(config: BaseRequestConfig<D, T>) => {
    return request.request<BaseResponse<T>>(config);
}

const TokenRequest = (config: TokenRequestConfig) => {
    return request.request<ITokenRes>(config);
};

// // 取消请求
// export const cancelRequest = (url: string | string[]) => {
//   return request.cancelRequest(url)
// }
// // 取消全部请求
// export const cancelAllRequest = () => {
//   return request.cancelAllRequest()
// }

export {TokenRequest, BaseRequest};
