import fs from 'fs'
import path from 'path'

// 自动获取components目录下的md文件并生成侧边栏配置
function generateComponentsSidebar() {
  const componentsDir = path.join(process.cwd(), 'docs/components')
  const files = fs.readdirSync(componentsDir)
  
  const items = files
    .filter(file => file.endsWith('.md'))
    .map(file => {
      const name = file.replace('.md', '')
      return {
        text: name,
        link: `/components/${name}`
      }
    })

  return {
    text: 'Components',
    items: items
  }
}

console.log(generateComponentsSidebar(),'testwss')

export const sidebar = [
  generateComponentsSidebar()
]
