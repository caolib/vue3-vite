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
        //清除信息
        const clearReader = () => {
            reader.value.id = '';
            reader.value.username = '';
            reader.value.nickname = '';
            reader.value.gender = '';
            reader.value.age = '';
            reader.value.tel = '';
            reader.value.token = '';
        }
        return {
            reader, setReader,clearReader
        }
    },
    {
        persis: true
    }
)
