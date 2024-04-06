/** @type {import('tailwindcss').Config} */
import type { Config } from 'tailwindcss'
import colors from 'tailwindcss/colors'

export default <Partial<Config>>{
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue'
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.green
      }
    }
  }
}