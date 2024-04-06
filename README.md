# luck-choose

懒人选择困难证用户的福音。

根据天时，地利和人和的因素帮助选择困难证用户快速的做出最优选择，如果结果非最优，可能是你太衰了。

## 启动

确保已经安装所有依赖:

```bash
# 推荐 pnpm
pnpm install

# npm
npm install

# yarn
yarn install
```

## 启动服务

### 配置文件

配置本地 `env` 文件，在全局路径下增加 `.env.local` 文件，添加下列字段：

```
# 天聚API
NUXT_PUBLIC_TIANAPI = 'https://apis.tianapi.com/star/index'
NUXT_PUBLIC_TIANAPI_KEY = 'xxxx'

# 聚合API
NUXT_PUBLIC_JUHEAPI = 'http://web.juhe.cn/constellation/getAll'
NUXT_PUBLIC_JUHEAPI_KEY1 = 'xxx'
NUXT_PUBLIC_JUHEAPI_KEY2 = 'xxx'
```

### 启动开发

启动开发服务器 `http://localhost:3000`:

```bash

# pnpm
pnpm run dev

# npm
npm run dev

# yarn
yarn dev
```

## 编译上线

配置本地 `env` 文件，在全局路径下增加 `.env.prod` 文件，添加下列字段：

```
# 天聚API
NUXT_PUBLIC_TIANAPI = 'https://apis.tianapi.com/star/index'
NUXT_PUBLIC_TIANAPI_KEY = 'xxxx'

# 聚合API
NUXT_PUBLIC_JUHEAPI = 'http://web.juhe.cn/constellation/getAll'
NUXT_PUBLIC_JUHEAPI_KEY1 = 'xxx'
NUXT_PUBLIC_JUHEAPI_KEY2 = 'xxx'
```

```bash
# pnpm
pnpm run generate --dotenv .env.prod

# npm
npm run generate --dotenv .env.prod

# yarn
yarn generate --dotenv .env.prod
```

