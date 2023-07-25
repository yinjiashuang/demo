<template>
    <div class="join-meeting-container">
        <div class="join-form">
            <div class="join-title-bar">
        <span class="title">
          {{ isJoin ? '加入会议' : '快速会议' }}
        </span>
                <el-button size="large" type="info" link :icon="ArrowLeft" @click="back">返回</el-button>
            </div>
            <el-form class="form-body" label-position="top" :rules="rules">
                <el-form-item label="会议号" prop="roomId" :required="isJoin">
                    <el-input
                        v-model="roomId"
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
import {useRoute, useRouter} from 'vue-router';
import {onMounted, ref} from 'vue';
import {ArrowLeft} from '@element-plus/icons-vue';
import * as moment from 'moment';

// 是否为加入
const isJoin = ref(true);
// 房间id
const roomId = ref('');
// 是否开启麦克风
const isEnableMic = ref(true);
// 是否开启摄像头
const isEnableCamera = ref(true);

const router = useRouter();
const route = useRoute();
const rules = {
    roomId: [
        {
            trigger: 'blur',
            validator: (callback): void => {
                if (!isJoin.value) {
                    callback();
                    return;
                }
                if (!roomId.value) {
                    callback(new Error('请输入会议号'));
                } else {
                    if (roomId.value.length !== 9) {
                        callback(new Error('会议号应为9位，清出新确认会议号'));
                    } else {
                        callback();
                    }
                }
            }
        }
    ]
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
        roomId.value = value.replace(/[^\d.]/g, '');
    }
};

const handleButton = (): void => {
    if (isJoin.value) {
        // todo 加入会议
    } else {
        // todo 先预定会议 再加入会议
        createMeeting();
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
