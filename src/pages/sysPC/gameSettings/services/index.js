import request from '@/utils/request';
import { message } from 'antd';

export async function findPage(params) {
    return request('/api/odds/findPage', {
        method: 'POST',
        data: { ...params },
    })
}

export async function update(params) {
    return request('/api/odds/update', {
        method: 'POST',
        data: { ...params },
    })
}

export async function add(params) {
    return request('/api/odds/add', {
        method: 'POST',
        data: { ...params },
    })
}