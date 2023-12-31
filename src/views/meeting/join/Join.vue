<template>
    <div class="join-meeting-container">
        <div class="join-form">
            <div class="join-title-bar">
                <span class="title">
                  {{ isJoin ? '加入会议' : '快速会议' }}
                </span>
                <el-button size="large" type="info" link :icon="ArrowLeft" @click="back">返回</el-button>
            </div>
            <el-form ref="joinForm" :model="formValue" :rules="rules" class="form-body" label-position="top">
                <el-form-item label="会议号" prop="roomId" :required="isJoin">
                    <el-input
                        v-model="formValue.roomId"
                        :disabled="!isJoin"
                        :placeholder="isJoin ? '请输入会议号' : '点击下方按钮创建并加入会议'"
                        size="large"
                        maxlength="9"
                        type="text"
                        @input="handleInput"
                    />
                </el-form-item>
            </el-form>
            <el-button class="button" size="large" type="primary" @click="handleButton" :loading="loading">
                {{ isJoin ? '加入会议' : '创建并加入会议' }}
            </el-button>
            <div class="join-change-device-box">
                <el-checkbox v-model="isEnableMic">入会开启麦克风</el-checkbox>
                <el-checkbox v-model="isEnableCamera">入会开启摄像头</el-checkbox>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
import {RouteLocationRaw, useRoute, useRouter} from 'vue-router';
import {onMounted, reactive, ref} from 'vue';
import {ArrowLeft} from '@element-plus/icons-vue';
import * as moment from 'moment/moment';
import {ElMessage, FormInstance} from 'element-plus';
import {ICreateMeeting, joinMeetingApi, scheduleMeeting} from '@/api/meeting_list';

interface IJoinForm {
    roomId: string;
}

const router = useRouter();
const route = useRoute();
// 是否为加入
const isJoin = ref(true);
// 房间id
const formValue = reactive<IJoinForm>({
    roomId: ''
});
// 是否开启麦克风
const isEnableMic = ref(true);
// 是否开启摄像头
const isEnableCamera = ref(true);
// ref
const joinForm = ref<FormInstance>();
// 按钮加载
const loading = ref(false);
const validateRoomID = (_: any, value: any, callback: any) => {
    if (!isJoin.value) {
        callback();
        return;
    }
    if (!value || value === '') {
        callback(new Error('请输入会议号'));
    } else {
        if (value.length !== 9) {
            callback(new Error('会议号应为9位，请重新确认会议号'));
        } else {
            callback();
        }
    }
};
const rules = {
    roomId: {
        trigger: 'blur',
        required: true,
        message: '请输入会议号',
        validator: validateRoomID
    }
};

/**
 * method
 */
/**
 * 返回
 */
const back = (): void => {
    if (loading.value) {
        return;
    }
    router.back();
};

// 输入拦截
const handleInput = (value: string): void => {
    const reg = /^[\d.]+$/;
    if (value && !reg.test(value)) {
        formValue.roomId = value.replace(/[^\d.]/g, '');
    }
};

const handleButton = async (): Promise<any> => {
    if (await joinForm.value?.validate()) {
        loading.value = true;
        // 加入会议
        if (isJoin.value) {
            await joinMeeting();
        } else {
            // 创建会议
            await createMeeting();
        }
        loading.value = false;
    }
};

const createMeeting = async () => {
    const now = moment(new Date().getTime());
    const startTime = now.format('YYYY-MM-DD HH:mm:ss');
    const endTime = now.add(30, 'minute').format('YYYY-MM-DD HH:mm:ss');
    const userInfo = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}');
    const params: ICreateMeeting = {
        meeting_name: `${userInfo.name}的快速会议`,
        start_time: startTime,
        end_time: endTime,
        attendee_list: []
    };
    const res = await scheduleMeeting(params);
    if (res.code === 200) {
        await joinMeeting(res.meeting_id);
    }
};

/**
 * 加入会议
 */
const joinMeeting = async (roomId: string = formValue.roomId) => {
    const params = {
        meeting_id: roomId,
    };
    const res = await joinMeetingApi(params);
    if (res.code === 200) {
        const to: RouteLocationRaw = {
            name: 'meeting_room',
            query: {
                hostUserId: res.result.host,
                enable_mic: isEnableMic.value ? 1 : 0,
                enable_camera: isEnableCamera.value ? 1 : 0,
                roomId: params.meeting_id,
                roomName: res.result.meeting_name
            }
        };
        await router.push(to);
    } else {
        ElMessage.error(res.msg);
    }
};
/**
 * lifecycle
 */
onMounted(() => {
    isJoin.value = route.name == 'join_meeting';
});
</script>

<style scoped lang="less">
@import "join.less";
</style>
