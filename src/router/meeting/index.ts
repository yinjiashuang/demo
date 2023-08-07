import {RouteRecordRaw} from 'vue-router';
import meetingList from '@/views/meeting/list/Index.vue';
import joinMeeting from '@/views/meeting/join/Join.vue';
import Scheduled from '@/views/meeting/scheduled/Scheduled.vue';
import meetingRoom from '@/views/meeting/meeting_room/MeetingRoom.vue';

export const meetingRoutes: Array<RouteRecordRaw> = [
    {
        path: '/meeting/list',
        name: 'meeting_list',
        component: meetingList,
        meta: {
            title: '会议列表'
        },
        children: [
            {
                path: '/all',
                name: 'meeting_list_all',
                component: import('@/views/meeting/meeting_room/MeetingRoom.vue')
            }
        ]
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
    },
    {
        path: '/meeting/room',
        name: 'meeting_room',
        component: meetingRoom,
        meta: {
            title: '会议室'
        }
    },
    {
        path: '/meeting/scheduled',
        name: 'scheduled_meeting',
        component: Scheduled,
        meta: {
            title: '预订会议'
        }
    }
];
