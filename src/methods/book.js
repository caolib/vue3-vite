import request from "@/util/request";
// 分页查询
const getAllBookService = function (condition) {
    return request.post("/book", condition);
};

export {getAllBookService};
