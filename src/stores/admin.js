import {defineStore} from "pinia";
import {ref} from 'vue';

export const useAdminStore = defineStore('admin', () => {
        const admin = ref({
            id: '',
            username: '',
            nickname: '',
            token:''
        });
        let isAdmin = ref();
        const setIsAdmin = (flag)=>{
            isAdmin.value = flag;
        }
        const setAdmin = (data) => {
            admin.value = data;
        }
        return {
            admin, setAdmin,isAdmin,setIsAdmin
        }
    },
    {
        persis: true
    }
)
