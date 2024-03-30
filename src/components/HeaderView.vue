<script setup>
import {useDark} from "@vueuse/core";
import {useReaderStore} from "@/stores/reader.js";
import {useAdminStore} from "@/stores/admin.js";
import {ref} from "vue";
import {Link, Moon, Sunny, SwitchButton} from "@element-plus/icons-vue";
import router from "@/router/index.js";
import {logoutService} from "@/methods/logout.js";
import {ElMessage} from "element-plus";
import {useTokenStore} from "@/stores/token.js";


const adminStore = useAdminStore();
const readerStore = useReaderStore();
const tokenStore = useTokenStore();

const isAdmin = adminStore.isAdmin;

//显示名字标签
let tag = ref();
tag.value = isAdmin ? adminStore.admin.nickname : readerStore.reader.nickname;

// 切换深浅色
const isDark = useDark();

// 头像下拉菜单命令
const handleCommand = async (command) => {
  switch (command) {
      // 退出登录
    case "logout":
      await logoutService();
      ElMessage.success("已退出登录!")
      // 退出后清除token、reader和admin信息
      tokenStore.setToken(null);
      readerStore.clearReader();
      adminStore.clearAdmin();
      await router.push("/login");
      break;
      // 跳转到前端项目
    case "frontend":
      window.open("https://github.com/TankingCao/vue3-vite");
      break;
      // 跳转到后端项目
    case "backend":
      window.open("https://github.com/TankingCao/java_design");
      break;
  }
};

// 头像图片
const url = ref("https://pic.imgdb.cn/item/65a271fe871b83018a8f9a8f.gif");
</script>

<template>
  <div class="demo-fit header-view">
    <el-menu mode="horizontal">
      <!--头像-->
      <el-dropdown @command="handleCommand">
        <el-menu-item index="1">
          <el-avatar
              @click="router.push('/user')"
              shape="square"
              :size="42"
              :fit="'cover'"
              :src="url"
          />
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
              <el-button link type="danger" :icon="SwitchButton"
              >退出登录
              </el-button
              >
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

      <el-menu-item h="full">
        <el-tag v-if="isAdmin" type="warning" size="large" round>
          管理员
        </el-tag>
        <el-tag v-else size="large" round> 读者</el-tag>
      </el-menu-item>

      <!--深浅色图标-->
      <el-menu-item>
        <el-switch
            v-model="isDark"
            size="large"
            :active-action-icon="Moon"
            :inactive-action-icon="Sunny"
            style="
            --el-switch-on-color: rgba(19, 206, 102, 0.7);
            --el-switch-off-color: rgb(74,163,252);
          "
        />
      </el-menu-item>
    </el-menu>
  </div>
</template>
