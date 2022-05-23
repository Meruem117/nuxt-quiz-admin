<template>
  <div class="flex flex-col space-y-2">
    <h1>Team</h1>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="leader" label="Leader" />
      <el-table-column prop="leaderId" label="Leader Id" />
      <el-table-column prop="description" label="Description" show-overflow-tooltip />
      <el-table-column prop="createTime" label="Create Time" />
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
      <el-form ref="teamForm" :model="state.data" :rules="state.rules" label-position="top">
        <el-form-item label="Name" prop="name">
          <el-input v-model="state.data.name" type="text" clearable />
        </el-form-item>
        <el-form-item label="Leader" prop="leader">
          <el-input v-model="state.data.leader" type="text" clearable />
        </el-form-item>
        <el-form-item label="Leader Id" prop="leaderId">
          <el-input v-model="state.data.leaderId" type="text" clearable />
        </el-form-item>
        <el-form-item label="Description" prop="description">
          <el-input v-model="state.data.description" type="textarea" clearable maxlength="240" show-word-limit />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(teamForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(teamForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { teamItem } from '~/models/team'
import { getTeamPage, getTeamById, updateTeamById, deleteTeamById, addTeam } from '~/services/team'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: teamItem[],
  visible: boolean,
  isAdd: boolean,
  data: teamItem,
  rules: FormRules
}

const teamForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'Team',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as teamItem,
  rules: {
    name: [
      { required: true, message: 'Please input team name', trigger: 'blur' },
      { min: 1, max: 40, message: 'Length should be 1 to 40', trigger: 'blur' }
    ],
    leader: [
      { required: true, message: 'Please input leader', trigger: 'blur' },
      { min: 1, max: 40, message: 'Length should be 1 to 40', trigger: 'blur' }
    ],
    leaderId: { required: true, message: 'Please input leader id', trigger: 'blur' }
  }
})

async function load(): Promise<void> {
  const res = await getTeamPage({
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

async function openDetail(data: teamItem): Promise<void> {
  const res = await getTeamById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as teamItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: teamItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'el-message-box'
  }).then(async () => {
    const res = await deleteTeamById({ id: data.id })
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

function updateOne(form: FormInstance | undefined): void {
  if (!form) return
  ElMessageBox.confirm('Are you sure to update?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'el-message-box'
  }).then(async () => {
    await form.validate(async (valid, fields) => {
      if (valid) {
        const res = await updateTeamById(state.data)
        if (res.data) {
          state.visible = false
          ElMessage.success('Update successfully')
          load()
        } else {
          ElMessage.error('Update failed')
        }
      }
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: 'Update canceled',
    })
  })
}

function addOne(form: FormInstance | undefined): void {
  if (!form) return
  ElMessageBox.confirm('Are you sure to add?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'el-message-box'
  }).then(async () => {
    await form.validate(async (valid, fields) => {
      if (valid) {
        const res = await addTeam(state.data)
        if (res.data > 0) {
          state.visible = false
          ElMessage.success('Add successfully')
          load()
        } else {
          ElMessage.error('Add failed')
        }
      }
    })
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
