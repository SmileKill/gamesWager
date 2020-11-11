import { findRecentList, findRecordList } from '@/services/user';
export default {
    namespace: 'bettingRecord',
    state: {
        list: []
    },
    effects: {
        *getRecordList({ _ }, { call, put, select }) {
            let user = yield select(({ login }) => login.principal.user);
            const recentList = yield call(findRecordList, { playType: 0, userId: user.id });
            let list = recentList.data.map(item => ({ ...item, type: 4 }))
            yield put({
                type: 'updataRecentList',
                payload: {
                    recentList: list
                },
            });
        },
    },
    reducers: {
        updataRecentList(state, { payload }) {
            return {
                ...state,
                list: payload.recentList
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname }) => {
            });
        }
    }
};