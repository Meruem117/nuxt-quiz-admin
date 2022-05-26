<template>
  <NuxtLayout name="custom">
    <template #layout-aside>
      <CommonMenu />
    </template>
    <template #layout-header>
      <CommonHeader />
    </template>
    <template #layout-main>
      <NuxtPage />
    </template>
    <template #layout-footer>
      <CommonFooter />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CommonMenu from '~/components/common/CommonMenu.vue'
import CommonHeader from '~/components/common/CommonHeader.vue'
import CommonFooter from '~/components/common/CommonFooter.vue'
</script>

<style>
@import "~/styles/main.css";

.message-box {
  z-index: 3000 !important;
}

.el-dialog {
  z-index: 1000 !important;
}
</style>
