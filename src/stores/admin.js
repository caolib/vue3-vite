import {defineStore} from "pinia";
import {ref} from 'vue';

/**
 * 保存登录时的管理员信息
 */
export const useAdminStore = defineStore('admin', () => {
        const admin = ref({
            id: '',
            username: '',
            nickname: '',
            token:''
        });
        // 是否为管理员
        let isAdmin = ref();
        const setIsAdmin = (flag)=>{
            isAdmin.value = flag;
        }
        const setAdmin = (data) => {
            admin.value = data;
        }
        //清除信息
        const clearAdmin = ()=>{
            admin.value.id = '';
            admin.value.username = '';
            admin.value.nickname = '';
            admin.value.token = '';
        }

        return {
            admin, setAdmin,isAdmin,setIsAdmin,clearAdmin
        }
    },
    // 持久化，pinia保存在内存中，刷新即丢失
    {
        persis: true
    }
)
