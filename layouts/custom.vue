<template>
  <el-container class="w-full h-screen">
    <el-aside width="240px">
      <slot name="layout-aside" />
    </el-aside>
    <el-container class="bg-gray-100">
      <el-header class="bg-white shadow-sm">
        <slot name="layout-header" />
      </el-header>
      <el-main>
        <slot name="layout-main" />
      </el-main>
      <el-footer>
        <slot name="layout-footer" />
      </el-footer>
    </el-container>
  </el-container>
</template>
