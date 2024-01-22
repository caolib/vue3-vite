import {defineStore} from "pinia";
import {ref} from 'vue';


/**
 * 保存登录时用户的信息
 */
export const useReaderStore = defineStore('reader', () => {
        const reader = ref({
            id: '',
            username: '',
            nickname: '',
            gender: '',
            age: '',
            tel: '',
            token: ''
        });
        const setReader = (data) => {
            reader.value = data;
        }
        return {
            reader, setReader
        }
    },
    {
        persis: true
    }
)
