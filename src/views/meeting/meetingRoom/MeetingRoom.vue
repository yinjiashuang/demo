<template>
    <div class="meeting-room-framework">
        <div class="header">
            <div class="header-item"></div>
            <div class="header-item">{{ meetingHeader.meetingName }}</div>
            
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
            <girdFrame :meetingMemberList="meetingMemberList" :totalPage="meetingHeader.memberCount" />
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
import meetingButton from '@/components/meetingRoom/MeetingRoomBottomBtn/Index.vue';
import girdFrame from '@/components/meetingRoom/MeetingRoomGirdFrame/Index.vue'
import {useRouter} from 'vue-router';
import {ElMessage} from 'element-plus';

const zgEngine = window.zgEngine;
const zgDefines = window.zgDefines;

let zg = null
const userInfo = JSON.parse(`${window.sessionStorage.getItem('userInfo')}`);

// 会议顶部
const meetingHeader = reactive({
    meetingName: 'XXXXXXX',
    meetingTimer: '00:00:00',
    meetingID: '',
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
        const query = router.currentRoute.value.query;
        meetingHeader.meetingName = query.roomName
        meetingHeader.meetingID = query.roomId
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
    // 登录房间回调
    zgEngine.on('onRoomStateUpdate', (param) => {
        if (param.state == 2) {
            ElMessage.info('进入房间')
            
            zgEngine.startPublishingStream('user-123456')
            meetingMemberList.value.push({
                weight: 5, userName: userInfo.userName, nickName: userInfo.userName.length > 2
                    ? userInfo.userName.slice(-2)
                    : userInfo.userName,
                isMute: micStatus.value == 1 ? true : false,
                isShow: camStatus.value == 1 ? true : false
                
            })
            // zgEngine.startPreview({
            //     canvas: document.getElementById('showMe')
            // });
            
            
        }
    });

//     房间内其他用户增加或减少的回调通知
    zgEngine.on('onRoomUserUpdate', (roomID, updateType, userList) => {
        if (updateType == 0) { //添加用户
        
        } else { //删除用户
        
        }
    })
//     其他用户推流的增加和减少
    zgEngine.on('onRoomStreamUpdate', (roomID, updateType, streamList) => {
        if (updateType == 0) { //增加流
        
        } else { // 减少流
        
        }
        
    })
    
    
}
const initMeeting = () => {
    const profile = {
        appID: 78190877,
        appSign: '507f7e72bd05ac417581a50c9a8da34014a99c4e055082495beb623c6eb07c62',
        scenario: zgDefines.ZegoScenario.Default
    };
    
    return zgEngine.createEngine(profile)
}
const initDeviceStatus = () => {
    camStatus.value = zgEngine.getVideoDeviceList().length == 0 ? -1 : 0
    micStatus.value = zgEngine.getAudioDeviceList(0).length == 0 ? -1 : 0
}
const enterMeetingRoom = () => {
    // {meetingHeader.meetingID,userID:userInfo.userId,userName:userInfo.userName}
    console.log('登录')
    zgEngine.loginRoom('1234', {userID: 'user-123456', userName: '小殷'}, {isUserStatusNotify: true})
}

const leaveRoom = () => {
    zgEngine.stopPublishingStream()
    zgEngine.logoutRoom('1234')
    zgEngine.destroyEngine()
}
onMounted(() => {
    console.log('组件挂载完成');
    // initMeeting().then(() => {
    //     console.log('初始化zego实例成功===')
    //     initMeetingCallback()
    //     initDeviceStatus()
    //     enterMeetingRoom()
    // }).catch((err) => {
    //     console.log(err)
    //     zgEngine.destroyEngine()
    // })
    
});
onBeforeUnmount(() => {

})
</script>

<style lang="less">
@import "meeting_room.less";
</style>
