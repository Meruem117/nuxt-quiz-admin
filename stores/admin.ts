import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAdminStore = defineStore('admin', () => {
  const isLogin = ref(false)
  const adminName = ref('')

  function login(name: string) {
    isLogin.value = true
    adminName.value = name
  }

  function logout() {
    isLogin.value = false
    adminName.value = ''
  }

  return {
    isLogin,
    adminName,
    login,
    logout
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAdminStore, import.meta.hot))
