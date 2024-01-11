import request from "@/util/request";
const loginService = function (reader) {
    return request.post('/reader/login',reader);
};

export {loginService};