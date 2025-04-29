import './assets/main.css'
import '@cyhnkckali/vue3-color-picker/dist/style.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(router)

app.mount('#app')
