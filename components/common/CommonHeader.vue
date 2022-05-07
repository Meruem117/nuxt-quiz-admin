<template>
  <div class="w-full h-full flex justify-end">
    <div v-show="adminStore.isLogin" class="flex flex-col justify-center">
      <el-popover placement="bottom" title="Logout" trigger="hover" width="120">
        <template #reference>
          <div class="flex cursor-pointer">
            <el-avatar class="my-auto" :size="36" :src="state.defaultAvatar" />
            <div class="my-auto ml-2 text-xl">{{ adminStore.adminName }}</div>
          </div>
        </template>
        <el-popconfirm title="Are you sure to logout?" @confirm="logout">
          <template #reference>
            <el-button type="danger" class="w-full">Logout</el-button>
          </template>
        </el-popconfirm>
      </el-popover>
    </div>
    <el-button v-show="!adminStore.isLogin" type="primary" class="my-auto" @click="state.visible = true">
      Login
    </el-button>
    <el-dialog v-model="state.visible" title="Admin Login" :append-to-body="true">
      <el-form ref="loginForm" :model="state.form" :rules="state.rules" label-position="top">
        <el-form-item label="Email" prop="email">
          <el-input v-model="state.form.email" type="email" clearable :prefix-icon="Message" />
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input v-model="state.form.password" type="password" clearable :prefix-icon="Lock" show-password />
        </el-form-item>
      </el-form>
      <template #footer>
        <span>
          <el-button @click="state.visible = false">Cancel</el-button>
          <el-button @click="resetForm(loginForm)">Reset</el-button>
          <el-button type="primary" @click="login(loginForm)">Submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { Message, Lock } from '@element-plus/icons-vue'
import { useAdminStore } from '~/stores/admin'
import type { loginItem } from '~/models/base'
import { checkAdminPassword } from '~/services/admin'
import { DEFAULT_AVATAR } from '~/constant'

interface stateItem {
  defaultAvatar: string,
  visible: boolean,
  form: loginItem,
  rules: FormRules
}

const adminStore = useAdminStore()
const loginForm = ref<FormInstance>()
const state: stateItem = reactive({
  defaultAvatar: DEFAULT_AVATAR,
  visible: false,
  form: {
    email: '',
    password: ''
  },
  rules: {
    email: [
      {
        required: true,
        message: 'Please input email',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: 'Please input correct email',
        trigger: ['blur', 'change'],
      }
    ],
    password: {
      required: true,
      message: 'Please input password'
    }
  }
})

function resetForm(form: FormInstance | undefined) {
  if (!form) return
  form.resetFields()
}

async function login(form: FormInstance | undefined) {
  if (!form) return
  await form.validate(async (valid, fields) => {
    if (valid) {
      const res = await checkAdminPassword(state.form)
      if (res.data.check) {
        adminStore.login(res.data.info.name)
        resetForm(loginForm.value)
        state.visible = false
        ElMessage.success('Login successfully')
      } else {
        state.form.password = ''
        ElMessage.error('Wrong email or password')
      }
    }
  })
}

function logout() {
  adminStore.logout()
  ElMessage.info('Logout successfully')
}
</script>
