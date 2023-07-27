<template>
  <div class="meeting_room_framework">
    <div class="header">
      <div class="headerItem"></div>
      <div class="headerItem">{{ meetingHeader.meetingName }}</div>

      <div class="headerItem header_status">
        <div class="headerItem">会议人数: {{ meetingHeader.memberCount }}</div>
        <div class="meeting_time headerItem">{{ meetingHeader.meetingTimer }}</div>
        <div class="headerItem"><img
            src="@/assets/meetingRoom/net5.svg"
            alt=""
        /></div>

      </div>
    </div>
    <div class="member_show"></div>
    <div class="footer"></div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  ref,
} from "vue";

// 会议顶部
const meetingHeader = reactive({
  meetingName: "测试会议",
  meetingTimer: "00:00:00",
  memberCount: 0,
  publishQuality: 5,
});
//会议成员显示
const meetingMemberList = ref([]);

const meetingContent = reactive({
  total: 0, //总页数
});

//会议底部
const meetingBottom = reactive({
  isDisplay: true,
  isMute: false,
  isGirdFrame: true,
});

onBeforeMount(() => {
  console.log("组件挂载前");
});

onMounted(() => {
  console.log("组件挂载完成");
});

onBeforeUnmount(() => {
  console.log("组件卸载之前");
});

onUnmounted(() => {
  console.log("组件卸载完成");
});
</script>

<style scoped lang="less">
@import "meeting_room.less";
</style>
