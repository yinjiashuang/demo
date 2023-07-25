import {RouteRecordRaw} from 'vue-router';
import meetingList from '../../views/meeting/list/Index.vue';
import joinMeeting from '../../views/meeting/join/Join.vue';

export const meetingRoutes: Array<RouteRecordRaw> = [
  {
    path: '/meeting/list',
    name: 'meeting_list',
    component: meetingList,
    meta: {
      title: '会议列表'
    }
  },
  {
    path: '/meeting/join',
    name: 'join_meeting',
    component: joinMeeting,
    meta: {
      title: '加入会议'
    }
  },
  {
    path: '/meeting/quick',
    name: 'quick_meeting',
    component: joinMeeting,
    meta: {
      title: '快速会议'
    }
  }
];
