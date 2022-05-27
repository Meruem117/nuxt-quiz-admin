<template>
  <div class="flex flex-col space-y-2">
    <h1>{{ state.title }}</h1>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed width="120" />
      <el-table-column label="Topic" width="120">
        <template #default="scope">
          <NuxtLink :to="`/topic/${scope.row.id}?name=${scope.row.topic}`">
            {{ scope.row.topic }}
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column prop="description" label="Description" show-overflow-tooltip width="120" />
      <el-table-column prop="createTime" label="Create Time" width="120" />
      <el-table-column label="Operations" fixed="right">
        <template v-slot="scope" #default>
          <el-button type="primary" size="small" @click="openDetail(scope.row)">Detail</el-button>
          <el-button type="danger" size="small" @click="deleteOne(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex pt-2">
      <div class="flex justify-start w-1/2">
        <el-button type="primary" @click="openDialog" class="w-16">Add</el-button>
      </div>
      <div class="flex justify-end w-1/2">
        <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.size"
          @current-change="changePage" />
      </div>
    </div>
    <el-dialog v-model="state.visible" :title="state.isAdd ? `Add ${state.title}` : `${state.title} Detail`"
      :append-to-body="true">
      <el-form ref="topicForm" :model="state.data" :rules="state.rules" label-position="top">
        <el-form-item label="Topic" prop="topic">
          <el-input v-model="state.data.topic" type="text" clearable />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="state.data.description" type="textarea" clearable maxlength="240" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(topicForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(topicForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { topicItem } from '~/models/topic'
import { getTopicPage, getTopicById, updateTopicById, deleteTopicById, addTopic } from '~/services/topic'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: topicItem[],
  visible: boolean,
  isAdd: boolean,
  data: topicItem,
  rules: FormRules
}

const topicForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'Topic',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as topicItem,
  rules: {
    topic: [
      { required: true, message: 'Please input topic', trigger: 'blur' },
      { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
    ]
  }
})

async function load(): Promise<void> {
  const res = await getTopicPage({
    page: state.page,
    size: state.size
  })
  state.list = res.data.records
  state.total = res.data.total
}

function changePage(page: number) {
  state.page = page
  load()
}

async function openDetail(data: topicItem): Promise<void> {
  const res = await getTopicById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as topicItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: topicItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await deleteTopicById({ id: data.id })
    if (res.data) {
      ElMessage.success('Delete successfully')
      load()
    } else {
      ElMessage.error('Delete failed')
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Delete canceled',
    })
  })
}

async function updateOne(form: FormInstance | undefined): Promise<void> {
  if (!form) return
  const validate = await form.validate()
  if (!validate) return
  ElMessageBox.confirm('Are you sure to update?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await updateTopicById(state.data)
    if (res.data) {
      state.visible = false
      ElMessage.success('Update successfully')
      load()
    } else {
      ElMessage.error('Update failed')
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Update canceled',
    })
  })
}

async function addOne(form: FormInstance | undefined): Promise<void> {
  if (!form) return
  const validate = await form.validate()
  if (!validate) return
  ElMessageBox.confirm('Are you sure to add?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await addTopic(state.data)
    if (res.data > 0) {
      state.visible = false
      ElMessage.success('Add successfully')
      load()
    } else {
      ElMessage.error('Add failed')
    }
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Add canceled',
    })
  })
}

onMounted(() => {
  load()
})
</script>
