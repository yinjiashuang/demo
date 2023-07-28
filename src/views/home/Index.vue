<template>
    <div class="home-container">
        <div class="toolbar">
            <img class="logo" src="@/assets/ic_logo.svg" alt=""/>
            <span class="title" @click="back">鹰眼会议</span>
            <div class="toolbar-operate-area">
                <img src="@/assets/ic_min.svg" alt="" class="button" @click.prevent="toMin"/>
                <img src="@/assets/ic_max.svg" alt="" class="button" @click="toMaX"/>
                <img src="@/assets/ic_exit.svg" alt="" class="button" @click="toClose"/>
            </div>
        </div>
        <router-view class="content"/>
    </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';

const router = useRouter();

/**
 * method
 */
const toMin = (): void => {
    window.electron.ipcRenderer.send('minimize');
};

const toMaX = (): void => {
    window.electron.ipcRenderer.send('maximize');
};

const toClose = (): void => {
    window.electron.ipcRenderer.send('exit');
    console.log('关闭');
};

const back = () => {
    window.sessionStorage.setItem('token', '');
    router.back();
};
</script>

<style lang="less">
@import "index.less";
</style>
