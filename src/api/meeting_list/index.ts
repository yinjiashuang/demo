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

export const getMeetingList = (params: { meeting_status: number, originator?: string }) => {
    return BaseRequest<{ meeting_status: number }, Array<IMeetingList>>({
        url: '/v1/remote/online/meeting/read',
        method: 'get',
        params: {...params}
    });
};

export interface IMeetingList {
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
