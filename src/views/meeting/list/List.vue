<template>
    <div class="meeting-list-container">
        <meeting-list-card v-for="(item,index) in props.list" :key="index" :item="item"/>
    </div>
</template>
<script setup lang="ts">
import MeetingListCard from '@/components/meeting_list/MeetingListCard.vue';

const props = defineProps({
    currentTab: Number,
    list: []
});
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
