<template>
      <el-menu
          default-active="1"
          class="el-menu-vertical-demo">
        <el-menu-item index="1">
          <el-icon><icon-menu /></el-icon>
          <span>Navigator Two</span>
        </el-menu-item>
        <el-menu-item index="2">
          <el-icon><setting /></el-icon>
          <span>Navigator Four</span>
        </el-menu-item>
      </el-menu>
</template>

<script lang="ts" setup>
import {
  Menu as IconMenu,
  Setting,
} from '@element-plus/icons-vue'

</script>
