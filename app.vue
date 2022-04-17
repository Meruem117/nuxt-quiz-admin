<template>
  <NuxtLayout name="custom">
    <template #layout-aside>
      <CommonMenu />
    </template>
    <template #layout-main>
      <NuxtPage />
    </template>
  </NuxtLayout>
</template>

<script setup lang="ts">
import CommonMenu from '~/components/common/CommonMenu.vue'
</script>

<style>
@import "~/styles/main.css";
</style>
