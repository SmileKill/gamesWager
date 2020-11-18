import request from '@/utils/request';
import { message } from 'antd';

export async function userList(params) {
    return request('/api/user/findPage', {
        method: 'POST',
        data: { ...params },
    })
}

//getTradeList

export async function tradeList(params) {
    return request('/api/trade/findPage', {
        method: 'POST',
        data: { ...params },
    })
}


export async function userUpdate(params) {
    return request('/api/user/update', {
        method: 'POST',
        data: params,
    })
}

export async function userAdd(params) {
    return request('/api/user/add', {
        method: 'POST',
        data: params,
    })
}

export async function userRecharge(params) {
    return request('/api/user/recharge', {
        method: 'POST',
        data: params,
        params
    })
}
//passwordEdit
export async function passwordEdit(params) {
    return request('/api/user/updatePassword', {
        method: 'POST',
        data: params,
        params
    })
}