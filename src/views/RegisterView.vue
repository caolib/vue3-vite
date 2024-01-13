<script setup>
import {ref} from 'vue'
import router from '@/router';
import {ElMessage} from "element-plus";
import {adminRegisterService, registerService} from "@/methods/register.js";


const isAdmin = ref(false)


// 注册表单
const registerForm = ref({
  username: '',
  password: '',
  nickname: '',
  gender: '男',
  age: '',
  tel: '',
});

// 表单验证规则
const formRef = ref();
const rules = {
  username: [
    {min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'change'}
  ],
  password: [
    {min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'change'}
  ],
  tel: [
    {min: 3, max: 11, message: '长度在 3 到 11 个字符', trigger: 'change'}
  ],
  nickname: [
    {min: 0, max: 16, message: '最长16位', trigger: 'change'}
  ],
  age: [
    {min: 0, max: 200, message: '年龄在 0 到 200 之间', trigger: 'change'},
    {type: 'number', message: '请输入数字'}
  ]
}

// 注册
const register = async () => {
  console.log(registerForm.value);

  if(isAdmin.value){
    adminForm.value.username = registerForm.value.username;
    adminForm.value.password = registerForm.value.password;
    adminForm.value.nickname = registerForm.value.nickname;
    await adminRegisterService(adminForm.value);
  }else{
    await registerService(registerForm.value);
  }

  await router.push('/login');
  ElMessage.success({
    message: '注册成功,现在可以登录了！',
    duration: 2000
  });
}

let isMan = ref(true);

// 管理员注册信息
const adminForm = ref({
  username: '',
  password: '',
  nickname: '',
});

</script>

<template>
  <!--用户注册表单-->
  <el-form ref="formRef" :model="registerForm" status-icon
           :rules="rules" label-width="120px" class="centered-form" title="注册">
    <!--用户名-->
    <el-form-item label="用户名" prop="username" class="form-row" required>
      <el-input v-model="registerForm.username"/>
    </el-form-item>
    <!--密码-->
    <el-form-item label="密码" prop="password" class="form-row" required>
      <el-input v-model.number="registerForm.password" type="password" show-password/>
    </el-form-item>
    <!--电话-->
    <el-form-item v-if="!isAdmin" label="电话" prop="tel" class="form-row" required>
      <el-input v-model.number="registerForm.tel"/>
    </el-form-item>
    <!--昵称-->
    <el-form-item label="昵称" prop="nickname" class="form-row">
      <el-input v-model.number="registerForm.nickname"/>
    </el-form-item>
    <!--年龄-->
    <el-form-item v-if="!isAdmin" label="年龄" prop="age" class="form-row">
      <el-input v-model.number="registerForm.age"/>
    </el-form-item>
    <!--性别-->
    <el-form-item prop="gender" class="form-row">
      <el-switch v-if="!isAdmin" class="mb-2" style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                 v-model="isMan" active-text="男" inactive-text="女" inline-prompt
                 @change="registerForm.gender = isMan ? '男' : '女'" size="large"/>

      <el-switch
          v-model="isAdmin"
          class="mb-2"
          style="--el-switch-on-color: #13ce66; --el-switch-off-color: #fd8250"
          inline-prompt
          active-text="管理员"
          inactive-text="读者"
          size="large"/>
    </el-form-item>

    <div class="button-row">
      <el-form-item>
        <el-button type="primary" @click="register">注册</el-button>
        <el-button type="success" @click="router.push('/login')">返回</el-button>
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

