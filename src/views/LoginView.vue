<script setup>
import {onMounted, reactive, ref} from 'vue'
import {loginService} from "@/methods/login";
import axios from "axios";
import router from '@/router';
import {useTokenStore} from "@/stores/token";
import {useReaderStore} from "@/stores/reader.js";
import {ElNotification} from "element-plus";

const readerStore = useReaderStore();
const tokenStore = useTokenStore();


const ruleFormRef = ref()

onMounted(() => {
  tokenStore.setToken(returnReader.token);
})

const reader = ref({
  username: '',
  password: '',
});

// 返回的用户信息
let returnReader = reactive({
  id: '',
  username: '',
  nickname: '',
  gender: '',
  age: '',
  tel: '',
  token: ''
});

const rules = reactive({
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
    //用户信息保存
    readerStore.setReader(returnReader);
    //token保存
    tokenStore.setToken(returnReader.token);
    console.log('tokenStore:' + tokenStore.token);
    //在axios请求头中带上token
    axios.defaults.headers.common["token"] = returnReader.token;
    await router.push('/book');
    ElNotification.success({
      title: '登录成功',
      message: 'Hello,' + returnReader.nickname,
      duration: 2000
    });
  }
};

// 提交表单
const submitForm = (formEl) => {
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

let status = ref(1);

const resetForm = (formEl) => {
  if (!formEl)
    return
  formEl.resetFields()
}
</script>

<template>

  <el-form
      v-if="status===1"
      ref="ruleFormRef"
      :model="reader"
      status-icon
      :rules="rules"
      label-width="120px"
      class="centered-form"
      title="登录">

    <!--用户名-->
    <el-form-item label="用户名" prop="username" class="form-row">
      <el-input v-model="reader.username"/>
    </el-form-item>

    <!--密码-->
    <el-form-item label="密码" prop="password" class="form-row">
      <el-input v-model.number="reader.password" type="password"/>
    </el-form-item>

    <div class="button-row">
      <el-form-item>
        <el-button type="primary" @click="submitForm(ruleFormRef)">登录</el-button>
        <el-button type="success" @click="resetForm(ruleFormRef)">注册</el-button>
      </el-form-item>
    </div>
  </el-form>

</template>

<style scoped>
.centered-form {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 50%;
  margin: 0 auto;
  flex-direction: column;
}

.form-row {
  width: 100%;
}

.button-row {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
</style>

