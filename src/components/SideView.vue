<template>
  <el-menu
      default-active="1"
      class="el-menu-vertical-demo">
    <el-menu-item index="1" @click="router.push('/book')">
      <el-icon>
        <icon-menu/>
      </el-icon>
      <span>图书信息查询</span>
    </el-menu-item>
    <el-menu-item index="2" @click="router.push('/reader')">
      <el-icon>
        <setting/>
      </el-icon>
      <span>个人信息</span>
    </el-menu-item>
    <el-menu-item index="3" @click="router.push('/borrow')">
      <el-icon>
        <search/>
      </el-icon>
      <span>借阅信息</span>
    </el-menu-item>
    <el-menu-item index="4" @click="logout">
      <el-icon>
        <switch-button></switch-button>
      </el-icon>
      <span>退出登录</span>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import {
  Search,
  Search as IconMenu,
  Setting, SwitchButton,
} from '@element-plus/icons-vue'

import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token";
import {useReaderStore} from "@/stores/reader";


const tokenStore = useTokenStore();
const readerStore = useReaderStore();

const router = useRouter();

const logout = () => {
  // 退出后清除token和reader信息
  tokenStore.setToken(null);
  readerStore.setReader(null);
  router.push('/login');
}

</script>
