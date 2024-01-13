<template>
  <el-menu v-model="activeIndex" class="el-menu-vertical-demo">
    <el-menu-item index="1" @click="router.push('/book')">
      <el-icon>
        <search/>
      </el-icon>
      <el-button link :type="'primary'">图书信息查询</el-button>
    </el-menu-item>

    <el-menu-item index="2" @click="router.push('/borrow')">
      <el-icon>
        <search/>
      </el-icon>
      <el-button link :type="'primary'">借阅记录</el-button>
    </el-menu-item>

    <el-menu-item index="3" @click="router.push('/user')">
      <el-icon>
        <setting/>
      </el-icon>
      <el-button link :type="'primary'">个人信息</el-button>
    </el-menu-item>

    <el-menu-item index="4" @click="logout">
      <el-icon>
        <switch-button/>
      </el-icon>
      <el-button link :type="'danger'">退出登录</el-button>
    </el-menu-item>

  </el-menu>
</template>

<script lang="ts" setup>

import {
  Search,
  Setting,
  SwitchButton,
} from '@element-plus/icons-vue'

import {ref} from 'vue';

const activeIndex = ref('1');

import {useRouter} from "vue-router";
import {useTokenStore} from "@/stores/token";
import {useReaderStore} from "@/stores/reader";
import {useAdminStore} from "@/stores/admin";

const adminStore = useAdminStore();
const tokenStore = useTokenStore();
const readerStore = useReaderStore();

const router = useRouter();

const logout = () => {
  // 退出后清除token、reader和admin信息
  tokenStore.setToken(null);
  readerStore.setReader(null);
  adminStore.setAdmin(null);
  router.push('/login');
}

</script>
