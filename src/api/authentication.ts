import request from '@/api/index.ts';

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

export const getUserInfo = (username: string) => {
    return request.get('/v1/auth/user', {params: {username}});
};
