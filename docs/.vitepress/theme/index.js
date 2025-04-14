import theme from 'vitepress/dist/client/theme-default/index'
import { AntDesignContainer } from '@vitepress-demo-preview/component'
import '@vitepress-demo-preview/component/dist/style.css'
import './style.css' // 引入全局样式文件，用于覆盖默认样式，例如修改标题颜色、字体大小等

import * as components from '../../../src/components'
console.log(components, 'components')
// 全局注册所有组件

// 导出主题配置，包括 enhanceApp 方法，用于增强 VitePress 应用程序的功能，例如注册全局组件、插件等，这里我们注册了一个全局组件 dem
export default {
  ...theme,
  enhanceApp({ app }) {
    app.component('demo-preview', AntDesignContainer),
      Object.entries(components).forEach(([name, component]) => {
        app.component(name, component)
      })
  },
}
