<template>
  <div class="home-container">
    <div class="toolbar">
      <img class="logo" src="@renderer/assets/ic_logo.svg" alt="" />
      <span class="title">鹰眼会议</span>
      <div class="toolbar-operate-area">
        <img src="@renderer/assets/ic_min.svg" alt="" class="button" @click.prevent="toMin" />
        <img src="@renderer/assets/ic_max.svg" alt="" class="button" @click="toMaX" />
        <img src="@renderer/assets/ic_exit.svg" alt="" class="button" @click="toClose" />
      </div>
    </div>
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<script setup lang="ts">
/**
 * method
 */
const toMin = (): void => {
  window.electron.ipcRenderer.send("minimize");
};

const toMaX = (): void => {
  window.electron.ipcRenderer.send("maximize");
};

const toClose = (): void => {
  window.electron.ipcRenderer.send("exit");
  console.log("关闭");
};
</script>

<style lang="less">
@import "index.less";
</style>
