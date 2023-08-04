import request from '@/api/old_request/index.ts';
import {BaseRequest, TokenRequest} from '@/service/index.ts';

// 获取token
export function getToken(data: any) {
    return request({
      url: '/v1/auth/token',
      method: 'post',
      data,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    })
}

export const getNewToken = (data: IGetTokenType) => {
    return TokenRequest({
        url: '/v1/auth/token',
        method: 'post',
        data,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

export const getUserInfo = (username: string) => {
    return BaseRequest<{ username: string }, any>({
        url: '/v1/auth/user',
        method: 'get',
        params: {username}
    });
};

export interface IGetTokenType {
    username: string,
    password: string
}

export interface ITokenRes {
    access_token: string,
    type: string
}
