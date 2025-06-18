import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

// 获取当前文件的目录路径
const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 自动生成组件侧边栏配置
function generateComponentsSidebar(src, category) {
  const componentsDir = path.join(__dirname, src)
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
        link: `/${category}/${name}`,
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
    items: generateComponentsSidebar('../../components', 'components'),
  },
  {
    text: 'HTML',
    collapsed: false,
    items: generateComponentsSidebar('../../HTML', 'HTML'),
  },
  {
    text: 'CSS',
    collapsed: false,
    items: generateComponentsSidebar('../../CSS', 'CSS'),
  },
  {
    text: 'JavaScript',
    collapsed: false,
    items: generateComponentsSidebar('../../JavaScript', 'JavaScript'),
  },
  {
    text: 'Vue',
    collapsed: false,
    items: generateComponentsSidebar('../../Vue', 'Vue'),
  },
  // {
  //   text: 'React 教程',
  //   collapsed: false,
  //   items: generateComponentsSidebar('../../React', 'React'),
  // },
  // {
  //   text: 'Node.js 教程',
  //   collapsed: false,
  //   items: generateComponentsSidebar('../../Node', 'Node'),
  // },
  {
    text: 'Other',
    collapsed: false,
    items: generateComponentsSidebar('../../Other', 'Other'),
  },
]

// 生成完整的侧边栏配置
export const sidebar = {
  '/guide/': commonSidebar,
  '/components/': commonSidebar,
  '/HTML/': commonSidebar,
  '/CSS/': commonSidebar,
  '/JavaScript/': commonSidebar,
  '/Vue/': commonSidebar,
  // '/React/': commonSidebar,
  // '/Node/': commonSidebar,
  '/Other/': commonSidebar,
}

console.log(sidebar, 'sidebar')
