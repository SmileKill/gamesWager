import { history } from 'umi';
import { fakeAccountLogin, getBalance } from '@/services/login';
import { findPage, update, add } from './../services';
import { message } from 'antd'

const Model = {
    namespace: 'gameSettings',
    state: {
        List: [],
        Pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    },
    effects: {
        *getFindPage({ params }, { call, put }) {
            const response = yield call(findPage, params);
            console.log('response:', response)
            yield put({
                type: 'updateState',
                payload: {
                    List: response.data.rows,
                    Pagination: {
                        current: params.currentPage,
                        pageSize: 10,
                        total: response.data.total,
                    },
                },
            });
        },
        *Edit({ params }, { call, put }) {
            console.log('params:', params)
            let response
            if (params.id) {
                response = yield call(update, params);
            } else {
                response = yield call(add, params);
            }
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
