import request from "@/util/request";

const updateAdminService = function (admin) {
    return request.put('/admin/update',admin);
};

export {updateAdminService};