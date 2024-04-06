/* eslint-disable no-undef */
import type { NuxtConfig } from 'nuxt/config'
import { createViteConfig, createRuntimeConfig, createAppConfig } from './src/build'

// https://nuxt.com/docs/api/configuration/nuxt-config
const config: NuxtConfig = {
  ssr: true,
  srcDir: 'src/',
  devtools: { enabled: false },
  typescript: {
    shim: false
  },
  modules: [
    '@nuxtjs/tailwindcss', // 此处

    // With options
    ['@nuxtjs/stylelint-module', {
      /* module options */
    }]
  ],
  runtimeConfig: createRuntimeConfig(),
  vite: createViteConfig(),
  app: createAppConfig()
}

// @ts-nocheck
export default defineNuxtConfig(config)