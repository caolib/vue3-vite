import axios from "axios";
import { ElMessage } from "element-plus";

// const baseURL = 'http://localhost:8080';
const baseURL = "/api";
const instance = axios.create({ baseURL });

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
    //如果code为0，正常返回数据
    return result.data;
  },
  //失败回调
  (error) => {
    ElMessage({
      message: "发生错误:" + error,
      type: "error",
    });
    // 将异步的状态设置为失败状态
    return Promise.reject(error);
  }
);

export default instance;
