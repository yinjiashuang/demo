<template>
    <div class="gird-frame">
        <!-- 成员展示-->
        <div class="gird-content">
            <div class="button-screen">
                <img v-if="!girdFrame.isClickable_l" class="left-button" src="@/assets/meeting_room/ic_meeting_room_left_page_disabled.svg" alt="">
                <img v-else class="left-button available-left" src="@/assets/meeting_room/ic_meeting_room_left_page_normal.svg" alt="" @click="turnPage(0)">
            </div>
            <div class="member-screen">
                <div class="member-pagination" v-for="page in totalPage" :key=page v-show="page === girdFrame.currentPage">
                    <member-card :class="getMemberClass(page)" v-for="item in getCurrentPageUsers(page)"
                                 :nickName="item.nickName"
                                 :userName="item.userName"
                                 :isMute="item.isMute"
                                 :isShow="item.isShow"
                                 :userID="item.userID"
                                 :isHost="item.isHost!"
                                 :connectStatus="item.connectStatus!"
                    />
                </div>
            
            </div>
            <div class="button-screen">
                <img v-if="!girdFrame.isClickable_r" class="right-button" src="@/assets/meeting_room/ic_meeting_room_right_page_disabled.svg" alt="">
                <img v-else class="left-button available-right" src="@/assets/meeting_room/ic_meeting_room_right_page_normal.svg" alt="" @click="turnPage(1)">
            </div>
        
        </div>
        <!-- 页码显示-->
        <div class="gird-page">
            <img v-for="(page,index) in totalPage" :key="page" :src="girdFrame.currentPage == index +1 ?
            require('@/assets/meeting_room/ic_meeting_room_current_page.svg'):require('@/assets/meeting_room/ic_meeting_room_normal_page.svg')" alt="">
        </div>
    
    </div>
</template>

<script setup lang="ts">
import {require} from '@/utils/require.ts';
import {computed, onMounted, reactive, watch} from 'vue';
import memberCard from '@/components/meeting_room/member_show_card/Index.vue';


const props = defineProps({meetingMemberList: Array, totalPage: Number});
const girdFrame = reactive({
    isClickable_l: false,
    isClickable_r: false,
    currentPage: 1,
    
});
//左侧翻页按钮是否可点击状态
girdFrame.isClickable_l = computed(() => {
    if (props.totalPage == 1) {
        return false;
    }
    if (girdFrame.currentPage == 1) {
        return false;
    } else {
        return true;
    }
}).value
//右侧翻页按钮是否可点击状态
girdFrame.isClickable_r = computed(() => {
    if (props.totalPage == 1) {
        return false;
    }
    if (girdFrame.currentPage == props.totalPage) {
        return false;
    } else if (girdFrame.currentPage > 1 || girdFrame.currentPage < props.totalPage!) {
        return true;
    }else{
        return false
    }
}).value
//当前页面显示用户列表
const getCurrentPageUsers = (page:any) => {
    let filterArr = [];
    filterArr = (props.meetingMemberList as any).filter(
        (item,index) =>  index >= (page - 1) * 25 && index < page * 25
    );
    
    return filterArr;
};
const getMemberClass = (page:any) => {
    if (getCurrentPageUsers(page).length < 5) {
        return 'member-lower-5';
    } else if (getCurrentPageUsers(page).length >= 5 && getCurrentPageUsers(page).length < 9) {
        return 'member-over-5';
    } else if (getCurrentPageUsers(page).length >= 9 && getCurrentPageUsers(page).length < 16) {
        return 'member-over-9';
    } else {
        return 'member-over-16';
    }
};

const turnPage=(to:any)=>{
    // 1:下一页 0:上一页
    if (to == 1) {
        if (props.totalPage! >= girdFrame.currentPage + 1) {
            girdFrame.currentPage++;
        }
    } else {
        if (girdFrame.currentPage - 1 > 0) {
            girdFrame.currentPage--;
        }
    }
    
}

onMounted(() => {});
</script>


<style lang="less">
@import "index";
</style>
