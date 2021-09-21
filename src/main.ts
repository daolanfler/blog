// import 'prism-theme-vars/base.css'
import './index.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App).use(router)

app.mount('#app')
