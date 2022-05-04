<template>
  <div class="w-full h-full flex justify-end">
    <el-avatar class="my-auto cursor-pointer" :size="36" :src="state.defaultAvatar" @click="state.visible = true" />
  </div>
  <el-dialog v-model="state.visible" title="Admin Login">
    <el-form :model="state.form">
      <el-form-item label="Email" :rules="state.rules">
        <el-input v-model="state.form.email" type="email" placeholder="Please input email" clearable />
      </el-form-item>
      <el-form-item label="Password">
        <el-input v-model="state.form.password" type="password" placeholder="Please input password" clearable
          show-password />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="state.visible = false">Cancel</el-button>
        <el-button type="primary" @click="adminLogin">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { loginItem, ruleItem } from '~/models/base'
import { checkAdminPassword } from '~/services/admin'
import { DEFAULT_AVATAR } from '~/constant'

interface stateItem {
  defaultAvatar: string,
  visible: boolean,
  form: loginItem,
  rules: {
    email: ruleItem[]
  }
}

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
        message: 'Please input email address',
        trigger: 'blur',
      },
      {
        type: 'email',
        message: 'Please input correct email address',
        trigger: ['blur', 'change'],
      },
    ]
  }
})

async function adminLogin(): Promise<void> {
  console.log(state.form)
  state.visible = false
}
</script>
