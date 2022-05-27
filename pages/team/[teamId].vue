<template>
  <div class="flex flex-col space-y-2">
    <el-breadcrumb separator="/" class="text-lg">
      <el-breadcrumb-item :to="{ path: '/team' }">Team</el-breadcrumb-item>
      <el-breadcrumb-item>{{ teamName }} - {{ state.title }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed width="120" />
      <el-table-column prop="teamId" label="Team Id" width="120" />
      <el-table-column prop="teamName" label="Team Name" width="120" />
      <el-table-column prop="userId" label="User Id" width="120" />
      <el-table-column prop="userName" label="User Name" width="120" />
      <el-table-column prop="pass" label="Pass" width="120" />
      <el-table-column prop="quit" label="Quit" width="120" />
      <el-table-column prop="joinTime" label="Join Time" width="120" />
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
      <el-form ref="memberForm" :model="state.data" :rules="state.rules" label-position="top">
        <el-form-item label="User Id" prop="userId">
          <el-input v-model="state.data.userId" type="text" clearable />
        </el-form-item>
        <el-form-item label="User Name" prop="userName">
          <el-input v-model="state.data.userName" type="text" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(memberForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(memberForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { memberItem } from '~/models/member'
import { getMemberPage, getMemberById, updateMemberById, deleteMemberById, addMember } from '~/services/member'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: memberItem[],
  visible: boolean,
  isAdd: boolean,
  data: memberItem,
  rules: FormRules
}

const route = useRoute()
const teamId = Number(route.params.teamId)
const teamName = String(route.query.name)
const memberForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'Member',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as memberItem,
  rules: {
    userId: { required: true, message: 'Please input user id', trigger: 'blur' },
    userName: [
      { required: true, message: 'Please input user name', trigger: 'blur' },
      { min: 1, max: 40, message: 'Length should be 1 to 40', trigger: 'blur' }
    ]
  }
})

async function load(): Promise<void> {
  const res = await getMemberPage({
    page: state.page,
    size: state.size
  }, teamId)
  state.list = res.data.records
  state.total = res.data.total
}

function changePage(page: number) {
  state.page = page
  load()
}

async function openDetail(data: memberItem): Promise<void> {
  const res = await getMemberById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as memberItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: memberItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await deleteMemberById({ id: data.id })
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
    const res = await updateMemberById(state.data)
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
    const res = await addMember({ ...state.data, teamId, teamName })
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
