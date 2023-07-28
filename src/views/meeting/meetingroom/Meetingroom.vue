<template>
  <div class="meeting-room-framework">
    <div class="header">
      <div class="header-item"></div>
      <div class="header-item">{{ meetingHeader.meetingName }}</div>

      <div class="header-item header-status">
        <div class="header-item">会议人数: {{ meetingHeader.memberCount }}</div>
        <div class="meeting-time header-item">{{ meetingHeader.meetingTimer }}</div>
        <div class="header-item"><img
            src="@/assets/meetingroom/ic_meetingroom_net5.svg"
            alt=""
        /></div>

      </div>
    </div>
    <div class="member-show"></div>
    <div class="footer">
      <div class="botton-bar">
        <meeting-botton :icon-title="camBtnTitle" :icon-name="camBtnIcon"
                        @click="handleMeetingSetting('cam')"></meeting-botton>
        <meeting-botton :icon-title="micBtnTitle" :icon-name="micBtnIcon"
                        @click="handleMeetingSetting('mic')"></meeting-botton>
        <meeting-botton :icon-title="'邀请成员'" :icon-name="'invite_member'"
                        @click="handleMeetingSetting('share')"></meeting-botton>
        <meeting-botton :icon-title="'成员管理'" :icon-name="'member_manage'"
                        @click="handleMeetingSetting('member')"></meeting-botton>
        <meeting-botton :icon-title="frameBtnTitle" :icon-name="frameBtnIcon"
                        @click="handleMeetingSetting('frame')"></meeting-botton>
      </div>
      <img class="leave-meeting-button" src="@/assets/meetingroom/ic_meetingroom_leave_room_button.svg" alt=""
           srcset="">
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  onBeforeMount,
  onMounted,
  onBeforeUnmount,
  onUnmounted,
  reactive,
  ref, computed, watch,
} from "vue";
import meetingBotton from "@/components/meeting_Room/meetingroom_bottom_btn/Index.vue"
import {ZegoExpressEngine} from 'zego-express-engine-webrtc'
import {useRouter} from "vue-router";

let zg = null

// 会议顶部
const meetingHeader = reactive({
  meetingName: "XXXXXXX",
  meetingTimer: "00:00:00",
  meetingID:'',
  memberCount: 0,
  publishQuality: 5,
});

meetingHeader.memberCount=computed(()=>{
  return meetingMemberList.value.length
})
//会议成员显示
const meetingMemberList = ref([]);

const meetingContent = reactive({
  total: 0, //总页数
});

//会议底部
//镜头开关
const camStatus = ref(-1)
const camBtnTitle = computed(() => {
  switch (camStatus.value) {
    case -1:
      return '设备不可用';
    case 0:
      return '开启视频';
    case 1:
      return '关闭视频'
  }
})
const camBtnIcon = computed(() => {
  switch (camStatus.value) {
    case -1:
      return 'cam_disable';
    case 0:
      return 'cam_off';
    case 1:
      return 'cam_on'
  }
})
//麦克开关
const micStatus = ref(-1)
const micBtnTitle = computed(() => {
  switch (micStatus.value) {
    case -1:
      return '设备不可用';
    case 0:
      return '解除静音';
    case 1:
      return '开启静音'

  }
})
const micBtnIcon = computed(() => {
  switch (micStatus.value) {
    case -1:
      return 'mic_disable';
    case 0:
      return 'mic_off';
    case 1:
      return 'mic_on'

  }
})
//成员管理
const memberPanel = ref(0)
//视图显示
const frameStatus = ref(0) //0  网格视图 1 演讲者视图
const frameBtnTitle = computed(() => {
  if (frameStatus.value) {
    return '宫格视图'
  } else {
    return '演讲者视图'
  }
})
const frameBtnIcon = computed(() => {
  if (frameStatus.value) {
    return 'gird_frame'
  } else {
    return 'speaker_frame'
  }
})

const router = useRouter()
watch(() =>
        router.currentRoute.value.path,
    (toPath) => {
      //要执行的方法
      const query = router.currentRoute.value.query;
      meetingHeader.meetingName=query.roomName
      meetingHeader.meetingID=query.roomId
    }, {immediate: true, deep: true}
)

const handleMeetingSetting = (type) => {
  switch (type) {
    case 'cam':
      break;
    case 'mic':
      break;
    case 'share':
      break;
    case 'member':
      break;
    case 'frame':
      break;


  }
}
const initMeetingCallback = () => {
}
const initMeeting = () => {
  zg = new ZegoExpressEngine(78190877, "39a8cde234ee27d6691d6d503377ad57")
  zg.setDebugVerbose(false);
  zg.setSoundLevelDelegate(true); //设置是否监听音浪及音浪回调间隔时间
}

const enterMeetingroom=()=>{

}
onBeforeMount(() => {
  console.log("组件挂载前");
  initMeeting()
});

onMounted(() => {
  console.log("组件挂载完成");
  initMeetingCallback()
});


</script>

<style lang="less">
@import "meetingroom.less";
</style>
