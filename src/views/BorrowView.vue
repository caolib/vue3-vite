<script setup>
import {
  deleteBorrowBatchService,
  deleteByIdService,
  getBorrowByReaderIdService,
  returnBookService
} from "@/methods/borrow.js";
import {ref, onMounted} from "vue";
import HeaderView from "@/components/HeaderView.vue";
import SideView from "@/components/SideView.vue";
import {ElMessage} from "element-plus";
import {Delete} from "@element-plus/icons-vue";


const tableData = ref([]);

onMounted(() => {
  getBorrowByReaderId();
})

// 归还
const returnBook = async (id, isbn) => {
  await returnBookService(id, isbn);
  ElMessage.success('归还成功！');
  await getBorrowByReaderId();
}

// 表格行样式
const tableRowClassName = ({row}) => {
  if (row.status === false) {
    return 'warning-row';
  }
  return 'success-row';
}

//获取当前读者的借阅信息
const getBorrowByReaderId = async function () {
  const result = await getBorrowByReaderIdService();
  tableData.value = result.data;
  if (filterStatus.value === 'all') {
    tableData.value = result.data;
  } else if (filterStatus.value === 'returned') {
    tableData.value = result.data.filter(item => item.status === true);
  } else if (filterStatus.value === 'notReturned') {
    tableData.value = result.data.filter(item => item.status === false);
  }
}

// 刷新状态
const flushStatus = async function (status) {
  console.log(status);
  filterStatus.value = status;
  await getBorrowByReaderId();
}
const filterStatus = ref('all'); // 'all', 'returned', 'notReturned'


// 根据id删除借阅记录
const deleteById = async function (id) {
  await deleteByIdService(id);
  ElMessage.success('删除成功！');
  //刷新表格
  await getBorrowByReaderId();
}

// 全部选中的记录的id
let ids = ref([]);
const handleSelectionChange = (val) => {
  ids.value = val.map(item => item.id);
}

const deleteBorrowBatch = async () => {
  if (ids.value.length === 0) {
    ElMessage.warning('请先选择要删除的记录！');
    return;
  }
  await deleteBorrowBatchService(ids.value);
  ElMessage.success('批量删除成功！');
  await getBorrowByReaderId();
}

</script>
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
            <el-button-group>
              <el-button @click="flushStatus('all')">全部</el-button>
              <el-button @click="flushStatus('returned')" type="success">已归还</el-button>
              <el-button @click="flushStatus('notReturned')" type="danger">未归还</el-button>
            </el-button-group>
            <!--批量删除按钮-->
            <el-button @click="deleteBorrowBatch" type="danger" :icon="Delete"/>

          </div>
          <el-row>
            <el-col :span="24">
              <!--借阅表格-->
              <el-table ref="table" :data="tableData" style="width: 100%" height="400"
                        :row-class-name="tableRowClassName"
                        @selection-change="handleSelectionChange">
                <!--多选框-->
                <el-table-column v-if="filterStatus==='returned'" type="selection" width="55"/>

                <el-table-column sortable prop="bookName" label="书名" width="150"/>
                <el-table-column sortable prop="borrowDate" label="借阅日期" width="150"/>
                <el-table-column sortable prop="dueDate" label="应还日期" width="150"/>
                <el-table-column sortable prop="returnDate" label="归还日期" width="150"/>
                <el-table-column sortable prop="status" label="状态" width="100">
                  <template #default="scope">
                    <el-tag v-if="scope.row.status === false" type="danger">未归还</el-tag>
                    <el-tag v-else type="success">已归还</el-tag>
                  </template>
                </el-table-column>

                <el-table-column label="操作" width="180">
                  <template #default="scope">
                    <el-button link @click="returnBook(scope.row.id,scope.row.isbn)"
                               type="primary" size="small"
                               :disabled="scope.row.status">
                      归还
                    </el-button>
                    <el-button link @click="deleteById(scope.row.id)"
                               :disabled="!scope.row.status" type="danger" size="small">
                      删除记录
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
          </el-row>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<style>
.el-table {
  width: 80%; /* 调整为所需的宽度 */
  margin: 0 auto; /* 居中对齐 */
  min-width: 150px;
}

.el-table .warning-row {
  --el-table-tr-bg-color: rgba(255, 107, 107, 0.3);
}

.el-table .success-row {
  --el-table-tr-bg-color: rgba(122, 255, 107, 0.3);
}
</style>
