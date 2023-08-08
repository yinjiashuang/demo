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
                <el-form-item label="会议号" prop="roomId">
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
            <el-button class="button" size="large" type="primary" @click="handleButton">
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
import * as moment from 'moment';
import {ElMessage, FormInstance} from 'element-plus';
import {joinMeeting} from '@/api/meeting_list';

interface IJoinForm {
    roomId: string;
}

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
const router = useRouter();
const route = useRoute();
const validateRoomID = (rules, value, cb) => {
    if (!value) {
        cb(new Error('请输入会议号'));
    } else {
        if (value.length !== 9) {
            cb(new Error('会议号应为9位，请重新确认会议号'));
        } else {
            cb();
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
// 返回
const back = (): void => {
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
    if (joinForm.value?.validate()) {
        // 加入会议
        if (isJoin.value) {
            const params = {
                meeting_id: formValue.roomId,
            };
            const res = await joinMeeting(params);
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
        } else {
            // 创建会议
            // todo 先预定会议 再加入会议
            createMeeting();
        }
    }
};

const createMeeting = (): void => {
    const now = moment(new Date().getTime());
    const startTime = now.format('YYYY-MM-DD HH:mm:ss');
    const endTime = now.add(30, 'minute').format('YYYY-MM-DD HH:mm:ss');
    console.log(startTime, endTime);
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
