import request from '@/utils/request';
import { message } from 'antd';

export async function findPageByMarkSix(params) {
    return request('/api/openResult/findPageByMarkSix', {
        method: 'POST',
        data: { ...params },
    })
}

export async function addMarkSix(params) {
    return request('/api/openResult/addMarkSix', {
        method: 'POST',
        data: { ...params },
    })
}
//deleteMarkSix
export async function deleteMarkSix(params) {
    return request('/api/openResult/deleteMarkSix', {
        method: 'POST',
        data: { ...params },
        params
    })
}
//openMarkSixResult
export async function openMarkSixResult(params) {
    return request('/api/openResult/openMarkSixResult', {
        method: 'POST',
        data: { ...params },
        params
    })
}