<template>
    <div class="meeting-list-container">
        <meeting-menu/>
        <meeting-list-filter/>
        <div class="list-box">
            <meeting-list-card/>
            <meeting-list-card/>
            <meeting-list-card/>
            <meeting-list-card/>
            <meeting-list-card/>
            <meeting-list-card/>
            <meeting-list-card/>
        </div>
    </div>
</template>
<script setup lang="ts">
import MeetingMenu from '@/components/menu/MeetingMenu.vue';
import MeetingListFilter from '@/views/meeting/filter/MeetingListFilter.vue';
import MeetingListCard from '@/components/meeting_list/MeetingListCard.vue';
</script>
<style lang="less">
@import "index.less";
</style>
