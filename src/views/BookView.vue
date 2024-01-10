<script setup>
import {onMounted, ref} from "vue";
import {getAllBookService} from "@/methods/book.js";
import SideView from "@/components/SideView.vue";
import HeaderView from "@/components/HeaderView.vue";
import {Search} from "@element-plus/icons-vue";

const tableData = ref([]);

// 页面加载时获取所有书籍
onMounted(() => {
  getAllBooks();
})

// 获取所有书籍
const getAllBooks = async function () {
  loading.value = true;
  const result = await getAllBookService(condition.value);
  tableData.value = result.data;
  total.value = result.total;
  // console.log('tabledata:' + tableData.value);
  loading.value = false;
};

// 搜索条件
const condition = ref({
  bookName: null,
  author: null,
  isbn: null,
  number: 0,
  currentPage: 1,
  pageSize: 7
});

// 是否加载中
const loading = ref(false);

// 结果总数
const total = ref(0)

// 分页大小变化
const handleSizeChange = (val) => {
  loading.value = true;
  condition.value.pageSize = val;
  getAllBooks();
  loading.value = false;
};

// 当前页数发生变化
const handleCurrentChange = (val) => {
  loading.value = true;
  condition.value.currentPage = val;
  getAllBooks();
  loading.value = false;
};

let detail;
let book;
// 显示当前书籍详细信息
const showDetail = (row) => {
  detail.value = true;
  book.value = row;
  console.log('detail:' + detail.value);
  console.log(row);
}

book = ref({
  title: null,
  isbn: null,
  cover: null,
  introduction: null,
  number: 0,
  author: null
});
detail = ref(false);


</script>
<!-- ---------------------------------------我是分割线----------------------------------------- -->
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
          <el-row>
            <el-col :span="24">
              <!--搜索条件框-->
              <el-row>
                <el-button @click="getAllBooks" :icon="Search" size="large" type="success" circle :span="2"/>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @blur="getAllBooks" v-model="condition.bookName" size="large" placeholder="书名" clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @blur="getAllBooks" v-model="condition.author" size="large" placeholder="作者" clearable/>
                </el-col>
                <el-col :span="1"/>
                <el-col :span="6">
                  <el-input @blur="getAllBooks" v-model="condition.isbn" size="large" placeholder="ISBN" clearable/>
                </el-col>
              </el-row>
              <br>

              <!--书籍表格-->
              <el-table
                  :data="tableData"
                  style="width: 100%"
                  v-loading="loading">
                <el-table-column prop="title" label="书名" width="150"/>
                <el-table-column prop="author" label="作者" width="150"/>
                <el-table-column prop="isbn" label="ISBN" width="150"/>
                <el-table-column sortable prop="number" label="库存量" width="150"/>

                <el-table-column label="操作" width="150">
                  <template #default="scope">
                    <el-button link type="primary" size="small"
                               @click="showDetail(scope.row)">详细信息
                    </el-button>
                    <el-button link
                               type="primary"
                               size="small"
                               :disabled="scope.row.number === 0"
                    >借阅</el-button>
                  </template>
                </el-table-column>

              </el-table>
              <br>

              <!--分页组件-->
              <div>
                <el-pagination
                    v-model:current-page="condition.currentPage"
                    v-model:page-size="condition.pageSize"
                    :page-sizes="[5,7,10, 15, 30,50,100]"
                    :background="true"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"/>
              </div>

              <!--详细信息表单-->
              <el-dialog
                  v-model="detail"
                  title="图书详细信息"
                  width="50%"
                  center
                  align-center
                  :before-close="()=>{detail = false}">
                <el-form :inline="true" v-if="detail">
                  <el-form-item style="display: flex;">
                    <el-image style="width: 100px; height: 150px" :src="book.cover" :fit="'fill'"/>
                    <div style="font-size: 20px; font-weight: bold; align-self: center; margin-left: 20px;">
                      《{{ book.title }}》
                    </div>
                  </el-form-item>
                  <el-form-item label="作者">
                    {{ book.author }}
                  </el-form-item>
                  <el-form-item label="库存量">
                    {{ book.number }}
                  </el-form-item>
                  <el-form-item label="ISBN">
                    {{ book.isbn }}
                  </el-form-item>
                </el-form>

                <el-form v-if="detail">
                  <el-form-item label="简介">
                    <el-input
                        v-model="book.introduction"
                        :autosize="{ minRows: 2, maxRows: 6 }"
                        type="textarea"
                        readonly/>
                  </el-form-item>
                </el-form>
              </el-dialog>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>

</template>

