import type { PluginOption } from 'vite'
import { createComponents } from './components'

export const createVitePlugins = () => {
  const vitePlugins: (PluginOption | PluginOption[])[] = [
    // 组件按需导入
    createComponents()
  ]
  return vitePlugins
}
