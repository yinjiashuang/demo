<template>
    <div class="scheduled-meeting-container">
        <div class="join-form">
            <div class="join-title-bar">
                <span class="title">预定会议</span>
                <el-button size="large" type="info" link :icon="ArrowLeft" @click="back">返回</el-button>
            </div>
            <el-form
                class="form-body"
                label-position="top"
                :rules="rules"
                ref="scheduleForm"
                :model="formValue">
                <el-form-item label="会议名称" prop="roomName">
                    <el-input
                        v-model="formValue.roomName"
                        placeholder="请输入会议名称"
                        size="large"
                        maxlength="50"
                        type="text"
                    />
                </el-form-item>
                <el-form-item label="预订日期" prop="scheduleDate">
                    <el-date-picker
                        :clearable="false"
                        v-model="formValue.scheduleDate"
                        type="date"
                        placeholder="预定日期"
                        size="large"
                        :disabled-date="disabledDate"
                    />
                </el-form-item>
                <el-form-item label="预定时间" prop="scheduleTimeRange">
                    <el-time-picker
                        size="large"
                        :clearable="false"
                        v-model="formValue.scheduleTimeRange"
                        is-range
                        arrow-control
                        range-separator="至"
                        start-placeholder="开始时间"
                        end-placeholder="结束时间"
                    />
                </el-form-item>
                <el-form-item label="参与人" prop="attendeeList">
                
                </el-form-item>
            </el-form>
            <el-button class="button" size="large" type="primary" @click="handleButton">预订</el-button>
        </div>
    </div>
</template>
<script setup lang="ts">
import {ArrowLeft} from '@element-plus/icons-vue';
import {useRouter} from 'vue-router';
import {reactive, ref} from 'vue';
import {FormInstance} from 'element-plus';

interface ScheduleForm {
    roomName: string;
    scheduleDate: string;
    scheduleTimeRange: Array<string>;
}

const router = useRouter();
const formValue = reactive<ScheduleForm>({
    roomName: '',
    scheduleDate: '',
    scheduleTimeRange: []
});
const scheduleForm = ref<FormInstance>();
// 表单校验规则
const rules = {
    roomName: [
        {
            type: 'string',
            required: true,
            trigger: 'blur',
            message: '请输入会议名称'
        }
    ],
    scheduleDate: [
        {
            type: 'date',
            required: true,
            trigger: 'blur',
            message: '请选择预定日期'
        }
    ],
    scheduleTimeRange: [
        {
            type: 'array',
            required: true,
            trigger: 'blur',
            message: '请选择预定时间'
        }
    ],
    attendeeList: [
        {
            required: false,
            trigger: 'change',
        }
    ]
};
// 禁用日期规则
const disabledDate = (v) => {
    return v.getTime() < new Date().getTime() - 86400000;
};
/**
 * Method
 */
// 返回
const back = (): void => {
    router.back();
};
const handleButton = async () => {
    if (await scheduleForm.value?.validate()) {
        console.log(1);
    }
    setTimeout(() => {
    
    }, 1000);
    // createMeeting();
};

</script>
<style lang="less">
@import "scheduled.less";
</style>
