import request from "@/util/request";
import axios from "axios";

axios.defaults.headers.common['token'] = localStorage.getItem('token');

// 分页查询
const getAllBookService = function (condition) {
  return request.post("/book", condition);
};

export { getAllBookService };
