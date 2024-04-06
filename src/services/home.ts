/* eslint-disable no-undef */
import { InspirationalWriting, Movies } from '@/constants'
import { Lunar, Solar } from 'lunar-javascript'

const starSign = {
  '白羊': 'aries',
  '金牛': 'taurus',
  '双子': 'gemini',
  '巨蟹': 'cancer',
  '狮子': 'leo',
  '处女': 'virgo',
  '天秤': 'libra',
  '天蝎': 'scorpio',
  '射手': 'sagittarius',
  '摩羯': 'capricorn',
  '水瓶': 'aquarius',
  '双鱼': 'pisces'
}

type TFortuneInfo = {
  summary: string;
  QFriend: string;
  color: string;
  number: number;
  health: number;
  love: number;
  work: number;
  money: number;
  all: number;
  maxIndexKey?: 'health'|'love'|'money'|'work';
}

type TFortuneIndex = Pick<TFortuneInfo, NonNullable<TFortuneInfo['maxIndexKey']>>

/**
 * 获取星座运势 - 聚合数据
 * @param consName
 * @param keyIndex
 * @returns
 */
async function getFortuneInfoByTianApi(consName: string, keyIndex = 0): Promise<TFortuneInfo> {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseTian, apiKeyTian } = runtimeConfig.public

  const keys = [
    apiKeyTian
  ]

  const params = {
    key: keys[keyIndex], //
    consName: starSign[consName.replace('座', '') as keyof typeof starSign]
  }

  const url = `${apiBaseTian}?key=${params.key}&astro=${params.consName}`
  const res = await fetch(url, {
    method: 'GET'
  })
  const text = await res.text()
  const result = JSON.parse(text)

  if (result.code !== 200 && keyIndex < keys.length - 1) {
    return getFortuneInfoByTianApi(consName, keyIndex + 1)
  }

  const summary = result.result.list.find((item: any) => item.type === '今日概述')?.content
  const QFriend = result.result.list.find((item: any) => item.type === '贵人星座')?.content
  const color = result.result.list.find((item: any) => item.type === '幸运颜色')?.content
  const number = result.result.list.find((item: any) => item.type === '幸运数字')?.content
  const health = result.result.list.find((item: any) => item.type === '健康指数')?.content?.replace('%', '')
  const love = result.result.list.find((item: any) => item.type === '爱情指数')?.content?.replace('%', '')
  const work = result.result.list.find((item: any) => item.type === '幸运数字')?.content?.replace('%', '')
  const money = result.result.list.find((item: any) => item.type === '工作指数')?.content?.replace('%', '')
  const all = result.result.list.find((item: any) => item.type === '综合指数')?.content?.replace('%', '')

  const formattedResult: TFortuneInfo = {
    summary,
    QFriend,
    color,
    number,
    health,
    love,
    work,
    money,
    all
  }

  const maxIndexKey: TFortuneInfo['maxIndexKey'] = (['health', 'love', 'money', 'work'].sort((prev, next) => formattedResult[next as keyof TFortuneIndex] - formattedResult[prev as keyof TFortuneIndex])[0]) as keyof TFortuneIndex

  formattedResult.maxIndexKey = maxIndexKey

  return formattedResult
}

/**
 * 获取星座运势 - 聚合数据
 * @param consName
 * @param keyIndex
 * @returns
 */
async function getFortuneInfoByJuheApi(consName: string, keyIndex = 0): Promise<TFortuneInfo> {
  const runtimeConfig = useRuntimeConfig()
  const { apiBaseJuHe, apiKeyJuHe1, apiKeyJuHe2 } = runtimeConfig.public

  const keys = [
    apiKeyJuHe1,
    apiKeyJuHe2
  ]

  const params = {
    key: keys[keyIndex], //
    consName,
    type: 'today'
  }

  // https://www.juhe.cn/docs/api/id/58
  const url = `${apiBaseJuHe}?type=${params.type}&consName=${params.consName}&key=${params.key}`

  const res = await fetch(url, {
    method: 'GET'
  })
  const text = await res.text()
  const result = JSON.parse(text)

  if (result.error_code !== 0 && keyIndex < keys.length - 1) {
    return getFortuneInfoByJuheApi(consName, keyIndex + 1)
  }

  const maxIndexKey = ['health', 'love', 'money', 'work'].sort((prev, next) => result[next] - result[prev])[0]

  result.maxIndexKey = maxIndexKey

  return result
}

async function getFortuneInfo(consName: string): Promise<TFortuneInfo> {
  let result: TFortuneInfo
  try {
    result = await getFortuneInfoByJuheApi(consName, 0)
  } catch (error) {
    result = await getFortuneInfoByTianApi(consName, 0)
  }

  return result
}


export async function makeADecision (params:  {
  type: string;
  selectList: {
      content: string;
      selectTime: number;
      sort: number;
  }[];
  dateOfBirth: string;
  moodScore: number;
}) {
  // 时间分 时间越小，随机分越高
  const selected = params.selectList.sort((prev, next) => prev.selectTime - next.selectTime)[0].content
  const solar = Solar.fromDate(new Date(params.dateOfBirth))
  const lunar = Lunar.fromDate(new Date(params.dateOfBirth))
  const constellation = solar.getXingZuo() + '座'
  const result = await getFortuneInfo(constellation)

  const MockResult = {
    result: selected,
    fortuneMax: result.maxIndexKey,
    summary: result.summary,
    suitableThing: lunar.getDayYi().join(','),
    noSuitableThing: lunar.getDayJi().join(','),
    constellation: result.QFriend,
    movieInfo: Movies[Math.floor(Math.random() * Movies.length)] || Movies[0],
    recommendedContent: InspirationalWriting[Math.floor(Math.random() * InspirationalWriting.length)] || '今天你会遇到一个人，他会带给你好运'
  }

  delete MockResult[['movieInfo', 'recommendedContent'][Math.floor(2 * Math.random())] as keyof typeof MockResult]

  console.log(result, solar.getXingZuo(), MockResult)

  return MockResult
}