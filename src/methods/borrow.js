import request from "@/util/request";

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
// 还书
const returnBookService = function (id, isbn) {
    console.log(id);
    return request.get('/borrow/returnBook', {
        params: {
            id: id,
            isbn: isbn
        }
    });
};

// 删除借书记录
const deleteByIdService = function (id) {
    return request.delete('/borrow', {
        params: {id: id},
    });
};

// 批量删除借阅记录
// const deleteBorrowBatchService = function (ids) {
//     return request.delete('/borrow/batch', {
//         params: {ids: JSON.stringify(ids)},
//     });
// };

const deleteBorrowBatchService = function (ids) {
    return request.post('/borrow/batch', ids);
};

export {
    getBorrowByReaderIdService,
    borrowService,
    returnBookService,
    deleteByIdService,
    deleteBorrowBatchService
};