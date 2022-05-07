<template>
  <h1>User</h1>
  <el-table :data="state.data" class="w-full">
    <el-table-column prop="id" label="Id" width="150" fixed />
    <el-table-column prop="email" label="Email" width="120" />
    <el-table-column prop="name" label="Name" width="120" />
    <el-table-column prop="gender" label="Gender" width="120" />
    <el-table-column prop="location" label="Location" width="150" />
    <el-table-column prop="createTime" label="Create Time" width="120" />
    <el-table-column label="Operations" width="120" fixed="right">
      <template #default>
        <el-button type="text" size="small" @click="openDetail">Detail</el-button>
        <el-button type="text" size="small">Edit</el-button>
      </template>
    </el-table-column>
  </el-table>
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

function openDetail(): void {
  console.log(1)
}

onMounted(() => {
  init()
})
</script>
