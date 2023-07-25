<template>
  <div class="meeting-list-menu">
    <meeting-menu-item
      btn-name="加入会议"
      icon-name="ic_meeting_join"
      background-name="ic_meeting_join_btn_bg"
      @click="joinMeeting"
    />
    <meeting-menu-item
      btn-name="快速会议"
      icon-name="ic_meeting_quick"
      background-name="ic_meeting_quick_btn_bg"
      @click="joinMeeting(false)"
    />
    <meeting-menu-item
      btn-name="预订会议"
      icon-name="ic_meeting_scheduled"
      background-name="ic_meeting_join_btn_bg"
    />
    <ul v-if="false" class="versions">
      <li class="electron-version">Electron v{{ versions.electron }}</li>
      <li class="chrome-version">Chromium v{{ versions.chrome }}</li>
      <li class="node-version">Node v{{ versions.node }}</li>
      <li class="v8-version">V8 v{{ versions.v8 }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { useRouter } from "vue-router";
import MeetingMenuItem from "@renderer/components/menu/item/MeetingMenuItem.vue";

const router = useRouter();
const versions = reactive({ ...window.electron.process.versions });

/**
 * method
 */
const joinMeeting = (isJoin = true): void => {
  router.push({
    name: isJoin ? "join_meeting" : "quick_meeting"
  });
};
</script>
<style>
@import "meeting_menu.less";
</style>
