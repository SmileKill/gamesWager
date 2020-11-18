import { history } from 'umi';
import { fakeAccountLogin, getBalance } from '@/services/login';
import { findPageByMarkSix, addMarkSix, deleteMarkSix, openMarkSixResult } from './../services';
import { message } from 'antd'

const Model = {
    namespace: 'sixSetting',
    state: {
        List: [],
        Pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    },
    effects: {
        *getFindPageByMarkSix({ params }, { call, put }) {
            const response = yield call(findPageByMarkSix, params);
            yield put({
                type: 'updateState',
                payload: {
                    List: response.data.rows,
                    userPagination: {
                        current: params.currentPage,
                        pageSize: 10,
                        total: response.data.total,
                    },
                },
            });
        },
        *Edit({ params }, { call, put }) {
            const response = yield call(addMarkSix, params);
            if (response.flag) {
                return true
            } else {
                message.warning(response.message);
                return false
            }
        },
        *Delete({ params }, { call, put }) {
            const response = yield call(deleteMarkSix, params);
            if (response.flag) {
                return true
            } else {
                message.warning(response.message);
                return false
            }
        },
        *Draw({ params }, { call, put }) {
            const response = yield call(openMarkSixResult, params);
            if (response.flag) {
                return true
            } else {
                message.warning(response.message);
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
