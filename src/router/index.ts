import {createMemoryHistory, createRouter} from 'vue-router';
import {routers} from './routers';

const routerHistory = createMemoryHistory();
const Router = createRouter({
  history: routerHistory,
  routes: routers
});

Router.beforeEach((to, _, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + '-智能视频监控平台';
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
  return true;
};

export default Router;
