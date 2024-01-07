import axios from "axios";

// const baseURL = 'http://localhost:8080';
const baseURL = '/api';
const instance = axios.create({baseURL});

//拦截器，状态码为2xx时执行成功回调，否则执行失败回调
instance.interceptors.response.use(
    //成功回调
    result => {
        return result.data;
        /*
        //如果code为0，正常返回数据
        if (result.data.code === 0) {
            return result.data;
        }
        //失败，抛出错误信息
        ElMessage({
            message:'发生错误:'+result.data.msg,
            type:'error'
        })
        */
    },
    //失败回调
    error => {
        // alert('错误');
        this.$message.error('错误！');
        // 将异步的状态设置为失败状态
        return Promise.reject(error);
    }
);

export default instance;