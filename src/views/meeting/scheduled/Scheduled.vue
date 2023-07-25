<template>
    <div class="scheduled-meeting-container">
        <div class="join-form">
            <div class="join-title-bar">
                <span class="title">预定会议</span>
                <el-button size="large" type="info" link :icon="ArrowLeft" @click="back">返回</el-button>
            </div>
            <el-form class="form-body" label-position="top" :rules="rules">
                <el-form-item label="会议名称" prop="roomName">
                    <el-input
                        v-model="roomName"
                        placeholder="请输入会议名称"
                        size="large"
                        maxlength="50"
                        type="text"
                    />
                </el-form-item>
            </el-form>
            <el-button class="button" size="large" type="primary" @click="handleButton">预订</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ArrowLeft} from '@element-plus/icons-vue';
import {useRoute, useRouter} from 'vue-router';
import {ref} from 'vue';

const router = useRouter();
const route = useRoute();
// 会议名称
const roomName = ref('');

const rules = {
    roomName: [
        {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback): void => {
                if (!roomName.value || roomName.value.length === 0) {
                    callback(new Error('请输入会议名称'));
                    return;
                }
                callback();
            }
        }
    ]
};
/**
 * Method
 */
// 返回
const back = (): void => {
    router.back();
};
const handleButton = (): void => {
    if (isJoin.value) {
        // todo 加入会议
    } else {
        // todo 先预定会议 再加入会议
        createMeeting();
    }
};

</script>
<style lang="less">
@import "scheduled.less";
</style>
