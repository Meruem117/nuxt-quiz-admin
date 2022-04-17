import { defineNuxtPlugin } from '#app'
import ElementPlus from 'element-plus/dist/index.full.js'

export default defineNuxtPlugin(nuxtApp => {
  nuxtApp.vueApp.use(ElementPlus)
})