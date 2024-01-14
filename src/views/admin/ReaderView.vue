<script setup>

import SideView from "@/components/SideView.vue";
import HeaderView from "@/components/HeaderView.vue";
import {onMounted, ref} from "vue";
import {Search} from "@element-plus/icons-vue";
import {
  deleteReaderService,
  getAllReaderService,
  updateReaderService
} from "@/methods/reader.js";
import {ElMessage} from "element-plus";

const readerTable = ref([]);

onMounted(() => {
  getAllReaders();
})

// 查询所有读者
const getAllReaders = async () => {
  const result = await getAllReaderService(condition.value);
  readerTable.value = result.data;
}
// 查询条件
const condition = ref({
  username: '',
  nickname: '',
  tel: ''
})

// 根据id删除读者
const deleteById = async function (id) {
  await deleteReaderService(id);
  ElMessage.success('删除成功');
  await getAllReaders();
}

// 显示用户信息修改对话框
const userInfo = ref(false);

const isMan = ref(true);

const reader = ref({
  id: '',
  username: '',
  nickname: '',
  password: '',
  gender: '',
  age: '',
  tel: ''
})

const getReader = (row) => {
  console.log(row);
  userInfo.value = true;
  reader.value = row;
  console.log(reader);
}

// 修改读者信息
const saveReader = async () => {
  console.log(reader);

  // await updateReaderByAdminService(reader.value);
  await updateReaderService(reader.value);

  ElMessage.success('已保存！');
  userInfo.value = false;
  await getAllReaders();
}

const handleClose = async ()=>{
  userInfo.value = false;
  await getAllReaders();
}

</script>
<!-- -------------------------------------分割线------------------------------- -->
<template>
  <div>
    <el-container>
      <!--侧栏-->
      <el-aside width="200px">
        <side-view/>
      </el-aside>
      <el-container>
        <el-header>
          <header-view/>
        </el-header>
        <el-main>
          <div style="display: flex; justify-content: space-between;">
          </div>
          <el-row>
            <el-col :span="24">
              <el-row>
                <el-button @click="getAllReaders" :icon="Search" size="large" type="success" circle :span="2"/>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @input="getAllReaders" v-model="condition.username" size="large" placeholder="用户名"
                            clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @input="getAllReaders" v-model="condition.nickname" size="large" placeholder="昵称"
                            clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @input="getAllReaders" v-model="condition.tel" size="large" placeholder="电话" clearable/>
                </el-col>
              </el-row>
              <br>

              <!--用户信息表格-->
              <el-table ref="table" :data="readerTable" style="width: 100%" height="400">
                <el-table-column sortable prop="username" label="用户名" width="150"/>
                <el-table-column sortable prop="password" label="密码" width="150"/>
                <el-table-column sortable prop="nickname" label="昵称" width="150"/>
                <el-table-column sortable prop="gender" label="性别" width="100"/>
                <el-table-column sortable prop="age" label="年龄" width="80"/>
                <el-table-column sortable prop="tel" label="电话" width="150"/>
                <el-table-column label="操作" width="180">
                  <template #default="scope">
                    <el-button @click="getReader(scope.row)" link type="primary" size="small">
                      修改
                    </el-button>
                    <el-button @click="deleteById(scope.row.id)" link type="danger" size="small">
                      删除
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!--修改用户信息表单-->
              <el-dialog title="用户信息" width="40%" center align-center
                         v-model="userInfo" :before-close="()=>{userInfo.value=false}">
                <el-form ref="ruleFormRef" :model="reader" status-icon
                         label-width="120px" class="centered-form">

                  <el-form-item label="用户名" class="form-row">
                    <el-input v-model="reader.username" disabled/>
                  </el-form-item>

                  <el-form-item label="密码" class="form-row">
                    <el-input v-model="reader.password"/>
                  </el-form-item>

                  <el-form-item label="昵称" class="form-row">
                    <el-input v-model="reader.nickname"/>
                  </el-form-item>

                  <el-form-item label="年龄" class="form-row">
                    <el-input v-model="reader.age"/>
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

                  <el-form-item label="电话" class="form-row">
                    <el-input v-model="reader.tel"/>
                  </el-form-item>

                  <div class="button-row">
                    <el-form-item>
                      <el-button type="primary" @click="saveReader()">保存</el-button>
                      <el-button type="danger" @click="handleClose">取消</el-button>
                    </el-form-item>
                  </div>
                </el-form>
              </el-dialog>

            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style scoped>

</style>