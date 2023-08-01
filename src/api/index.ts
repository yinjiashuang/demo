import axios from 'axios';
import {ElMessage} from 'element-plus';
import {getToken} from '@/api/authentication.ts';

const service = axios.create({
    baseURL: '/client',
    timeout: 5000000
});

// request interceptor
service.interceptors.request.use(
    async (config: any) => {
        config.headers['Accept-Language'] = 'en'; //todo暂时没有中英文切换需求 230725
        const token = window.sessionStorage.getItem('token');
        config.headers['Content-Type'] = config.headers['Content-Type'] || 'application/json';

        if (token) {
            config.headers.Authorization = 'Bearer ' + token;
        }
        return config;
    },
    error => Promise.reject(error)
);

service.interceptors.response.use(
    response => {
        const res: any = response.data;

        if (res.code && res.code == 200) {
            return Promise.resolve(res);
        } else {
            if (response.request.responseURL.includes('/auth/token')) {
                return Promise.resolve(res);
            }
            ElMessage({
                message: res.msg || '加载失败！',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error(res.msg || '加载失败！'));
        }

    },
    async error => {

        if (!error.response) return;
        let errStatus = error.response.status;//错误码
        let errMsg = error.response.data.msg;

        let config = error.response.config;
        if (errStatus == 401) {
            const reConnect = () => {
                return new Promise(async (resolve) => {
                    const loginForm = JSON.parse(window.sessionStorage.getItem('loginForm') as string);
                    let str = `grant_type=&username=${loginForm.username}&password=${loginForm.password}&scope=&client_id=&client_secret=`;

                    try {
                        const res: any = await getToken(str);
                        window.sessionStorage.setItem('token', res.access_token);

                        config.headers.Authorization = 'Bearer ' + window.sessionStorage.getItem('token');

                        const reData = await service(config);
                        resolve(reData);
                    } catch (err) {
                        console.log(err);
                    }

                });
            };

            const reData = await reConnect();
            return Promise.resolve(reData);

            // 400，415 449 503
        } else if (errStatus == 402) {
            ElMessage({
                message: errMsg || '该用户没有权限',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error(errMsg || '该用户没有权限'));
        } else {
            ElMessage({
                message: errMsg || '加载失败！',
                type: 'error',
                duration: 5 * 1000
            });
            return Promise.reject(new Error(errMsg || '加载失败！'));
        }

    }
);
export default service;
