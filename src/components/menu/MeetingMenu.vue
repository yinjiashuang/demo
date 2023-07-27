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
        @click="scheduledMeeting"
    />
  </div>
</template>

<script setup lang="ts">
import {useRouter} from 'vue-router';
import MeetingMenuItem from '@/components/menu/item/MeetingMenuItem.vue';

const router = useRouter();

/**
 * method
 */
const joinMeeting = (isJoin = true): void => {
    router.push({
        name: isJoin ? 'join_meeting' : 'quick_meeting'
    });
};
const scheduledMeeting = (): void => {
    router.push({
        name: 'scheduled_meeting'
    })
};
</script>
<style>
@import "meeting_menu.less";
</style>
