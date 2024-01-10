import request from "@/util/request";
import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token');

const loginService = function (reader) {
    return request.post('/reader/login',reader);
};

export {loginService};