import { trade } from '@/services/user';
const UserModel = {
  namespace: 'user',
  state: {
    currentUser: {},
  },
  effects: {
    *upFormData({ params }, { call, put, select }) {
      let user = yield select(({ login }) => login.principal.user);
      let wsData = yield select(({ chatRoom }) => chatRoom.wsData);
      if (!wsData.lastOpenResult) {
        return
      }
      const res = yield call(trade, {
        tradeId: parseInt(wsData.lastOpenResult.openId) + 1,
        userId: user.id,
        ...params
      });
    },
  },
  reducers: {
    saveCurrentUser(state, action) {
      return { ...state, currentUser: action.payload || {} };
    },
    changeNotifyCount(
      state = {
        currentUser: {},
      },
      action,
    ) {
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          notifyCount: action.payload.totalCount,
          unreadCount: action.payload.unreadCount,
        },
      };
    },
  },
};
export default UserModel;
