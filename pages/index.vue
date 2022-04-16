<template>
  <Home />
  <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
</template>

<script setup lang="ts">
import Home from '~/components/Home.vue'
</script>
