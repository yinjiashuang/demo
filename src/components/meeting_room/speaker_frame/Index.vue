<template>
    <div class="speaker-frame">
        <div class="speaker-frame-right">
            <member-card v-for="(item,index) in meetingMemberList as any"
                         :class="index == 0? 'left-item':'right-item'"
                         :key="item.userID"
                         :nickName="item.nickName"
                         :userName="item.userName"
                         :isMute="item.isMuted"
                         :isShow="item.isShow"
                         :userID="item.userID"
                         :userPlayer="item.userPlayer"
                         :isHost="item.isHost!"
                         :connectStatus="item.connectStatus!"
                         @dblclick="handlerScreenIn(item)"/>
        </div>
    
    
    </div>
</template>

<script setup lang="ts">
import memberCard from '@/components/meeting_room/member_show_card/Index.vue';

const props = defineProps({meetingMemberList: Array,});
const handlerScreenIn = (item) => {
    if (!item.isShow) return;
    // todo获取排名第一的用户，传递给父组件重新排序
};
</script>


<style lang="less">
@import "index";
</style>
