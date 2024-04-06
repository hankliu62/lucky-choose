import type { NuxtConfig } from '@nuxt/schema'
export const createAppConfig = (): NuxtConfig['app'] => {
  const config: NuxtConfig['app'] = {
    buildAssetsDir: '/static/',
    head: {
      title: 'Hank 懒人幸运选择器',
      meta: [
        { name: 'description', content: '懒人选择困难证用户的福音，根据天时，地利和人和的因素帮助选择困难证用户快速的做出最优选择，如果结果非最优，可能是你太衰了。' },
        { name: 'keywords', content: '选择,选择困难证,幸运选择器' }
      ],
      link: [
        { rel: 'icon', href: 'favicon.ico' }
      ]
    }
  }

  // 是否通过github actions部署
  const isGithubActions = process.env.GITHUB_ACTIONS || false

  if (isGithubActions) {
    const repo = process.env.GITHUB_REPOSITORY!.replace(/.*?\//, '')
    // 用于为静态资源（如图像、样式表、JavaScript 文件等）设置 URL 前缀
    // 这在将应用部署到自定义域名或 CDN 上时特别有用，因为它允许您将静态资源存储在不同的位置
    config.cdnURL = `/${repo}/`
    // 用于为应用设置基础路径
    // 这在将应用部署到子目录下时特别有用，因为它允许您指定应用所在的目录
    config.baseURL = `/${repo}`
    config!.head!.link = [
      { rel: 'icon', href: `/${repo}/favicon.ico` }
    ]
    console.log('nuxt app config is:', config)
  }

  return config
}
