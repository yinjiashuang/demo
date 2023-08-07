<template>
    <div class="meeting-container">
        <meeting-menu/>
        <meeting-list-filter :current-tab="currentTab" @change-tab="changeTab"/>
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
import {ref} from 'vue';
// 当前tab
const currentTab = ref(0);
// 全部
const allList = ref([{
    meeting_id: '12313',
    meeting_status: '待开始',
    meeting_name: '解决维修相关难点解决维修相关难点解决维修相关难点',
    originator: {
        user_id: '123',
        name: '123123'
    },
    reserve_start_time: '10:30:00-11:30:00',
    reserve_end_time: '10:30:00-11:30:00',
    attendee_list: [
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        }
    ]
}]);
// 已开始
const startedList = ref([{
    meeting_id: '12313',
    meeting_status: '待开始',
    meeting_name: '解决维修相关难点解决维修相关难点解决维修相关难点',
    originator: {
        user_id: '123',
        name: '123123'
    },
    reserve_start_time: '10:30:00-11:30:00',
    reserve_end_time: '10:30:00-11:30:00',
    attendee_list: [
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        }
    ]
}]);
// 未开始
const unStartList = ref([{
    meeting_id: '12313',
    meeting_status: '待开始',
    meeting_name: '解决维修相关难点解决维修相关难点解决维修相关难点',
    originator: {
        user_id: '123',
        name: '123123'
    },
    reserve_start_time: '10:30:00-11:30:00',
    reserve_end_time: '10:30:00-11:30:00',
    attendee_list: [
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        }
    ]
}]);
// 我预定
const scheduledList = ref([{
    meeting_id: '12313',
    meeting_status: '待开始',
    meeting_name: '解决维修相关难点解决维修相关难点解决维修相关难点',
    originator: {
        user_id: '123',
        name: '123123'
    },
    reserve_start_time: '10:30:00-11:30:00',
    reserve_end_time: '10:30:00-11:30:00',
    attendee_list: [
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        },
        {
            name: '马世鹏'
        }
    ]
}]);
/**
 * method
 */
const changeTab = (index: number): void => {
    currentTab.value = index;
    console.log(index);
};
</script>
<style lang="less">
@import "index.less";
</style>
