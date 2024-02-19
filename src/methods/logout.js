import request from "@/util/request.js";

import {useTokenStore} from "@/stores/token";
import {useReaderStore} from "@/stores/reader";
import {useAdminStore} from "@/stores/admin";
import {ElMessage} from "element-plus";

const adminStore = useAdminStore();
const tokenStore = useTokenStore();
const readerStore = useReaderStore();

// 用户退出
const logoutService = function () {
    // 调用后端接口清除redis中的令牌
    return request.delete('/logout');
}

export {logoutService}

