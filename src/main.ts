import {createApp} from 'vue';
import Router from './router/index';
import './theme/index.less';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';
import App from '@/App.vue';
import store, {key} from '@/store';

const app = createApp(App);

app.use(Router);
app.use(ElementPlus, {locale: zhCn});
app.use(store, key);
// 全局属性
// app.config.globalProperties.$db = Datastore;
app.mount('#app');
