import request from '@/utils/request';
import { message } from 'antd';
export async function trade(params) {
  return request('/api/trade/add', {
    method: 'POST',
    data: { ...params },
  }).then(res => {
    if (res.flag && res.message) {
      message.success(res.message);
    } else if (res.message) {
      message.warning(res.message);
    }
    return res
  })
}

export async function findRecentList({ playType}) {
  return request(`/api/openResult/findResultByType/${playType}`);
}

export async function findRecordList({ playType, userId }) {
  return request(`/api/trade/findTradeResult/${userId}/${playType}`);
}

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('/api/currentUser');
}

export async function queryNotices() {
  return request('/api/notices');
}
