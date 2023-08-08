// https://test.stoneintelligent.com:8003/yy/api/v1/remote/online/meeting/read?meeting_status=1

// const $api = {
// };
//
// $api.getMeetingList = () => {
//
// };
//
// export default $api;


import {BaseRequest} from '@/service';

/**
 * 获取会议列表
 * @param params 参数
 */
export const getMeetingList = (params: { meeting_id?: string, meeting_status: number, originator?: string }) => {
    return BaseRequest<{ meeting_id?: string, meeting_status: number, originator?: string }, Array<IMeeting>>({
        url: '/v1/remote/online/meeting/read',
        method: 'get',
        params: {...params}
    });
};

/**
 * 加入会议
 * @param data
 */
export const joinMeeting = (data: { meeting_id: string }) => {
    return BaseRequest<{ meeting_id: string }, IMeeting>({
        url: '/v1/remote/online/meeting/join',
        method: 'put',
        data
    });
};

export interface IMeeting {
    meeting_id: string,
    meeting_name: string,
    reserve_start_time: string | Date,
    reserve_end_time: string | Date,
    originator: {
        'user_id': string,
        'username': string,
        'name': string
    },
    attendee_list: Array<{
        'id': string,
        'username': string,
        'name': string
    }>,
    meeting_status: string,
    originator_info: Array<{
        'user_id': string,
        'username': string,
        'name': string,
        'join_time': string,
        'leave_time': string
    }>,
    'host': string,
    'start_time': string,
    'end_time': string,
    'create_time': string,
    'mute_all': number
}
