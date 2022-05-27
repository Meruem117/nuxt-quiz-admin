<template>
  <div class="flex flex-col space-y-2">
    <h1>{{ state.title }}</h1>
    <el-table :data="state.list" border stripe style="width: 100%">
      <el-table-column prop="id" label="Id" fixed width="120" />
      <el-table-column prop="email" label="Email" width="240" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="gender" label="Gender" :formatter="formatGender" width="120" />
      <el-table-column prop="location" label="Location" width="120" />
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
      <el-form ref="userForm" :model="state.data" :rules="state.rules" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="state.data.email" type="email" clearable />
        </el-form-item>
        <el-form-item label="Name" prop="name">
          <el-input v-model="state.data.name" type="text" clearable />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="state.data.password" type="password" clearable show-password />
        </el-form-item>
        <el-form-item label="Gender" prop="gender">
          <el-radio-group v-model="state.data.gender">
            <el-radio :label="1">Male</el-radio>
            <el-radio :label="0">Female</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="Location" prop="location">
          <el-input v-model="state.data.location" type="text" clearable />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button v-show="state.isAdd" type="primary" @click="addOne(userForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateOne(userForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { FormInstance, FormRules, ElMessage, ElMessageBox } from 'element-plus'
import type { userItem } from '~/models/user'
import { getUserPage, getUserById, updateUserById, deleteUserById, addUser } from '~/services/user'
import { DEFAULT_PAGE_SIZE } from '~/constant'
import { formatGender } from '~/utils'

interface stateItem {
  title: string,
  page: number,
  size: number,
  total: number,
  list: userItem[],
  visible: boolean,
  isAdd: boolean,
  data: userItem,
  rules: FormRules
}

const userForm = ref<FormInstance>()
const state: stateItem = reactive({
  title: 'User',
  page: 1,
  size: DEFAULT_PAGE_SIZE,
  total: 0,
  list: [],
  visible: false,
  isAdd: false,
  data: {} as userItem,
  rules: {
    email: [
      { required: true, message: 'Please input email', trigger: 'blur' },
      { type: 'email', message: 'Please input correct email', trigger: ['blur', 'change'] }
    ],
    name: [
      { required: true, message: 'Please input name', trigger: 'blur' },
      { min: 1, max: 40, message: 'Length should be 1 to 40', trigger: 'blur' }
    ],
    password: { required: true, message: 'Please input password', trigger: 'blur' },
    gender: { required: true, message: 'Please input gender', trigger: 'blur' }
  }
})

async function load(): Promise<void> {
  const res = await getUserPage({
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

async function openDetail(data: userItem): Promise<void> {
  const res = await getUserById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

function openDialog(): void {
  state.data = {} as userItem
  state.isAdd = true
  state.visible = true
}

function deleteOne(data: userItem): void {
  ElMessageBox.confirm('Are you sure to delete?', {
    confirmButtonText: 'Confirm',
    cancelButtonText: 'Cancel',
    type: 'warning',
    customClass: 'message-box'
  }).then(async () => {
    const res = await deleteUserById({ id: data.id })
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
    const res = await updateUserById(state.data)
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
    const res = await addUser(state.data)
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
