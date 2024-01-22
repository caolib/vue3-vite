import request from "@/util/request";


/**
 * 更新管理员信息
 */
const updateAdminService = function (admin) {
    return request.put('/admin/update',admin);
};

export {updateAdminService};