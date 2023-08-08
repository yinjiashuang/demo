<template>
    <div class="meeting-list-container">
        <meeting-list-card v-for="(item,index) in props.list" :key="index" :item="item" :user-info="userInfo"/>
    </div>
</template>
<script setup lang="ts">
import MeetingListCard from '@/components/meeting_list/MeetingListCard.vue';
import {IMeetingList} from '@/api/meeting_list';
import {reactive} from 'vue';

const props = defineProps({
    currentTab: Number,
    list: Array<IMeetingList>
});
// 当前用户信息
const userInfo = reactive(JSON.parse(window.sessionStorage.getItem('userInfo')));
</script>

<style lang="less">
.meeting-list-container {
    padding: 0 40px 20px 40px;
    display: flex;
    flex-wrap: wrap;
    flex: 1;
    overflow: auto;
}
</style>
