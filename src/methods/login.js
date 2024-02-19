import request from "@/util/request";

// 读者登录
const loginService = function (reader) {
    return request.post('/reader/login', reader);
};

// 管理员登录
const adminLoginService = function (admin) {
    return request.post('/admin/login', admin);
}


export {loginService, adminLoginService};