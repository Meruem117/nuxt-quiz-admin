<template>
  <div class="flex flex-col">
    <h1>User</h1>
    <el-button type="primary" @click="openDialog" class="w-16 mb-2">Add</el-button>
    <el-table :data="state.list" border style="width: 100%">
      <el-table-column prop="id" label="Id" fixed />
      <el-table-column prop="email" label="Email" />
      <el-table-column prop="name" label="Name" />
      <el-table-column prop="gender" label="Gender" />
      <el-table-column prop="location" label="Location" />
      <el-table-column prop="createTime" label="Create Time" />
      <el-table-column label="Operations" fixed="right">
        <template v-slot="scope" #default>
          <el-button type="primary" size="small" @click="openDetail(scope.row)">Detail</el-button>
          <el-button type="danger" size="small" @click="deleteUser(scope.row)">Delete</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="state.visible" :title="state.isAdd ? 'Add User' : 'User Detail'" :append-to-body="true">
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
          <el-button v-show="state.isAdd" type="primary" @click="addNewUser(userForm)">Add</el-button>
          <el-button v-show="!state.isAdd" type="primary" @click="updateUser(userForm)">Update</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import type { userItem } from '~/models/user'
import { getUserPage, getUserById, updateUserById, deleteUserById, addUser } from '~/services/user'
import { DEFAULT_PAGE_SIZE } from '~/constant'

interface stateItem {
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
    gender: { required: true, message: 'Please input gender', trigger: 'blur' },
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

async function openDetail(data: userItem): Promise<void> {
  const res = await getUserById(data.id)
  state.data = res.data
  state.isAdd = false
  state.visible = true
}

async function deleteUser(data: userItem): Promise<void> {
  const res = await deleteUserById(data.id)
  if (res.data) {
    ElMessage.success('Delete successfully')
    load()
  } else {
    ElMessage.error('Fail to delete')
  }
}

function openDialog(): void {
  state.data = {} as userItem
  state.isAdd = true
  state.visible = true
}

async function updateUser(form: FormInstance | undefined): Promise<void> {
  if (!form) return
  await form.validate(async (valid, fields) => {
    if (valid) {
      const res = await updateUserById(state.data)
      if (res.data) {
        state.visible = false
        ElMessage.success('Update successfully')
        load()
      } else {
        ElMessage.error('Fail to update')
      }
    }
  })
}

async function addNewUser(form: FormInstance | undefined): Promise<void> {
  if (!form) return
  await form.validate(async (valid, fields) => {
    if (valid) {
      const res = await addUser(state.data)
      if (res.data > 0) {
        state.visible = false
        ElMessage.success('Add successfully')
        load()
      } else {
        ElMessage.error('Fail to add')
      }
    }
  })
}

onMounted(() => {
  load()
})
</script>
