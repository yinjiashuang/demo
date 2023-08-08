<template>
    <div class="meeting-room-framework">
        <div class="header">
            <div class="header-item"></div>
            <div class="header-item">{{ queryMeetingParams.roomName }}</div>
            
            <div class="header-item header-status">
                <div class="header-item">会议人数: {{ meetingHeader.memberCount }}</div>
                <div class="meeting-time header-item">{{ meetingHeader.meetingTimer }}</div>
                <div class="header-item"><img
                    src="@/assets/meeting_room/ic_meeting_room_net5.svg"
                    alt=""
                /></div>
            
            </div>
        </div>
        <div class="member-show">
            <gird-frame v-if="!frameStatus" :meetingMemberList="meetingMemberList" :totalPage="meetingHeader.memberCount"/>
            <speaker-frame v-else :meetingMemberList="meetingMemberList"/>
        </div>
        <div class="footer">
            <div class="button-bar">
                <meeting-button :icon-title="camBtnTitle" :icon-name="camBtnIcon"
                                @click="handleMeetingSetting('cam')"/>
                <meeting-button :icon-title="micBtnTitle" :icon-name="micBtnIcon"
                                @click="handleMeetingSetting('mic')"/>
                <meeting-button :icon-title="'邀请成员'" :icon-name="'invite_member'"
                                @click="handleMeetingSetting('share')"/>
                <meeting-button :icon-title="'成员管理'" :icon-name="'member_manage'"
                                @click="handleMeetingSetting('member')"/>
                <meeting-button :icon-title="frameBtnTitle" :icon-name="frameBtnIcon"
                                @click="handleMeetingSetting('frame')"/>
            </div>
            <img class="leave-meeting-button" src="@/assets/meeting_room/ic_meeting_room_leave_room_button.svg" alt=""
                 srcset="" @click="leaveRoom">
        </div>
    </div>
</template>

<script setup lang="js">
import {computed, onBeforeUnmount, onMounted, reactive, ref, watch} from 'vue';
import meetingButton from '@/components/meeting_room/bottom_btn/Index.vue';
import girdFrame from '@/components/meeting_room/gird_frame/Index.vue'
import speakerFrame from '@/components/meeting_room/speaker_frame/Index.vue'
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';
const rtcCloud = window.trtc;
let trtc  = null
const {
    TRTCAppScene,
    TRTCVideoStreamType,
    TRTCVideoFillMode,
    TRTCParams,
    TRTCVideoEncParam,
    TRTCVideoResolution,
    TRTCVideoResolutionMode,
    TRTCBeautyStyle,
    Rect,
    TRTCScreenCaptureProperty,
    TRTCRoleType
} = require('trtc-electron-sdk/liteav/trtc_define')

const userInfo = JSON.parse(`${window.sessionStorage.getItem('userInfo')}`);
// 通过路由传递的参数
const queryMeetingParams = ref({
    roomId: '',
    roomName: 'XXXXX',
    enable_mic: 0,
    enable_camera: 0,
    hostUserId: 'user-123456'
})
// 会议顶部
const meetingHeader = reactive({
    meetingTimer: '00:00:00',
    memberCount: 0,
    publishQuality: 5
    
});

meetingHeader.memberCount = computed(() => {
    return meetingMemberList.value.length
})
//会议成员显示
const meetingMemberList = ref([]);

const meetingContent = reactive({
    total: 0 //总页数
});

//会议底部
const isDeviceSupport = reactive({
    cam: true,
    mic: true
})
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
    () => {
        //要执行的方法
        const query = JSON.parse(JSON.stringify(router.currentRoute.value.query));
        queryMeetingParams.value = query
    }, {immediate: true, deep: true}
)
//获取用户在数组中的index
const getMemberIndex = (userID) => {
    return meetingMemberList.value.findIndex(e => {
        return e.userID === userID
    })
}
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
const onError=(reason)=>{
    console.log('errorReason',reason)
}
const onEnterRoom = (elapsed)=>{
    console.log('enterRoom',elapsed,'@@@@')
}
const onExitRoom = (reason)=>{
    console.log('exitRoomReason',reason)
}
const initMeetingCallback = () => {
    trtc.on('onError', onError);
    trtc.on('onEnterRoom', onEnterRoom);
    trtc.on('onExitRoom', onExitRoom);
}
const initMeeting = () => {
    trtc = new rtcCloud()
    initMeetingCallback();
    enterMeetingRoom()
    
}
const initDeviceStatus = () => {

}
const enterMeetingRoom = () => {
    //todo测试数据替换{meetingHeader.meetingID,userID:userInfo.userId,userName:userInfo.userName}
    const trtcParams = new TRTCParams();
    trtcParams.userId =  'denny';
    trtcParams.sdkAppId = 1600000376;
    trtcParams.userSig = 'eJyrVgrxCdYrSy1SslIy0jNQ0gHzM1NS80oy0zLBwkB2XiVUojglO7GgIDNFycrQzAAEjM3NIDKpFQWZRalAcVNTUyOgBES0JDMXJGZmaWhsaWpsZg41JTMdaK5JSaZhvnaop0Ghc4y*R2pAZY55YEluUbZJeW56qnekn2GGt3*GgWWeq2dWsa1SLQBfBjHk';
    trtcParams.roomId = 2234;
    trtc.enterRoom(trtcParams, TRTCAppScene.TRTCAppSceneVideoCall);
}

const leaveRoom = () => {

}
onMounted(() => {
    initMeeting()
});
onBeforeUnmount(() => {

})
</script>

<style lang="less">
@import "meeting_room.less";
</style>
