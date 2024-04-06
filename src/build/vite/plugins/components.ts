import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

export const createComponents = () => {
  return Components({
    resolvers: [
      AntDesignVueResolver({
        importStyle: false
      })
    ]
  })
}
