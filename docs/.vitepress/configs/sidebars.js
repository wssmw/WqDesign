import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 自动生成组件侧边栏配置
function generateComponentsSidebar() {
  const componentsDir = path.join(__dirname, '../../components')
  if (!fs.existsSync(componentsDir)) {
    return []
  }

  const files = fs.readdirSync(componentsDir)
  return files
    .filter((file) => file.endsWith('.md'))
    .map((file) => {
      const name = file.replace('.md', '')
      return {
        text: name,
        link: `/components/${name}`,
      }
    })
}

// 生成基础侧边栏配置
const commonSidebar = [
  {
    text: '简介',
    collapsed: false,
    items: [
      { text: '简介', link: '/guide/introduction' },
      { text: '快速起步', link: '/guide/quickstart' },
    ],
  },
  {
    text: 'components',
    collapsed: false,
    items: generateComponentsSidebar(),
  },
]

// 生成完整的侧边栏配置
export const sidebar = {
  '/guide/': commonSidebar,
  '/components/': commonSidebar, // 在 components 路径下也使用相同的侧边栏
}

console.log(sidebar, 'sidebar')
