<template>
    <div class="login-container">
        <div class="login-form">
            <span class="title">您尚未登录，请登录账号</span>
            <el-button
                :loading="loading"
                type="primary"
                size="large"
                class="authorization-button"
                @click="openFullLoading"
            >在浏览器中登录
            </el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import {ElLoading} from 'element-plus';

const fullLoading = ref<ElLoading | null>(null);

const router = useRouter();
const openFullLoading = (): void => {
    fullLoading.value = ElLoading.service({fullscreen: true, target: 'login-container'});
    setTimeout(() => {
        fullLoading.value?.close();
        window.sessionStorage.setItem('token', '123');
        router.push({
            name: 'meeting_list'
        });
    }, 1000);
};
const loading = ref<boolean>(false);
</script>
<style lang="less">
@import "index";
</style>
