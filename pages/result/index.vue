<template>
  <div class="flex flex-col space-y-2">
    <h1>{{ state.title }}</h1>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed width="90" />
      <!-- <el-table-column prop="quizId" label="Quiz Id" width="120" /> -->
      <el-table-column prop="quizName" label="Quiz Name" width="120" />
      <el-table-column prop="round" label="Round" width="90" />
      <!-- <el-table-column prop="scheduleId" label="Schedule Id" width="120" /> -->
      <!-- <el-table-column prop="participantId" label="Participant Id" width="120" /> -->
      <el-table-column prop="participantName" label="Name" width="120" />
      <el-table-column prop="isTeam" label="Is Team" width="90">
        <template #default="scope">
          <el-switch v-model="scope.row.isTeam" :active-value="IS_TEAM.TEAM" :inactive-value="IS_TEAM.USER" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Status" width="120">
        <template #default="scope">
          <el-tag :type="STATUS[scope.row.status].type">{{ STATUS[scope.row.status].text }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="isTake" label="Is Take" width="90">
        <template #default="scope">
          <el-switch v-model="scope.row.isTake" :active-value="IS_TAKE.TAKE" :inactive-value="IS_TAKE.NOT_TAKE"
            disabled />
        </template>
      </el-table-column>
      <el-table-column prop="correct" label="Correct" width="90" />
      <el-table-column prop="correctRate" label="Correct Rate" :formatter="formatRate" width="90" />
      <el-table-column prop="answers" label="Answers" show-overflow-tooltip width="120" />
      <el-table-column prop="errors" label="Errors" show-overflow-tooltip width="120" />
      <el-table-column prop="isOut" label="Is Out" width="90">
        <template #default="scope">
          <el-switch v-model="scope.row.isOut" :active-value="IS_OUT.OUT" disabled />
        </template>
      </el-table-column>
      <el-table-column prop="takeTime" label="Take Time" width="180" />
      <el-table-column prop="createTime" label="Create Time" width="180" />
      <el-table-column label="Operations" fixed="right">
        <template v-slot="scope" #default>
          <el-button type="primary" size="small" @click="openDetail(scope.row)">Detail</el-button>
          <el-button type="danger" size="small" @click="deleteOne(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="flex pt-2">
      <div class="flex justify-start w-1/2">
        <!-- <el-button type="primary" @click="openDialog" class="w-16">Add</el-button> -->
      </div>
      <div class="flex justify-end w-1/2">
        <el-pagination background layout="prev, pager, next" :total="state.total" :page-size="state.size"
          @current-change="changePage" />
      </div>
    </div>
    <el-dialog v-model="state.visible" :title="state.isAdd ? `Add ${state.title}` : `${state.title} Detail`"
      :append-to-body="true">
      <el-form ref="resultForm" :model="state.data" :rules="state.rules" label-position="top">
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(resultForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(resultForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { resultItem } from '~/models/result'
import { getResultPage, getResultById, updateResultById, deleteResultById, addResult } from '~/services/result'
import { DEFAULT_PAGE_SIZE, STATUS, IS_TEAM, IS_TAKE, IS_OUT } from '~/constant'
import { formatRate } from '~/utils'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: resultItem[],
  visible: boolean,
  isAdd: boolean,
  data: resultItem,
  rules: FormRules
}

const resultForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'Result',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as resultItem,
  rules: {}
})

async function load(): Promise<void> {
  const res = await getResultPage({
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

async function openDetail(data: resultItem): Promise<void> {
  const res = await getResultById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as resultItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: resultItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await deleteResultById({ id: data.id })
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
    const res = await updateResultById(state.data)
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
    const res = await addResult(state.data)
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
