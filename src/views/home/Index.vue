<template>
    <div class="home-container">
        <div class="toolbar" :class="{'debug': isDev}">
            <img class="logo" src="@/assets/ic_logo.svg" alt=""/>
            <span class="title">鹰眼会议</span>
            <div class="toolbar-operate-area">
                <img src="@/assets/ic_min.svg" alt="" class="button" @click.prevent="toMin"/>
                <img src="@/assets/ic_max.svg" alt="" class="button" @click="toMax"/>
                <img src="@/assets/ic_exit.svg" alt="" class="button" @click="toClose"/>
            </div>
        </div>
        <div class="content-box">
            <router-view class="content"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import {ref} from 'vue';

const isDev = ref(import.meta.env.MODE == 'development');
/**
 * method
 */
const toMin = (): void => {
    window.electron.ipcRenderer.send('minimize');
};

const toMax = (): void => {
    window.electron.ipcRenderer.send('maximize');
};

const toClose = (): void => {
    window.electron.ipcRenderer.send('exit');
    console.log('关闭');
};
</script>

<style lang="less">
@import "index.less";
</style>
