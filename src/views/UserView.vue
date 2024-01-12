<script setup>
import {useReaderStore} from "@/stores/reader.js";
import {ref} from "vue";
import router from "@/router/index.js";
import {updateReaderService} from "@/methods/reader.js";
import {ElMessage} from "element-plus";
import HeaderView from "@/components/HeaderView.vue";


const readerStore = useReaderStore();
let reader = readerStore.reader;

let isMan = ref(reader.gender === '男');

const saveReader = () => {
  updateReaderService(reader);
  ElMessage.success('已保存');
  router.push('/book');
}

</script>

<template>
  <el-container>
    <!--侧栏-->
    <el-aside width="200px">
      <!--<side-view/>-->
    </el-aside>
    <el-container>
      <el-header>
        <header-view/>
      </el-header>
      <el-main>
        <el-form
            ref="ruleFormRef"
            :model="reader"
            status-icon
            label-width="120px"
            class="centered-form"
            title="登录">

          <el-form-item class="form-row">
            <h2>个人信息</h2>
          </el-form-item>

          <el-form-item label="昵称" prop="username" class="form-row">
            <el-input v-model="reader.nickname"/>
          </el-form-item>

          <el-form-item label="年龄" prop="username" class="form-row">
            <el-input v-model="reader.age"/>
          </el-form-item>

          <el-form-item label="电话" prop="username" class="form-row">
            <el-input v-model="reader.tel"/>
          </el-form-item>

          <el-form-item prop="gender" class="form-row">
            <el-switch
                v-model="isMan"
                class="mb-2"
                style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
                active-text="男"
                inactive-text="女"
                @change="reader.gender = isMan ? '男' : '女'"
            />
          </el-form-item>

          <div class="button-row">
            <el-form-item>
              <el-button type="primary" @click="saveReader()">保存</el-button>
              <el-button type="danger" @click="router.push('/book')">取消</el-button>
            </el-form-item>
          </div>
        </el-form>
      </el-main>
    </el-container>
  </el-container>

</template>
