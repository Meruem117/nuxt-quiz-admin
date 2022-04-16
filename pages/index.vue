<template>
  <Home />
  <nuxt-link :to="{ name: 'about' }">About</nuxt-link>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/components/Home.vue'
import { userDaoItem, userTeamItem } from '~/models/user'

export default Vue.extend({
  name: "IndexPage",
  components: { Home },
  data: {
    userInfo: {} as userDaoItem,
    team: {} as userTeamItem
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
