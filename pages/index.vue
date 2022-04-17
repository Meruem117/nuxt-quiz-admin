<template>
  <div class="h-full w-full">
    <el-container>
      <el-aside class="w-1/8">Aside</el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>Main</el-main>
        <el-footer>Footer</el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import { ElContainer, ElAside, ElHeader, ElMain, ElFooter } from 'element-plus/dist/index.full.js'
</script>

<style>
</style>
