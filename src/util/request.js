import axios from "axios";
import {ElMessage} from "element-plus";
import router from "@/router";
import {useTokenStore} from "@/stores/token.js";

const baseURL = "/api";
const instance = axios.create({baseURL});
const tokenStore = useTokenStore();


//响应拦截器，状态码为2xx时执行成功回调，否则执行失败回调
instance.interceptors.response.use(
    //成功回调
    (result) => {
        // 如果状态码为0，后端发生异常
        if (result.data.code === 0) {
            ElMessage.error(result.data.msg);
            return Promise.reject(result);
        }
        return result.data;
    },
    //失败回调
    (error) => {
        const code = error.response.status;
        switch (code) {
            case 401:
                ElMessage({message: '请先登录！', type: "error",});
                break;
            case 419:
                ElMessage.error("身份已过期,请重新登录！");
                break;
            default:
                ElMessage.error("服务器异常！" + code);
                break;
        }
        router.push('/login');
        window.local.reload();


        // 将异步的状态设置为失败状态
        return Promise.reject(error);
    }
);

// 请求拦截器
instance.interceptors.request.use(
    (config) => {
        //登录请求不需要token
        if (config.url.endsWith('/login') || config.url.endsWith('/register')) {
            return config;
        }
        //如果有token，将token放入请求头中
        const token = tokenStore.token;
        if (token != null) {
            config.headers['token'] = token;
        } else {
            router.push('/login');
            ElMessage({message: '请先登录！', type: "error",});
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
