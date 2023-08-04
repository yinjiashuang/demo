<template>
    <div class="login-container">
        <div class="login-form">
            <span class="title">您尚未登录，请登录账号</span>
            <el-button
                :loading="loading"
                type="primary"
                size="large"
                class="authorization-button"
                @click="openFullLoading">在浏览器中登录
            </el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {getNewToken, getUserInfo} from '@/api/authentication.ts';
import {Configs} from '@/config.ts';
import {ElLoading} from 'element-plus';

const router = useRouter();

const fullLoading = ref();
if (window.self != window.top) {
    window.electron.ipcRenderer.on('login-success', async (_: any, args: any) => {
        fullLoading.value.close();
        const res = await getNewToken({username: args.username, password: args.password});
        console.log(`--------------${res}`);
        if (res && res.access_token) {
            window.sessionStorage.setItem('token', res.access_token);
            const userInfoRes: any = await getUserInfo(args.username);
            if (userInfoRes && userInfoRes.code == 200 && userInfoRes.result.length > 0) {
                window.sessionStorage.setItem('userInfo', JSON.stringify({
                    username: args.username,
                    password: args.password,
                    userId: userInfoRes.result[0].id,
                    name: userInfoRes.result[0].name
                }));
                await router.push({name: 'meeting_list'});
            }
        }
        if (fullLoading.value) {
            fullLoading.value.close();
        }
        
    });
}
const openFullLoading = async (): Promise<void> => {
    fullLoading.value = ElLoading.service({fullscreen: true, target: 'login-container'});
    if (window.top != window.self) {
        window.electron.ipcRenderer.send('login', Configs.clientLoginUrl);
    }
    
};
const loading = ref<boolean>(false);
</script>
<style lang="less">
@import "index";
</style>
