<template>
  <div class="flex flex-col space-y-2">
    <h1>{{ state.title }}</h1>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed width="120" />
      <el-table-column label="Quiz" width="120">
        <template #default="scope">
          <NuxtLink :to="`/quiz/${scope.row.id}?name=${scope.row.quiz}`">
            {{ scope.row.quiz }}
          </NuxtLink>
        </template>
      </el-table-column>
      <el-table-column prop="topic" label="Topic" width="120" />
      <el-table-column prop="round" label="Round" width="120" />
      <el-table-column prop="creator" label="Creator" width="120" />
      <el-table-column prop="creatorId" label="Creator Id" width="120" />
      <el-table-column prop="description" label="Description" show-overflow-tooltip width="120" />
      <el-table-column prop="winner" label="Winner" width="120" />
      <el-table-column prop="winnerId" label="Winner Id" width="120" />
      <el-table-column prop="isTeam" label="Is Team" width="120" />
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
      <el-form ref="quizForm" :model="state.data" :rules="state.rules" label-position="top">
        <el-form-item label="Quiz" prop="quiz">
          <el-input v-model="state.data.quiz" type="text" clearable />
        </el-form-item>
        <el-form-item label="Topic" prop="topic">
          <el-input v-model="state.data.topic" type="text" clearable />
        </el-form-item>
        <el-form-item label="Round" prop="round">
          <el-input v-model="state.data.round" type="text" clearable />
        </el-form-item>
        <el-form-item label="Creator" prop="creator">
          <el-input v-model="state.data.creator" type="text" clearable />
        </el-form-item>
        <el-form-item label="Creator Id" prop="creatorId">
          <el-input v-model="state.data.creatorId" type="text" clearable />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="state.data.description" type="textarea" clearable maxlength="240" show-word-limit />
        </el-form-item>
        <el-form-item label="Winner" prop="winner" v-show="!state.isAdd">
          <el-input v-model="state.data.winner" type="text" clearable />
        </el-form-item>
        <el-form-item label="Winner Id" prop="winnerId" v-show="!state.isAdd">
          <el-input v-model="state.data.winnerId" type="text" clearable />
        </el-form-item>
        <el-form-item label="Is Team" prop="isTeam" v-show="!state.isAdd">
          <el-input v-model="state.data.isTeam" type="text" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(quizForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(quizForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { quizItem } from '~/models/quiz'
import { getQuizPage, getQuizById, updateQuizById, deleteQuizById, addQuiz } from '~/services/quiz'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: quizItem[],
  visible: boolean,
  isAdd: boolean,
  data: quizItem,
  rules: FormRules
}

const quizForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'Quiz',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as quizItem,
  rules: {
    quiz: [
      { required: true, message: 'Please input quiz', trigger: 'blur' },
      { min: 1, max: 20, message: 'Length should be 1 to 20', trigger: 'blur' }
    ]
  }
})

async function load(): Promise<void> {
  const res = await getQuizPage({
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

async function openDetail(data: quizItem): Promise<void> {
  const res = await getQuizById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as quizItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: quizItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await deleteQuizById({ id: data.id })
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
    const res = await updateQuizById(state.data)
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
    state.data.winner = null
    state.data.winnerId = null
    state.data.isTeam = null
    const res = await addQuiz(state.data)
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
