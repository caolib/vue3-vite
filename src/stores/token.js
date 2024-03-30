import {defineStore} from "pinia";
import {ref} from 'vue';

export const useTokenStore = defineStore('token', () => {
        //1.定义描述token
        const token = ref('')
        //2.定义修改token的方法
        const setToken = (newToken) => {
            token.value = newToken
        }
        //3.定义移除token的方法
        const removeToken = () => {
            token.value = ''
        }
        return {
            token, setToken, removeToken
        }
    },
    {
        //使用persis插件持久化
        persis: true
    }
)