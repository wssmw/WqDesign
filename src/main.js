import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import components from './components'

const app = createApp(App)

console.log(components,'components')

// 全局注册所有组件
Object.entries(components).forEach(([name, component]) => {
    app.component(name, component)
})

app.mount('#app')
