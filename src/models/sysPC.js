import { history } from 'umi';
import { fakeAccountLogin, getBalance } from '@/services/login';

import { userList } from '@/services/sys';
import { message } from 'antd'

const Model = {
    namespace: 'sysPC',
    state: {
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        dataSource:[]
    },
    effects: {
        *login({ payload }, { call, put }) {
            const formData = new FormData();
            formData.append('username', payload.username);
            formData.append('password', payload.password);
            const response = yield call(fakeAccountLogin, formData);
            if (response.flag) {
                yield put({
                    type: 'updateState',
                    payload: response.data,
                }); // Login successfully
                localStorage.setItem('user', JSON.stringify(response.data))
                history.push('/user/gameLists')
            } else {
                message.warning('您输入的账号密码不正确');
            }
        },
        *getUserList({ params }, { call, put }) {
            const response = yield call(userList, params);
            console.log('params:', params)
            console.log('getUserListPayload:', response)
            yield put({
                type: 'updateState',
                payload: {
                    dataSource: response.data.rows,
                    pagination: {
                        current: params.currentPage,
                        pageSize: 10,
                        total: response.data.total,
                    },
                },
            });
        },
    },
    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
export default Model;
