import {createMemoryHistory, createRouter} from 'vue-router';
import {routers} from './routers';

const routerHistory = createMemoryHistory();
const Router = createRouter({
  history: routerHistory,
  routes: routers
});

Router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-鹰眼会议';
  }

  if (needToLogin(to)) {
    if (checkLogin()) {
      next();
      console.log("已经登录了");
    } else {
      next({ name: "login" });
    }
  } else {
    next();
  }
  next();
});

const needToLogin = (to: any): boolean => {
  const routerName = ['login'];
  console.log(routerName.indexOf(to.name));
  return routerName.indexOf(to.name) === -1;

};

const checkLogin = (): boolean => {
  const token = window.sessionStorage.getItem('token') || '';
  console.log('token::::', token);
  return token.length > 0;
};

export default Router;
