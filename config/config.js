// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
const { REACT_APP_ENV } = process.env;
export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    antd: true,
    // default true, when it is true, will use `navigator.language` overwrite default
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  //Five
  routes: [
    {
      path: '/',
      redirect: '/login',
    },
    {
      name: 'login',
      path: '/login',
      component: './user/userLogin',
    },
    {
      name: 'PersonalCenter',
      path: '/user/personalCenter',
      component: './user/personalCenter',
    },
    {
      name: 'BettingRecord',
      path: '/user/bettingRecord',
      component: './user/bettingRecord',
    },
    {
      name: 'car',
      path: '/car',
      type: 1,
      component: './Car',
    },
    {
      name: 'yacht',
      path: '/yacht',
      type: 2,
      component: './Yacht',
    },
    {
      name: 'slot',
      path: '/slot',
      type: 3,
      component: './Slot',
    },
    {
      name: 'fiveCar',
      path: '/fiveCar',
      type: 5,
      component: './Car',
    },
    {
      name: 'fiveYacht',
      path: '/fiveYacht',
      type: 6,
      component: './Car',
    },
    {
      name: 'gameLists',
      path: '/user/gameLists',
      component: './gameList',
    },
    {
      path: '/sys',
      component: '../layouts/UserLayout',
      routes: [
        {
          name: 'login',
          path: '/sys/login',
          component: './user/login',
        }, {
          component: './404',
        },
      ],
    },
    {
      path: '/sysPC',
      component: '../layouts/SecurityLayout',
      routes: [
        {
          component: '../layouts/BasicLayout',
          routes: [
            {
              path: '/sysPC/welcome1',
              name: 'welcome',
              component: './Welcome',
            },
            {
              path: '/sysPC/welcome2',
              name: 'welcome',
              component: './Welcome',
            },
            {
              component: './404',
            },
          ],
        },
        {
          component: './404',
        },
      ],
    },
    {
      component: './404',
    },
  ],
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy['dev'],
  manifest: {
    basePath: '/',
  },
});
