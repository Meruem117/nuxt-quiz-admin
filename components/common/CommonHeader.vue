<template>
  <div class="w-full h-full flex justify-end">
    <el-button type="primary" class="my-auto" @click="state.visible = true">Login</el-button>
    <!-- <el-avatar class="my-auto cursor-pointer" :size="36" :src="state.defaultAvatar" /> -->
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
          <el-button type="primary" @click="submitForm(loginForm)">Submit</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
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

async function submitForm(form: FormInstance | undefined) {
  if (!form) return
  await form.validate(async (valid, fields) => {
    if (valid) {
      const res = await checkAdminPassword(state.form)
      if (res.data.check) {
        adminStore.login('s')
      } else { 
        
      }
      state.visible = false
    }
  })
}

function resetForm(form: FormInstance | undefined) {
  if (!form) return
  form.resetFields()
}
</script>
