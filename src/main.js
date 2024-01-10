import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from '@/router'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/css/main.css';
import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token');

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

app.use(ElementPlus, {locale: zhCn,});
app.use(router);

app.mount('#app')


