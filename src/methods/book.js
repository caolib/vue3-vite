import request from "@/util/request";
// 分页查询
const getAllBookService = function (condition) {
    return request.post("/book", condition);
};

// 添加书籍
const addBookService = (book)=>{
    return request.post("/book/add", book);
}


export {getAllBookService,addBookService};
