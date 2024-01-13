<script setup>

import {useDark} from "@vueuse/core";
import {useReaderStore} from "@/stores/reader.js";
import {useTokenStore} from "@/stores/token.js";
import {useAdminStore} from "@/stores/admin.js";
import {ref} from 'vue'
import {Link, Moon, Sunny, SwitchButton} from "@element-plus/icons-vue";
import router from "@/router/index.js";

const adminStore = useAdminStore();
const readerStore = useReaderStore();
const tokenStore = useTokenStore();

const isAdmin = adminStore.isAdmin;

//显示名字标签
let tag = ref();

console.log('标签' + isAdmin);
if (isAdmin) {
  tag.value = adminStore.admin.nickname;
} else {
  tag.value = readerStore.reader.nickname;
}
// 切换深浅色
const isDark = useDark();
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
  } else if (command === 'frontend') {
    window.open('https://github.com/TankingCao/vue3-vite');
  } else if (command === 'backend') {
    window.open('https://github.com/TankingCao/java_design');
  }
};

// 头像图片
const url = ref('https://pic.imgdb.cn/item/65a271fe871b83018a8f9a8f.gif');

</script>

<template>
  <div class="demo-fit header-view">
    <el-menu mode="horizontal">
      <!--头像-->
      <el-dropdown @command="handleCommand">
        <el-menu-item index="1">
          <el-avatar @click="router.push('/user')" shape="square"
                     :size="42" :fit="'cover'" :src="url"/>
        </el-menu-item>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="frontend">
              <el-button link type="primary" :icon="Link">前端项目</el-button>
            </el-dropdown-item>

            <el-dropdown-item command="backend">
              <el-button link type="primary" :icon="Link">后端项目</el-button>
            </el-dropdown-item>

            <el-dropdown-item command="logout">
              <el-button link type="danger" :icon="SwitchButton">退出登录</el-button>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>

      <!--昵称标签-->
      <el-menu-item h="full">
        <el-tag type="success" size="large" round>
          {{ tag }}
        </el-tag>
      </el-menu-item>

      <!--深浅色图标-->
      <el-menu-item h="full">
        <el-button @click="toggleDark" id="checkTheme" link>
          <el-icon v-if="isDark">
            <moon/>
          </el-icon>
          <el-icon v-else>
            <Sunny/>
          </el-icon>
        </el-button>
      </el-menu-item>
    </el-menu>
  </div>
</template>


