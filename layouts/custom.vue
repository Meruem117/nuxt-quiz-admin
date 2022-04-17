<template>
  <el-container class="w-full h-screen">
    <el-aside>
      <slot name="layout-aside" />
    </el-aside>
    <el-container>
      <el-header>
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