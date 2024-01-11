import request from "@/util/request";
// const updateReaderService = function (reader) {
//     return request.post('/reader/update',reader);
// };
//
// export {updateReaderService};

// 查询个人的借书记录
const getBorrowByReaderIdService = function (id) {
    return request.get('/borrow', {
        params: {readerId: id},
    });
};

//借书
const borrowService = function (isbn, readerId, dueDate) {
    return request.get('/borrow/borrowBook', {
        params: {
            isbn: isbn,
            readerId: readerId,
            dueDate: dueDate
        }
    });
};

export {getBorrowByReaderIdService,borrowService};