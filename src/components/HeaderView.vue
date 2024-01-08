<template>
  <div class="demo-fit">
    <el-menu class="el-menu-demo" mode="horizontal">
      <el-menu-item index="1">
        <el-avatar shape="square" :size="50" :fit="'cover'" :src="url"/>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>Workspace</template>
        <el-menu-item index="2-1">item one</el-menu-item>
        <el-menu-item index="2-2">item two</el-menu-item>
        <el-menu-item index="2-3">item three</el-menu-item>
        <el-sub-menu index="2-4">
          <template #title>item four</template>
          <el-menu-item index="2-4-1">item one</el-menu-item>
          <el-menu-item index="2-4-2">item two</el-menu-item>
          <el-menu-item index="2-4-3">item three</el-menu-item>
        </el-sub-menu>
      </el-sub-menu>
      <el-menu-item index="3" disabled>Info</el-menu-item>
      <el-menu-item index="4">Orders</el-menu-item>
      <el-menu-item h="full">
        <el-button type="primary" @click="toggleDark">切换主题</el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>
<script setup>
import {useDark} from "@vueuse/core";

const isDark = useDark();
// 切换深浅色
const toggleDark = () => {
  isDark.value = !isDark.value
}


import {ref} from 'vue'

const url = ref('https://pic.imgdb.cn/item/659be939871b83018a2687aa.jpg');

</script>

<style scoped>

</style>
