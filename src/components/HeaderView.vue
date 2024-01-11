<script setup>

import {useDark} from "@vueuse/core";

const isDark = useDark();
// 切换深浅色
const toggleDark = () => {
  isDark.value = !isDark.value
}

// 头像下拉菜单命令
const handleCommand = function (command) {
  if (command === 'logout') {
    // localStorage.removeItem("token");
    router.push('/login');
  }
};

import {ref} from 'vue'
import {Moon, Sunny} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const url = ref('https://pic.imgdb.cn/item/659be939871b83018a2687aa.jpg');

</script>

<template>
  <div class="demo-fit header-view">
    <el-menu mode="horizontal">

      <!--头像-->
      <el-dropdown @command="handleCommand">
        <el-menu-item index="1">
          <el-avatar @click="()=>{router.push('/reader')}" shape="circle" :size="42" :fit="'cover'" :src="url"/>
        </el-menu-item>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!--<el-sub-menu index="2">-->
      <!--  <template #title>Workspace</template>-->
      <!--  <el-menu-item index="2-1">item one</el-menu-item>-->
      <!--  <el-menu-item index="2-2">item two</el-menu-item>-->
      <!--  <el-menu-item index="2-3">item three</el-menu-item>-->
      <!--  <el-sub-menu index="2-4">-->
      <!--    <template #title>item four</template>-->
      <!--    <el-menu-item index="2-4-1">item one</el-menu-item>-->
      <!--    <el-menu-item index="2-4-2">item two</el-menu-item>-->
      <!--    <el-menu-item index="2-4-3">item three</el-menu-item>-->
      <!--  </el-sub-menu>-->
      <!--</el-sub-menu>-->

      <!--深浅色图标-->
      <el-menu-item h="full">
        <el-button @click="toggleDark" id="checkTheme">
          <el-icon v-if="isDark"><moon/></el-icon>
          <el-icon v-else><Sunny/></el-icon>
        </el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>


