import { findRecentList, findRecordList } from '@/services/user';
export default {
  namespace: 'chatRoom',
  state: {
    wsData: {},
    scene: 0,
    listRender: []
  },
  effects: {
    *getScene(_, { call, put, select }) {
      let wsData = yield select(({ chatRoom }) => chatRoom.wsData);
      wsData.countDown = wsData.countDown - 3 > 0 ? wsData.countDown - 3 : 0
      yield put({
        type: 'updateState',
        payload: {
          wsData: wsData,
          scene: 1
        },
      });
    },
    *webSocketMsg({ payload }, { call, put, select }) {
      const wsData = yield select(({ chatRoom }) => chatRoom.wsData);
      if (wsData.lastOpenResult) {
        yield put({
          type: 'updateWebSocket',
          payload: {
            wsData: payload.data,
            type: payload.type,
            scene: 2
          },
        });
      } else {
        yield put({
          type: 'updateState',
          payload: {
            wsData: payload.data,
            type: payload.type,
            scene: 1
          },
        });
      }
    },
    *userMsg({ payload }, { call, put }) {
      yield put({
        type: 'updateUserMsg',
        payload: {
          wsData: { ...payload.data, type: payload.type },
        },
      });
    },
    *userdatalist({ payload }, { call, put }) {
      yield put({
        type: 'updateUserMsg',
        payload: {
          wsData: { ...payload.data, type: payload.type },
        },
      });
    },
    *getRecentList({ params }, { call, put }) {
      const recentList = yield call(findRecentList, params);
      let list = recentList.data.map(item => ({ ...item, type: 3 }))
      yield put({
        type: 'updataRecentList',
        payload: {
          recentList: list
        },
      });
    },
    *getRecordList({ params }, { call, put, select }) {
      let user = yield select(({ login }) => login.principal.user);
      const recentList = yield call(findRecordList, { ...params, userId: user.id });
      let list = recentList.data.map(item => ({ ...item, type: 4 }))
      yield put({
        type: 'updataRecentList',
        payload: {
          recentList: list
        },
      });
    },
    *getRrule({ params }, { call, put, select }) {
      yield put({
        type: 'updataRecentList',
        payload: {
          recentList: [{ ...params, type: 7 }]
        },
      });
    },
    *deletState(_, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          wsData: {},
          scene: 0,
          listRender: []
        },
      });
    }
  },
  reducers: {
    updateState(state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateWebSocket(state, { payload }) {
      return {
        ...state,
        ...payload,
        listRender: [{ ...payload.wsData.lastOpenResult, type: payload.type }, ...state.listRender]
      }
    },
    updataRecentList(state, { payload }) {
      return {
        ...state,
        listRender: [...payload.recentList, ...state.listRender]
      }
    },
    updateUserMsg(state, { payload }) {
      return {
        ...state,
        listRender: [{ ...payload.wsData }, ...state.listRender]
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