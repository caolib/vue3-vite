<script setup>

import {useDark} from "@vueuse/core";
import {useReaderStore} from "@/stores/reader.js";
import {useTokenStore} from "@/stores/token.js";

const readerStore = useReaderStore();
const tokenStore = useTokenStore();

const isDark = useDark();
// 切换深浅色
const toggleDark = () => {
  isDark.value = !isDark.value
}

// 头像下拉菜单命令
const handleCommand = function (command) {
  if (command === 'logout') {
    // 退出后清除token和reader信息
    tokenStore.setToken(null);
    readerStore.setReader(null);
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
          <el-avatar @click="router.push('/reader')" shape="circle" :size="42" :fit="'cover'" :src="url"/>
        </el-menu-item>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="logout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!--昵称标签-->
      <el-menu-item h="full">
        <el-tag type="success" size="large" round>{{readerStore.reader.nickname}}</el-tag>
      </el-menu-item>

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


