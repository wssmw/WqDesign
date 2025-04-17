import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import Components from '../src/components'

const app = createApp(App)

app.use(ElementPlus)
app.use(Components)

app.mount('#app') 