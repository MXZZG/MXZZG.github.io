/**
 * 主入口文件
 * 创建Vue应用实例并挂载到DOM
 */
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const app = createApp(App)

// 使用路由
app.use(router)

// 挂载应用
app.mount('#app')
