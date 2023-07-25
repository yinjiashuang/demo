<template>
  <div class="meeting-list-container">
    <meeting-menu />
    <meeting-list-filter />
    <el-button @click="handle">按钮</el-button>
  </div>
</template>
<script setup lang="ts">
import MeetingMenu from "@renderer/components/menu/MeetingMenu.vue";
import MeetingListFilter from "../filter/MeetingListFilter.vue";

const handle = (): void => {
  console.log("发送");
  window.electron.ipcRenderer.send("login", "https://baidu.com");
};
</script>
<style scoped lang="less">
@import "index.less";
</style>
