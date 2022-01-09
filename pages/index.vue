<template>
  <div>
    <Home />
    <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
    <button @click="getUserById(1)">Click</button>
    <div v-for="(id,name) in team">{{ name }}的组号为{{ id }}</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/components/Home.vue'
import { userItem, userTeamItem } from '@/models/user'

export default Vue.extend({
  name: "IndexPage",
  components: { Home },
  data() {
    return {
      userInfo: {} as userItem,
      team: {} as userTeamItem
    }
  },
  methods: {
    async getUserById(id: number) {
      const res = await this.$axios.$get(`/api/user/get?id=${id}`)
      this.user = res.data
      const team: userTeamItem = JSON.parse(res.data.team)
      this.team = team
      console.log(this.team, this.user)
    }
  }
})
</script>
