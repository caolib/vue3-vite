import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";

const baseURL = "/api";
const instance = axios.create({baseURL});

//响应拦截器，状态码为2xx时执行成功回调，否则执行失败回调
instance.interceptors.response.use(
    //成功回调
    (result) => {
        return result.data;
    },
    //失败回调
    (error) => {
        // 状态码为401,419都跳转到登录界面
        if (error.response) {
            const code = error.response.status;
            if (code === 401) {
                ElMessage({message: '请先登录！', type: "error",});
                router.push('/login');
            } else if (code === 419) {
                ElMessage({
                    message: "身份已过期,请重新登录！",
                    type: "error",
                });
                router.push('/login');
            } else {
                ElMessage({
                    message: "未知错误:" + error.response.message,
                    type: "error",
                });
            }
        }
        // 将异步的状态设置为失败状态
        return Promise.reject(error);
    }
);

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        //登录请求不需要token
        if (config.url.endsWith('/login')) {
            return config;
        }
        const token = localStorage.getItem('token');
        console.log('token:' + token);
        if (token != null) {
            axios.defaults.headers.common['token'] = localStorage.getItem('token');
            console.log('666:' + axios.defaults.headers.common['token'])
        } else {
            ElMessage({message: '请先登录！', type: "error",});
            router.push('/login');
            return Promise.reject('token不存在！');
        }
        return config;
    },
    (err) => {
        //请求错误的回调
        return Promise.reject(err);
    }
);

export default instance;
