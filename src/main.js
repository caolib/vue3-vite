import './assets/main.css'

import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from "element-plus";
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/css/main.css';

import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const app = createApp(App)

app.use(router, ElementPlus, {locale: zhCn,})

app.mount('#app')

