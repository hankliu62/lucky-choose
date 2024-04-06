import type { NuxtConfig } from '@nuxt/schema'
export const createRuntimeConfig = (): NuxtConfig['runtimeConfig'] => {
  return {
    public: {
      apiBaseTian: process.env.NUXT_PUBLIC_TIANAPI,
      apiKeyTian: process.env.NUXT_PUBLIC_TIANAPI_KEY,
      apiBaseJuHe: process.env.NUXT_PUBLIC_JUHEAPI,
      apiKeyJuHe1: process.env.NUXT_PUBLIC_JUHEAPI_KEY1,
      apiKeyJuHe2: process.env.NUXT_PUBLIC_JUHEAPI_KEY2
    }
  }
}
