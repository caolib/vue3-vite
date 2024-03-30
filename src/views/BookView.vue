<script setup>
import { onMounted, ref } from "vue";
import { getAllBookService } from "@/methods/book.js";
import SideView from "@/components/SideView.vue";
import HeaderView from "@/components/HeaderView.vue";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import { borrowService } from "@/methods/borrow.js";

const tableData = ref([]);

// 页面加载时获取所有书籍
onMounted(async () => {
  loading.value = true;
  await getAllBooks();
  loading.value = false;
});

// 获取所有书籍
const getAllBooks = async function () {
  loading.value = true;

  const result = await getAllBookService(condition.value);
  tableData.value = result.data;
  total.value = result.total;

  loading.value = false;
};

// 搜索条件
const condition = ref({
  bookName: null,
  author: null,
  isbn: null,
  number: 0,
  currentPage: 1,
  pageSize: 15,
});

// 是否显示加载中动画
const loading = ref(false);

// 结果总数
const total = ref(0);

// 分页大小变化
const handleSizeChange = (val) => {
  condition.value.pageSize = val;
  getAllBooks();
};

// 当前页数发生变化
const handleCurrentChange = (val) => {
  condition.value.currentPage = val;
  getAllBooks();
};

let detail = ref(false);

// 显示当前书籍详细信息
const showDetail = (row) => {
  detail.value = true;
  book.value = row;
  console.log("detail:" + detail.value);
  console.log(row);
};

//书籍信息
let book = ref({
  title: null,
  isbn: null,
  cover: null,
  introduction: null,
  number: 0,
  author: null,
});

// 应该归还的日期
const dueDate = ref(new Date());
let showDrawer = ref(false);

//显示抽屉
const showBorrow = (row) => {
  showDrawer.value = true;
  book.value = row;
};

//借阅
const borrow = async () => {
  await borrowService(book.value.isbn, dueDate.value);
  ElMessage.success("借阅成功");
  showDrawer.value = false;
  //刷新表格
  await getAllBooks();
};

// 禁止选择当前日期之前的日期
const disabledDate = (time) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return time.getTime() < today.getTime();
};
</script>
<!-- --------------------------------------- 一条朴实的分割线 ----------------------------------------- -->
<template>
  <div>
    <el-container>
      <!--侧栏-->
      <el-aside width="200px">
        <side-view />
      </el-aside>
      <el-container>
        <el-header>
          <header-view />
        </el-header>
        <el-main>
          <el-row>
            <el-col :span="24">
              <!--搜索条件框-->
              <el-row>
                <el-button
                  @click="getAllBooks"
                  :icon="Search"
                  size="large"
                  type="success"
                  circle
                  :span="2"
                />
                <el-col :span="1" />
                <el-col :span="6">
                  <el-input
                    @input="getAllBooks"
                    v-model="condition.bookName"
                    size="large"
                    placeholder="书名"
                    clearable
                  />
                </el-col>
                <el-col :span="1" />
                <el-col :span="6">
                  <el-input
                    @input="getAllBooks"
                    v-model="condition.author"
                    size="large"
                    placeholder="作者"
                    clearable
                  />
                </el-col>
                <el-col :span="1" />
                <el-col :span="6">
                  <el-input
                    @input="getAllBooks"
                    v-model="condition.isbn"
                    size="large"
                    placeholder="ISBN"
                    clearable
                  />
                </el-col>
              </el-row>
              <br />

              <!--书籍表格-->
              <el-table
                height="600"
                :data="tableData"
                style="width: 100%"
                v-loading="loading"
                element-loading-text="玩命加载中......"
              >
                <el-table-column prop="title" label="书名" width="150" />
                <el-table-column prop="author" label="作者" width="150" />
                <el-table-column prop="isbn" label="ISBN" width="150" />
                <el-table-column
                  sortable
                  prop="number"
                  label="库存量"
                  width="150"
                />

                <el-table-column label="操作" width="150">
                  <template #default="scope">
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="showDetail(scope.row)"
                      >详细信息
                    </el-button>
                    <el-button
                      link
                      type="primary"
                      size="small"
                      @click="showBorrow(scope.row)"
                      :disabled="scope.row.number === 0"
                      >借阅
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>

              <!--借阅图书信息抽屉-->
              <el-drawer v-model="showDrawer">
                <template #header>
                  <h1>借阅</h1>
                </template>
                <el-image
                  style="width: 100px; height: 150px"
                  :src="book.cover"
                  :fit="'fill'"
                />
                <h3 style="color: #409eff">选择归还日期</h3>

                <div class="block">
                  <el-date-picker
                    v-model="dueDate"
                    type="datetime"
                    placeholder="选择归还日期"
                    format="YYYY-MM-DD"
                    date-format="MMM DD, YYYY"
                    time-format="HH:mm"
                    :disabled-date="disabledDate"
                  />
                </div>
                <template #footer>
                  <div style="flex: auto">
                    <el-button>取消</el-button>
                    <el-button type="primary" @click="borrow">提交</el-button>
                  </div>
                </template>
              </el-drawer>

              <br />

              <!--分页组件-->
              <div>
                <el-pagination
                  v-model:current-page="condition.currentPage"
                  v-model:page-size="condition.pageSize"
                  :page-sizes="[5, 8, 10, 15, 30, 50, 100]"
                  :background="true"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="total"
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                />
              </div>

              <!--详细信息表单-->
              <el-dialog
                title="图书详细信息"
                width="50%"
                center
                align-center
                v-model="detail"
                :preview-src-list="[book.cover]"
                :before-close="
                  () => {
                    detail = false;
                  }
                "
              >
                <el-form :inline="true" v-if="detail">
                  <el-form-item style="display: flex">
                    <el-image
                      style="width: 100px; height: 150px"
                      :src="book.cover"
                      :fit="'fill'"
                    />
                    <div
                      style="
                        font-size: 20px;
                        font-weight: bold;
                        align-self: center;
                        margin-left: 20px;
                      "
                    >
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
                      readonly
                    />
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
