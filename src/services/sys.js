import request from '@/utils/request';
import { message } from 'antd';

export async function userList(params) {
    return request('/api/user/findPage', {
        method: 'POST',
        data: { ...params },
    })
}