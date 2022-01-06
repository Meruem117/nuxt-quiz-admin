<template>
  <div>
    <Home />
    <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/components/Home.vue'

export default Vue.extend({
  name: "IndexPage",
  components: { Home }
})
</script>
