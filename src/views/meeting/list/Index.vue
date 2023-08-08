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
import * as moment from 'moment/moment';

/**
 * params
 */
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
    return result;
});
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
            originator = JSON.parse(window.sessionStorage.getItem('userInfo') || '{}').userId;
            break;
        default:
            status = 3;
            break;
    }
    const params = {
        meeting_status: status,
        originator: undefined
    };
    if (originator) {
        params.originator = originator;
    }
    const res = await getMeetingList(params);
    if (res.code == 200) {
        let result = res.result;
        result.forEach((item) => {
            item.reserve_start_time = moment(item.reserve_start_time, 'yyyy-MM-dd HH:mm:ss').toDate();
            item.reserve_end_time = moment(item.reserve_end_time, 'yyyy-MM-dd HH:mm:ss').toDate();
        });
        console.log(result);
        switch (currentTab.value) {
            case 0:
                allList.value = result;
                break;
            case 1:
                startedList.value = result;
                break;
            case 2:
                unStartList.value = result;
                break;
            case 3:
                scheduledList.value = result;
                break;
        }
    }
};
/**
 * lifecycle
 */
onMounted(() => {
    getList();
});
</script>
<style lang="less">
@import "index.less";
</style>
