<template>
  <h1>User</h1>
</template>

<script setup lang="ts">
import type { userItem } from '~/models/user'
import { getUserPage } from '~/services/user'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
  page: number,
  size: number,
  data: userItem[]
}

const state: stateItem = reactive({
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  data: []
})

async function init(): Promise<void> {
  const res = await getUserPage({
    page: state.page,
    size: state.size
  })
  state.data = res.data.records
}

onMounted(() => {
  init()
})
</script>
