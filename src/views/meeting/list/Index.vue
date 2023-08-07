<template>
    <div class="meeting-container">
        <meeting-menu/>
        <meeting-list-filter :current-tab="currentTab" @change-tab="changeTab"/>
        <div class="empty-content" v-if="showPlaceHolder">
            <img alt="" src="@/assets/meeting/ic_meeting_empty_placeholder.png"/>
            <span>暂无会议</span>
        </div>
        <meeting-list v-show="currentTab === 0" :current-tab="currentTab" :list="allList"/>
        <meeting-list v-show="currentTab === 1" :current-tab="currentTab" :list="startedList"/>
        <meeting-list v-show="currentTab === 2" :current-tab="currentTab" :list="unStartList"/>
        <meeting-list v-show="currentTab === 3" :current-tab="currentTab" :list="scheduledList"/>
    </div>
</template>
<script setup lang="ts">
import MeetingMenu from '@/components/menu/MeetingMenu.vue';
import MeetingListFilter from '@/views/meeting/filter/MeetingListFilter.vue';
import MeetingList from '@/views/meeting/list/List.vue';
import {computed, onMounted, ref} from 'vue';
import {getMeetingList, IMeetingList} from '@/api/meeting_list';
// 当前tab
const currentTab = ref(0);
// 全部
const allList = ref<Array<IMeetingList>>([]);
// 已开始
const startedList = ref<Array<IMeetingList>>([]);
// 未开始
const unStartList = ref<Array<IMeetingList>>([]);
// 我预定
const scheduledList = ref<Array<IMeetingList>>([]);
/**
 * method
 */
const changeTab = (index: number): void => {
    currentTab.value = index;
    getList();
};

const getList = async () => {
    let status: number;
    let originator = null;
    switch (currentTab.value) {
        case 0:
            status = 3;
            break;
        case 1:
            status = 1;
            break;
        case 2:
            status = 0;
            break;
        case 3:
            status = 3;
            originator = JSON.parse(window.sessionStorage.getItem('userInfo')).userId;
            break;
        default:
            status = 3;
            break;
    }
    const params = {
        meeting_status: status,
    };
    if (originator) {
        params.originator = originator;
    }
    const res = await getMeetingList(params);
    if (res.code == 200) {
        switch (currentTab.value) {
            case 0:
                allList.value = res.result;
                break;
            case 1:
                startedList.value = res.result;
                break;
            case 2:
                unStartList.value = res.result;
                break;
            case 3:
                scheduledList.value = res.result;
                break;
        }
    }
};
const showPlaceHolder = computed(() => {
    let result = false;
    switch (currentTab.value) {
        case 0:
            result = allList.value.length === 0;
            break;
        case 1:
            result = startedList.value.length === 0;
            break;
        case 2:
            result = unStartList.value.length === 0;
            break;
        case 3:
            result = scheduledList.value.length === 0;
            break;
        default:
            break;
    }
    console.log(result);
    return result;
});
onMounted(() => {
    getList();
});
</script>
<style lang="less">
@import "index.less";
</style>
