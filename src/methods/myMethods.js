import request from "@/util/request.js";


const getAllArticle = function () {
    return request.get('/article/getAll');
}

const searchArticle = function (condition) {
    return request.get('/article/search', {params: {...condition}});
}

export {getAllArticle, searchArticle};

