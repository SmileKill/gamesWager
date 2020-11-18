import { history } from 'umi';
import { fakeAccountLogin, getBalance } from '@/services/login';

import { userList, tradeList, userUpdate, userAdd, userRecharge, passwordEdit } from '@/services/sys';
import { message } from 'antd'

const Model = {
    namespace: 'sysPC',
    state: {
        //用户
        userList: [],
        userPagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        // 投注
        tradeList: [],
        tradePagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
        ...JSON.parse(localStorage.getItem('user'))
    },
    effects: {
        *login({ payload }, { call, put }) {
            const formData = new FormData();
            formData.append('username', payload.username);
            formData.append('password', payload.password);
            formData.append('loginType', 1);
            const response = yield call(fakeAccountLogin, formData);
            if (response.flag) {
                yield put({
                    type: 'updateState',
                    payload: response.data,
                }); // Login successfully
                localStorage.setItem('Sysuser', JSON.stringify(response.data))
                history.push('/sysPC/userManagement')
            } else {
                message.warning('您输入的账号密码不正确');
            }
        },
        *getUserList({ params }, { call, put }) {
            const response = yield call(userList, params);
            yield put({
                type: 'updateState',
                payload: {
                    userList: response.data.rows,
                    userPagination: {
                        current: params.currentPage,
                        pageSize: 10,
                        total: response.data.total,
                    },
                },
            });
        },
        *getTradeList({ params }, { call, put }) {
            const response = yield call(tradeList, params);
            yield put({
                type: 'updateState',
                payload: {
                    tradeList: response.data.rows,
                    tradePagination: {
                        current: params.currentPage,
                        pageSize: 10,
                        total: response.data.total,
                    },
                },
            });
        },
        *editUser({ params }, { call, put,select }) {
            // const response = yield call(tradeList, params);
            let sysPC = yield select(({ sysPC }) => sysPC);
            const formData = new FormData();
            formData.append('id', params.type == 'add' ? 0 : params.id);
            formData.append('loginName', params.loginName);
            formData.append('password', params.password);
            formData.append('userName', params.userName);
            let res
            if (params.type == 'add') {
                res = yield call(userAdd, params);
            }
            if (params.type == 'edit') {
                res = yield call(userUpdate, params);
            }
            if (res.flag) {
                return true
            } else {
                message.warning(res.message);
                return false
            }
        },
        *recharge({ params }, { call, put,select }) {
            // const response = ;
            let res = yield call(userRecharge, params)
            if (res.flag) {
                return true
            } else {
                message.warning(res.message);
                return false
            }
        },
        *passwordChange({ params }, { call, put,select }) {
            let res = yield call(passwordEdit, params)
            if (res.flag) {
                return true
            } else {
                message.warning(res.message);
                return false
            }
        },
    },

    reducers: {
        updateState(state, { payload }) {
            return { ...state, ...payload };
        },
    },
};
export default Model;
