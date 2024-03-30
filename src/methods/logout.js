import request from "@/util/request.js";
// 用户退出登录
const logoutService = function () {
    // 调用后端接口清除redis中的令牌
    return request.delete('/logout');
}

export {logoutService}

