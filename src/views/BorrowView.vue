<script setup>
import {useReaderStore} from "@/stores/reader.js";
import {getBorrowByReaderIdService} from "@/methods/borrow.js";
import {ref, onMounted} from "vue";
import HeaderView from "@/components/HeaderView.vue";
import SideView from "@/components/SideView.vue";

const readerStore = useReaderStore();

const tableData = ref([]);

onMounted(() => {
  getBorrowByReaderId();
})

const tableRowClassName = ({row}) => {
  if (row.status === false) {
    return 'warning-row';
  }
  return 'success-row';
}

const getBorrowByReaderId = async function () {
  const result = await getBorrowByReaderIdService(readerStore.reader.id);
  console.log('result:' + result.data);
  tableData.value = result.data;
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
          <el-row>
            <el-col :span="24">
              <!--书籍表格-->
              <el-table :data="tableData" style="width: 100%"
                        :row-class-name="tableRowClassName">
                <el-table-column prop="bookName" label="书名" width="150"/>
                <el-table-column prop="borrowDate" label="借阅日期" width="150"/>
                <el-table-column prop="dueDate" label="应还日期" width="150"/>
                <el-table-column prop="returnDate" label="归还日期" width="150"/>
                <el-table-column label="操作" width="120">
                  <template #default="scope">
                    <el-button link type="primary" size="small"
                               :disabled="scope.row.status">归还
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
  --el-table-tr-bg-color: rgba(255, 107, 107, 0.47);
}

.el-table .success-row {
  --el-table-tr-bg-color: rgba(122, 255, 107, 0.47);
}
</style>
