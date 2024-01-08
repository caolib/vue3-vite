<script setup>
import {ref} from "vue";
import {getAllBookService} from "@/methods/book.js";
import {onMounted} from 'vue'
import SideView from "@/components/SideView.vue";
import HeaderView from "@/components/HeaderView.vue";

const tableData = ref([]);

const getAllBooks = async function () {
  tableData.value = await getAllBookService();
  console.log(tableData.value);
};

onMounted(() => {
  getAllBooks();
})

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
        </el-main>

      </el-container>
    </el-container>
  </div>

</template>

