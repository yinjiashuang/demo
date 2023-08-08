import {RouteRecordRaw} from 'vue-router';
import login from '@/views/login/Index.vue';
import {meetingRoutes} from './meeting';
import Home from '@/views/home/Index.vue';

const homeRoute = {
  path: '/',
  name: 'home',
  meta: {
    title: '首页'
  },
  redirect: {
    name: 'meeting_list'
  },
  component: Home,
  children: [
    ...meetingRoutes,
    {
      path: '/login',
      name: 'login',
      component: login,
      meta: {
        title: '登录'
      }
    }
  ]
};

export const routers: Array<RouteRecordRaw> = [homeRoute];
