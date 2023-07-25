<template>
  <div class="meeting-list-container">
    <meeting-menu />
    <meeting-list-filter />
  </div>
</template>
<script setup lang="ts">
import MeetingMenu from '@/components/menu/MeetingMenu.vue';
import MeetingListFilter from '@/views/meeting/filter/MeetingListFilter.vue';

const handle = (): void => {
    console.log('发送');
    window.electron.ipcRenderer.send('login', 'https://baidu.com');
};
</script>
<style lang="less">
@import "index.less";
</style>
