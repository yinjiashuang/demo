<template>
    <div class="meeting-list-card—container">
        <div class="meeting-card-date">
            <div class="week">今天</div>
            <div class="date">08月7日</div>
        </div>
        <div class="meeting-card-main-box">
            <!-- 会议状态 -->
            <div class="top-operate-area">
                <div class="meeting-status-box">
                    <img class="icon" :src="props.item.meeting_status === '待开始' ?unStartStatusUrl :staringStatusUrl" alt=""/>
                    <div>{{ props.item.meeting_status }}</div>
                </div>
                <el-popover
                    placement="bottom"
                    width="164px"
                    trigger="click"
                    popper-class="meeting-list-card-more-popover"
                    v-if="props.item.originator.user_id == userInfo.userId && props.item.meeting_status == '待开始' || true">
                    <template #reference>
                        <img alt="更多" class="more-btn" src="@/assets/meeting/ic_meeting_list_card_more.png"/>
                    </template>
                    <div class="more-operate-btn" @click="handleEditMeeting(item)">
                        <img src="@/assets/meeting/ic_meeting_scheduled_edit.png" alt="编辑"/>
                        <div class="edit-text">编辑</div>
                    </div>
                    <div class="more-operate-btn" @click="handleDelMeeting(props.item.meeting_id)">
                        <img src="@/assets/meeting/ic_meeting_delete.png" alt="删除"/>
                        <div class="del-text">删除</div>
                    </div>
                </el-popover>
            </div>
            <div class="meeting-list-card-info">
                <div class="meeting-card-avatar">
                    <div class="name-suffix">{{ getSubName(props.item.originator.name) }}</div>
                    <div class="sponsor">发起人</div>
                </div>
                <div class="info-box">
                    <div class="meeting-title">{{ props.item.meeting_name }}</div>
                    <div class="info-item">
                        <div class="title">会议号：</div>
                        <div class="value">{{ props.item.meeting_id }}</div>
                        <img alt="" class="share-btn" src="@/assets/ic_share.png" @click="shareMeeting(props.item.meeting_id)"/>
                    </div>
                    <div class="info-item">
                        <div class="title">时间：</div>
                        <div class="value">{{ props.item.reserve_start_time }}</div>
                    </div>
                    <el-tooltip content="123">
                        <div class="info-item">
                            <div class="title">参会人：</div>
                            <div class="value">{{ formatUserList() }}</div>
                        </div>
                    </el-tooltip>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import clipboard from 'vue-clipboard3';
import {ElMessage, ElMessageBox} from 'element-plus';
import {reactive} from 'vue';
import {getImage} from '@/utils/utils.ts';

const {toClipboard} = clipboard();
/**
 * params
 */
const userInfo = reactive<{ userId: string, name: string }>(JSON.parse(window.sessionStorage.getItem('userInfo')));

const props = defineProps({
    item: Object
});
const unStartStatusUrl = getImage('@/assets/meeting/ic_meeting_status_un_start.png');
const staringStatusUrl = getImage('@/assets/meeting/ic_meeting_status_starting.png');
/**
 * method
 */
/**
 * 编辑会议
 * @param item
 */
const handleEditMeeting = (item) => {
    // todo 编辑
};

/**
 * 分享会议
 * @param id 会议id
 */
const shareMeeting = (id) => {
    let msg = `您有一个待参与会议\n会议号:${id}\n请您登录鹰眼平台加入会议`;
    copy(msg);
};

const copy = async (Msg) => {
    try {
        //复制
        await toClipboard(Msg);
        //下面可以设置复制成功的提示框等操作
        ElMessage({
            customClass: 'messageBox',
            showClose: true,
            message: '当前会议号已复制到粘贴板',
        });
    } catch (e) {
        //复制失败
        ElMessage.warning('请输入会议号后复制');
    }
};

// 格式化用户列表
const formatUserList = () => {
    const userList = props.item.attendee_list;
    return userList.map(item => item.name).join('；');
};

const hideAllUserList = (index) => {
    $('.userListDetail')[index].style.display = 'none';
};

const showAllUserList = (index) => {
    $('.userListDetail')[index].style.display = 'block';
};

// 删除会议
const handleDelMeeting = (ID) => {
    ElMessageBox.confirm('确定删除该会议吗 ?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
    })
        .then(() => {
            delOnlineMeetingList({meeting_id_list: [ID]}).then((res) => {
                if (res.code != 200) return ElMessage.error(res.msg);
                
                ElMessage.success('删除成功');
                let obj = undefined;
                if (state.currentTabIndex === 3) {
                    obj = {
                        meeting_status: 3,
                        originator: state.userID,
                        keyword: state.keyword,
                    };
                } else {
                    obj = {
                        meeting_status: state.currentType,
                        keyword: state.keyword,
                    };
                }
                getMeeting(obj);
            });
        })
        .catch(() => {
            // ElMessage({
            //   type: "info",
            //   message: "Delete canceled",
            // });
        });
};

/**
 * 网络
 */
const getMeeting = (str) => {
    //type -- 0待开始/1已开始/2已结束/3待开始和已开始
    getOnlineMeetingList(str)
        .then((res) => {
            if (res.code != 200) return ElMessage.error(res.msg);
            
            state.currentList = res.result;
        })
        .catch((err) => {
            console.log(err, '!!!');
        });
};

// 获取后两位字符
const getSubName = (str) => {
    if (str.length <= 2) {
        return str;
    } else {
        return str.slice(-2);
    }
};
</script>
<style lang="less">
@import "meeting_list_card.less";
</style>
