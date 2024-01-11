import request from "@/util/request";
const updateReaderService = function (reader) {
    return request.post('/reader/update',reader);
};

export {updateReaderService};