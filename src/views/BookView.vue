<script setup>
import {ref} from "vue";
import {getAllBookService} from "@/methods/book.js";
import {onMounted} from 'vue'
import SideView from "@/components/SideView.vue";
import HeaderView from "@/components/HeaderView.vue";
import {Search} from "@element-plus/icons-vue";

const tableData = ref([]);

const getAllBooks = async function () {
  tableData.value = await getAllBookService();
  console.log(tableData.value);
};

onMounted(() => {
  getAllBooks();
})

// 搜索条件
const condition = ref({
  bookName: '',
  author: '',
  ISBN: '',
  currentPage: 1,
  pageSize: 10
});

// 分页大小变化
const handleSizeChange = () => {

};

// 当前页数发生变化
const handleCurrentChange = () => {

};

</script>
<!-- ---------------------------------------我是分割线----------------------------------------- -->
<template>
  <div class="common-layout">
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
          <el-row>
            <el-col :span="24">
              <!--搜索条件框-->
              <el-row>
                <el-button :icon="Search" size="large" type="success" circle :span="2"/>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input v-model="condition.bookName" size="large" placeholder="书名" clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input v-model="condition.author" size="large" placeholder="作者" clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input v-model="condition.ISBN" size="large" placeholder="ISBN" clearable/>
                </el-col>
              </el-row>
              <br>

              <!--书籍表格-->
              <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="书名" width="150"/>
                <el-table-column prop="author" label="作者" width="150"/>
                <el-table-column prop="isbn" label="ISBN" width="150"/>
                <el-table-column label="Operations" width="150">
                  <template #default>
                    <el-button link type="primary" size="small" @click="getAllBooks">详细信息</el-button>
                    <el-button link type="primary" size="small">借阅</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <br>
              <!--分页组件-->
              <div class="demo-pagination-block">
                <el-pagination
                    v-model:current-page="condition.currentPage"
                    v-model:page-size="condition.pageSize"
                    :page-sizes="[5, 10, 15, 30,50,100]"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="400"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
              </div>

            </el-col>
          </el-row>
        </el-main>


      </el-container>
    </el-container>
  </div>

</template>

