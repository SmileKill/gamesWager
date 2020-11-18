import { history } from 'umi';
import { fakeAccountLogin, getBalance } from '@/services/login';
import { trade } from '@/services/user';
import { message } from 'antd'

const Model = {
  namespace: 'login',
  state: {
    ...JSON.parse(localStorage.getItem('user'))
  },
  effects: {
    *login({ payload }, { call, put }) {
      const formData = new FormData();
      formData.append('username', payload.username);
      formData.append('password', payload.password);
      formData.append('loginType', 0);
      const response = yield call(fakeAccountLogin, formData);
      if (response.flag) {
        yield put({
          type: 'changeLoginStatus',
          payload: response.data,
        }); // Login successfully
        localStorage.setItem('user', JSON.stringify(response.data))
        history.push('/user/gameLists')
      }else{
        message.warning('您输入的账号密码不正确');
      }
    },
    *balance({ _ }, { call, put, select }) {
      let loginState = yield select(({ login }) => login);
      const res = yield call(getBalance, loginState.principal.user.id);
      if (res.flag) {
        loginState.principal.user.money = res.data
        localStorage.setItem('user', JSON.stringify(loginState))
        yield put({
          type: 'changeLoginStatus',
          payload: loginState,
        });
      }
    },
    *upFormData({ params }, { call, put, select }) {
      let loginState = yield select(({ login }) => login);
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
      if (res.flag) {
        loginState.principal.user.money = res.data
        localStorage.setItem('user', JSON.stringify(loginState))
        yield put({
          type: 'changeLoginStatus',
          payload: loginState,
        });
      }
    },
  },
  reducers: {
    changeLoginStatus(state, { payload }) {
      return { ...state, ...payload };
    },
  },
};
export default Model;
