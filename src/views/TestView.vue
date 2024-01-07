<script setup>
import {onMounted, ref} from "vue";
import {getAllArticle, searchArticle} from "@/methods/myMethods.js";
import {Edit, Search} from "@element-plus/icons-vue";
import {ElMessage, ElNotification} from "element-plus";

const tableData = ref([]);

const searchParams = ref({
  category: '',
  state: '',
});

// 获取数据
const getData = async function () {
  tableData.value = await getAllArticle();
  console.log(tableData.value);
  loading.value = false;
}

const loading = ref(true);

const updateData = async function () {
  if (searchParams.value.category != null && searchParams.value.state != null) {
    loading.value = true;
    console.log(searchParams.value);
    tableData.value = await searchArticle(searchParams.value);
    console.log(tableData.value);
    loading.value = false;
  } else {
    await getData();
  }
};

onMounted(() => {
  console.log('页面加载完毕');
  getData();
})

</script>
<!-- ---------------------------------------我是分割线----------------------------------------- -->
<template>
  <div>

    <el-button @click="()=>{ElMessage({
        message:'猿身，起洞',
        type:'error',
        duration:1000,
        center:true,

    })}" type="primary" :icon="Edit"></el-button>

    <el-button @click="()=>{
      ElNotification({
        title:'错误',
        message:'出大问题',
        position:'bottom-right',
        duration:1500,
        type:'error'
      })
    }" type="primary">起洞
    </el-button>

    <el-input
        v-model="searchParams.category"
        placeholder="Please input"
        class="input-with-select">
      <template #prepend>
        <el-button :icon="Search" @click="updateData"/>
      </template>
      <template #append>
        <el-select v-model="searchParams.state" placeholder="Select" style="width: 115px">
          <el-option label="空"/>
          <el-option label="已发布" value="已发布"/>
          <el-option label="未发布" value="草稿"/>
        </el-select>
      </template>
    </el-input>

    <el-table v-loading="loading" :data="tableData" style="width: 100%">
      <el-table-column fixed prop="title" label="标题" width="600"/>
      <el-table-column prop="category" label="分类" width="120"/>
      <el-table-column prop="state" label="状态" width="120"/>
      <el-table-column prop="time" label="时间" width="120"/>
      <el-table-column fixed="right" label="Operations" width="120">
        <template #default>
          <el-button link type="primary" size="small" @click="()=>{}">Detail</el-button>
          <el-button link type="primary" size="small">Edit</el-button>
        </template>
      </el-table-column>
    </el-table>

  </div>
</template>

