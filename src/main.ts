import { createPinia } from 'pinia';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';
 
import '@/assets/iconfont/iconfont.js';
import '@/assets/style/common.scss';
import 'element-plus/theme-chalk/el-message.css';
import SvgIcon from './components/SvgIcon.vue';
const app = createApp(App);
app.use(createPinia());
 
app.use(router);
app.component('SvgIcon', SvgIcon);
app.mount('#app');
