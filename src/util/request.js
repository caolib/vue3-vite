import axios from "axios";
import {ElMessage} from "element-plus";

const baseURL = "/api";
const instance = axios.create({baseURL});

import {useRouter} from "vue-router";

const router = useRouter();

//拦截器，状态码为2xx时执行成功回调，否则执行失败回调
instance.interceptors.response.use(
    //成功回调
    (result) => {
        //失败，抛出错误信息
        if (result.data.code === 0) {
            ElMessage({
                message: "发生错误:" + result.data.msg,
                type: "error",
            });
        }

        return result.data;
    },
    //失败回调 todo 路由跳转待实现
    (error) => {
        let stat = error.response.status;
        console.log('stat:'+stat);
        if (stat === 401) {
            ElMessage({message: error+' 未登录！', type: "error",});
            router.push("/login");
        } else if (stat === 419) {
            ElMessage({
                message: error+"身份已过期！",
                type: "error",
            });
            localStorage.removeItem("token");
            router.push('/login');
        } else {
            this.$message.error("未知错误!");
        }
        ElMessage({
            message: "发生错误:" + error,
            type: "error",
        });

        // 将异步的状态设置为失败状态
        return Promise.reject(error);
    }
);

export default instance;
