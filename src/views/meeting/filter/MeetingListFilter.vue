<template>
  <div class="meeting-list-filter-container">
    <div class="filter-title">待参与会议</div>
    <div class="filter-tab-box">
      <div
        v-for="(item, index) in tabs"
        :key="index"
        class="filter-tab"
        :class="{ selected: index == props.currentTab }"
        @click="changeTab(index)"
      >
        {{ item }}
      </div>
    </div>
    <el-row :gutter="25" style="flex: 1">
      <el-col :span="6">
        <el-date-picker
          v-model="dateRange"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          size="large"
        />
      </el-col>
      <el-col :span="6">
        <el-input
          v-model="searchContent"
          size="large"
          placeholder="请输入会议名称、会议号、发起人"
          :suffix-icon="Search"
          @keypress.enter.prevent="onSearch"
          @input="searchContentChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import {reactive, ref} from 'vue';
import {Search} from '@element-plus/icons-vue';

// tab
const tabs = reactive(["全部", "已开始", "未开始", "我预定"]);
// 当前tab
const props = defineProps({
    currentTab: Number,
});
// 日期区间
const dateRange = ref("");
// 搜索内容
const searchContent = ref("");

const emits = defineEmits(['changeTab']);



/**
 * method
 */
// 切换tab
const changeTab = (index: number): void => {
    emits('changeTab', index);
};
// 输入框输入内容变化
const searchContentChange = (change: string): void => {
  console.log("变化：", change);
};
// 回车监听
const onSearch = (value: string | number): void => {
  console.log("搜索", searchContent.value);
  console.log("value:", value);
};
</script>

<style scoped lang="less">
@import "meeting_list_filter.less";
</style>
