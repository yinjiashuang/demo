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

const router = useRouter();

const fullLoading = ref();

window.electron.ipcRenderer.on('login-success', (_: any, args: any) => {
    fullLoading.value.close();
    window.sessionStorage.setItem('username', args.username);
    window.sessionStorage.setItem('password', args.password);
    window.sessionStorage.setItem('token', args.token);
    router.push({name: 'meeting_list'});
});
const openFullLoading = (): void => {
    // fullLoading.value = ElLoading.service({fullscreen: true, target: 'login-container'});
    // window.electron.ipcRenderer.send('login', Configs.clientLoginUrl);
    window.sessionStorage.setItem('token', '123');
    router.push({
        name: 'meeting_room'
    });
};
const loading = ref<boolean>(false);
</script>
<style lang="less">
@import "index";
</style>
