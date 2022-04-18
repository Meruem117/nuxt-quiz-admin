<template>
  <el-menu class="h-full" active-text-color="#ffd04b" background-color="#545c64" default-active="1" text-color="#fff">
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="1">
        <el-icon>
          <home-filled />
        </el-icon>
        <span>Home</span>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="2">
        <el-icon>
          <user-filled />
        </el-icon>
        <span>User</span>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="3">
        <el-icon>
          <briefcase />
        </el-icon>
        <span>Team</span>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="4">
        <el-icon>
          <opportunity />
        </el-icon>
        <span>Topic</span>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="5">
        <el-icon>
          <flag />
        </el-icon>
        <span>Quiz</span>
      </el-menu-item>
    </NuxtLink>
    <NuxtLink to="/" class="no-underline">
      <el-menu-item index="6">
        <el-icon>
          <list />
        </el-icon>
        <span>Question</span>
      </el-menu-item>
    </NuxtLink>
  </el-menu>
</template>

<script setup lang="ts">
import { HomeFilled, UserFilled, Briefcase, Opportunity, Flag, List } from '@element-plus/icons-vue'
</script>
