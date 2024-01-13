import request from "@/util/request";

const updateAdminService = function (id, nickname) {
    return request.put('/admin/update/' + id + '/' + nickname);
};

export {updateAdminService};