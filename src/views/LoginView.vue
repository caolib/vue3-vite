<script lang="ts" setup>
import {onMounted, reactive, ref} from 'vue'
import type {FormInstance, FormRules} from 'element-plus'
import {loginService} from "@/methods/login";
import axios from "axios";
import router from '@/router';
import HeaderView from "@/components/HeaderView.vue";


const ruleFormRef = ref<FormInstance>()

onMounted(() => {
  console.log('mounted')
})


const reader = ref({
  username: '',
  password: '',
});

let returnReader = reactive({
  id: '',
  username: '',
  nickname: '',
  gender: '',
  age: '',
  tel: '',
  token: ''
});

const rules = reactive<FormRules<typeof reader>>({
  // pass: [{ validator: validatePass, trigger: 'blur' }],
  // checkPass: [{ validator: validatePass2, trigger: 'blur' }],
  // age: [{ validator: checkAge, trigger: 'blur' }],
})

// 登录
const login = async function () {
  const result = await loginService(reader.value);
  returnReader = result.data;
  console.log(returnReader);
  if (result.data.code === 0) {
    await router.push('/login');
  } else {
    //将token保存到浏览器本地存储
    console.log("returntoken:" + returnReader.token);
    localStorage.setItem("token", returnReader.token);
    //在axios请求头中带上token
    axios.defaults.headers.common["token"] = returnReader.token;
    console.log(axios.defaults.headers.common["token"]);
    await router.push('/book');
  }
};

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      login();
    } else {
      router.push('/login');
      console.log('登录失败!')
      return false
    }
  })
}


const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl)
    return
  formEl.resetFields()
}
</script>

<template>

  <header-view :returnReader="returnReader"/>

  <el-form
      ref="ruleFormRef"
      :model="reader"
      status-icon
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm">
    <!--用户名-->
    <el-form-item label="用户名" prop="username">
      <el-input v-model="reader.username"/>
    </el-form-item>

    <!--密码-->
    <el-form-item label="密码" prop="password">
      <el-input v-model.number="reader.password" type="password"/>
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
      <el-button @click="resetForm(ruleFormRef)">重置</el-button>
    </el-form-item>
  </el-form>
</template>

<!--todo 显示用户信息-->

<style scoped>
.header-view {
  opacity: 0; /* 设置透明度为0，即完全透明 */
  width: 0; /* 设置宽度为0，即最小宽度 */
  height: 0; /* 设置高度为0，即最小高度 */
  overflow: hidden; /* 隐藏超出边界的内容 */
}
</style>

