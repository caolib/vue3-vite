import request from "@/util/request";
const registerService = function (reader) {
    return request.post('/reader/register',reader);
};

export {registerService};