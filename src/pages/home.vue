<script setup lang="ts">
/**
 * 首页
 */
import { ref, computed, defineComponent } from 'vue'
import { message } from 'ant-design-vue'
import type { Dayjs } from 'dayjs'
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons-vue'
import to from 'await-to-js'
import { makeADecision } from '@/services/home'

import ImageLeft from '@/assets/images/home/left.png'
import ImageRight from '@/assets/images/home/right.png'
import ImageRabbit from '@/assets/images/home/rabbit.png'
import ImageBtn from '@/assets/images/home/btn.png'
import ImageHeaderSelected from '@/assets/images/home/header-selected.png'
import ImageBtnShare from '@/assets/images/home/btn-share.png'
import ImageBtnAgain from '@/assets/images/home/btn-again.png'
import ImageResultBox from '@/assets/images/home/result-box.png'
import ImageConstellation from '@/assets/images/home/constellation.png'
import ImageAlmanac from '@/assets/images/home/almanac.png'
import ImageSeparator from '@/assets/images/home/separator.png'
import ImageFireworks from '@/assets/images/home/fireworks.png'
import Bg from '@/assets/images/home/bg.png'
import ResultBg from '@/assets/images/home/result-bg.png'

defineComponent({
  components: {
    PlusCircleOutlined,
    MinusCircleOutlined
  }
})

interface IQuestion {
  id: string;
  content: string;
}

const questions: IQuestion[] = [
  {
    id: 'play',
    content: '周末该去哪里玩'
  },
  {
    id: 'vacation',
    content: '有假期了，该去哪里度假'
  },
  {
    id: 'movie',
    content: '电影该选哪部看'
  },
  {
    id: 'eat',
    content: '今天该吃什么'
  },
  {
    id: 'drink',
    content: '想喝点啥，该选哪个'
  },
  {
    id: 'plan',
    content: '该选哪个方案进行推进'
  }
]

// 问题选项
const questionOptions = ref<{label: string, value: string}[]>(questions.map(({id, content}) => ({
  label: content,
  value: id
})))

// 选中的问题
const question = ref<string>('vacation')

const questionName = computed<string>(() => {
  return questionOptions.value?.find(({ value }: typeof questionOptions.value[0]) => value === question.value)?.label || ''
})

const questionModalVisible = ref<boolean>(true)

/**
 * 修改选中的问题
 */
function onChangeQuestion(value: string) {
  question.value = value
  questionModalVisible.value = false
}

/**
 * 选择自定义问题
 */
function onChangeCustomQuestion() {
  message.success('暂不支持，期待下次迭代！')
}

interface IAnswer {
  id: string;
  value: string;
  time?: number;
  focusTime?: number;
  duration: number;
}

function uuid() {
  return Math.random().toString(16) + new Date().valueOf()
}

// 答案列表
const answers = ref<IAnswer[]>([
  {
    id: uuid(),
    value: '',
    duration: 0
  }
])

const maxAnswerCount = ref<number>(3)

// 当前正在编辑的组件
const focusControlType = ref<string>()

/**
 * 添加答案
 */
function onAddAnswerOption() {
  if (answers.value.length >= maxAnswerCount.value) {
    return
  }

  answers.value.push({
    id: uuid(),
    value: '',
    duration: 0
  })
}

/**
 * 删除答案
 */
function onDeleteAnswerOption(index: number) {
  answers.value.splice(index, 1)
}

/**
 * 离开答案输入框
 */
function onBlurAnswerOption(index: number) {
  answers.value[index].time = new Date().valueOf()
  answers.value[index].duration = answers.value[index].duration + (answers.value[index].time! - answers.value[index].focusTime!)
}

function onFocusAnswerOption(index: number) {
  focusControlType.value = 'answer'
  answers.value[index].focusTime = new Date().valueOf()
}

function onChangeAnswer(e: any, index: number) {
  answers.value[index].value = e.target.value
}

// 生日
const birthday = ref<Dayjs>()

// 心情
const mood = ref()

// 心情列表
const moods = ref<{value: number, image: string}[]>([
  {
    value: 3,
    image: '😄'
  },
  {
    value: 2,
    image: '😐'
  },
  {
    value: 1,
    image: '😡'
  }
])

/**
 * 选中心情
 */
function onSelectMood(value: number) {
  focusControlType.value = 'understand'
  mood.value = value
}

const result = ref()
// 是否获得结果
const hasResult = ref<boolean>(false)
const submitting = ref<boolean>(false)

/**
 * 提交
 */
async function onSubmit() {
  if (submitting.value) {
    return
  }

  result.value = undefined

  if (!question.value || !answers.value.length || answers.value.every(({ value }: any) => !value) || !birthday.value || !mood.value) {
    message.error('请完善信息')
    return
  }

  submitting.value = true
  const params = {
    type: question.value,
    selectList: answers.value.map((item: typeof answers.value[0], index: number) => ({
      content: item.value,
      selectTime: item.duration,
      sort: index + 1
    })),
    dateOfBirth: birthday.value.format('YYYY-MM-DD'),
    moodScore: mood.value
  }

  const [err, res] = await to(makeADecision(params))
  submitting.value = false
  if (err) {
    message.error(err.message || '服务器异常')
  } else {
    result.value = res
    hasResult.value = true
  }
}

function onChangeBirthday(value: any) {
  birthday.value = value
}

// 再来一次
function onAgain() {
  hasResult.value = false
  result.value = undefined
  mood.value = undefined
  birthday.value = undefined
  answers.value = [{
    id: uuid(),
    value: '',
    duration: 0
  }]
  question.value = 'vacation'
  questionModalVisible.value = true
}

function onShare() {
  message.success('暂不支持，期待下次迭代！')
}

function onToggleQuestionModal() {
  questionModalVisible.value = !questionModalVisible.value
  focusControlType.value = ''
}

const fortuneMaxName = {
  health: '健康指数',
  love: '爱情指数',
  money: '财运指数',
  work: '工作指数'
}

const fortuneMax = computed(() => fortuneMaxName[result.value.fortuneMax as (keyof typeof fortuneMaxName)] || '-')
</script>

<template>
  <NuxtLayout name="custom">
    <div
      class="home-container p-[38px_24px] min-h-full text-[16px] bg-no-repeat bg-cover"
      :style="`background-image: url(${Bg})`"
    >
      <div
        v-if="!hasResult"
        class="input-container"
      >
        <div class="card">
          <div class="title text-center">
            <img
              class="w-[64px] mx-auto"
              :src="ImageRabbit"
            >
          </div>
          <div class="form-control">
            <div
              class="question-selector rounded-[12px] w-full h-[54px] text-center text-black bg-white shadow-[0_0_11px_rgb(255_255_255_/_70%)] leading-[54px] cursor-pointer"
              @click="onToggleQuestionModal"
              v-text="questionName"
            />
          </div>
        </div>
        <div
          v-if="questionModalVisible"
          class="question-modal fixed inset-0 z-[2] flex justify-center flex-col"
        >
          <div
            class="absolute inset-0 z-[4] bg-no-repeat bg-cover "
            :style="`background-image: url(${Bg})`"
          />
          <div class="relative z-[5]">
            <div
              v-for="{ label, value } in questionOptions"
              :key="value"
              class="my-[8px] py-[10px] text-[20px] font-medium text-center text-white opacity-60 cursor-pointer"
              :class="{['opacity-100']: question === value || !question}"
              @click="onChangeQuestion(value)"
            >
              <span class="flex justify-center items-center">
                <img
                  v-if="question === value"
                  class="w-[18px] h-[18px] mr-[11px]"
                  :src="ImageLeft"
                >
                <span
                  class="pt-[2px]"
                  v-text="label"
                />
                <img
                  v-if="question === value"
                  class="w-[18px] h-[18px] ml-[11px]"
                  :src="ImageRight"
                >
              </span>
            </div>

            <div
              class="my-[8px] py-[10px] text-[18px] font-medium text-center text-white opacity-60"
              :class="{['opacity-100']: !question}"
              @click="onChangeCustomQuestion"
            >
              <span>自定义（以后再说）</span>
            </div>
          </div>
        </div>

        <div
          class="border border-dashed border-transparent rounded-[12px] px-[21px] py-[24px] bg-white/20 transition-all duration-300 backdrop-blur-[21px] mt-[30px]"
          :class="{'border-white': focusControlType === 'answer'}"
        >
          <div class="title text-white/80 text-center mb-[24px] font-semibold">
            请更改/输入你在纠结的选项
          </div>
          <div class="form-control">
            <div
              v-for="(answer, index) in answers"
              :key="answer.id"
              class="flex items-center justify-between"
              :class="index !== 0 ? 'mt-[15px]' : ''"
            >
              <div
                class="rounded-[50%] text-center border-[2px] border-solid border-white w-[24px] h-[24px] leading-[20px] font-semibold text-white"
                v-text="String.fromCharCode(65 + index)"
              />
              <a-input
                v-model="answer.value"
                class="tz-input !w-[200px]"
                placeholder="请输入你纠结的选项"
                @blur="onBlurAnswerOption(index)"
                @focus="onFocusAnswerOption(index)"
                @change="onChangeAnswer($event, index)"
              />
              <plus-circle-outlined
                v-if="index === answers.length - 1 && answers.length < maxAnswerCount"
                class="text-[24px] text-white"
                @click="onAddAnswerOption"
              />
              <minus-circle-outlined
                v-else-if="index !== answers.length - 1 || index === maxAnswerCount - 1"
                class="text-[24px] text-white"
                @click="onDeleteAnswerOption(index)"
              />
            </div>
          </div>
        </div>

        <div
          class="border border-dashed border-transparent rounded-[12px] px-[21px] py-[24px] bg-white/20 transition-all duration-300 backdrop-blur-[21px] mt-[30px]"
          :class="{'border-white': focusControlType === 'understand'}"
        >
          <div class="form-control">
            <div class="flex flex-col items-center justify-between">
              <div class="text-white/80 whitespace-nowrap mb-[10px] font-medium">
                🍰 选择你的生日
              </div>
              <a-date-picker
                v-model="birthday"
                class="tz-date-picker !w-[200px]"
                placeholder="请选择生日"
                input-read-only
                @change="onChangeBirthday"
                @focus="focusControlType = 'understand'"
              />
            </div>
            <div class="flex flex-col items-center justify-start mt-[15px]">
              <div class="text-white/80 whitespace-nowrap mb-[10px] font-medium">
                💢 选择你当前心情
              </div>
              <div class="flex">
                <div
                  v-for="{value, image} in moods"
                  :key="value"
                  class="mood-item first:ml-0 last:mr-0 mx-[20px] w-[40px] h-[40px] text-center leading-[40px] text-[16px]"
                  :class="{checked: value === mood}"
                  @click="onSelectMood(value)"
                >
                  <span
                    class="text-[30px] transition-all"
                    v-text="image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="card mt-[42px] text-center">
          <div
            class="btn-submit inline-flex justify-center items-center h-[58px] mx-[auto]"
            @click="onSubmit"
          >
            <img
              class="h-[58px]"
              :src="ImageBtn"
            >
          </div>
        </div>
      </div>

      <div
        v-if="hasResult && result"
        class="result-container"
      >
        <div class="header flex justify-center items-end">
          <img
            class="w-[50px]"
            :src="ImageRabbit"
          >
          <img
            class="w-[50px] ml-[18px] mb-[5px]"
            :src="ImageHeaderSelected"
          >
        </div>

        <div class="relative text-center mx-auto">
          <img
            class="h-[58px] mx-[auto]"
            :src="ImageResultBox"
          >
          <div
            class="absolute top-1/2 left-1/2 text-[20px] font-semibold text-center text-white -translate-x-1/2 -translate-y-1/2 leading-[28px]"
            v-text="result.result"
          />
        </div>

        <div
          class="text-center -mt-[40px] p-[45px_39px] bg-center bg-repeat-y bg-cover"
          :style="`background-image: url(${ResultBg})`"
        >
          <div class="text-[14px] font-normal text-center text-white/60 leading-[20px]">
            我们是有“依据”的科学选择
          </div>

          <div class="mt-[20px] text-white/60">
            <div>
              <img
                class="w-[95px]"
                :src="ImageConstellation"
              >
              <div class="mt-12px text-[14px] text-left">
                恭喜你，今日 <span class="font-medium">「<span v-text="fortuneMax" />」</span> 爆棚🔥
              </div>
              <div class="mt-6px text-[14px] text-left">
                可以找<span class="font-medium">「<span v-text="result.constellation" /></span>」小伙伴携手一起！
              </div>
            </div>
          </div>

          <div class="mt-[38px] text-white/60">
            <div>
              <img
                class="w-[95px]"
                :src="ImageAlmanac"
              >
              <div class="mt-12px text-[14px] text-left font-medium flex">
                <span>宜：</span>
                <span v-text="result.suitableThing" />
              </div>
              <div class="mt-6px text-[14px] text-left font-medium flex">
                <span>忌：</span>
                <span v-text="result.noSuitableThing" />
              </div>
            </div>
          </div>

          <div class="mt-[26px]">
            <img
              class="w-full"
              :src="ImageSeparator"
            >
          </div>

          <div class="mt-[26px] flex justify-center text-white/60">
            <img
              class="w-[25px]"
              :src="ImageFireworks"
            >
            <div
              class="mx-[12px] font-medium"
              v-text="result.movieInfo ? '其他电影推荐' : '每日一签'"
            />
            <img
              class="w-[25px]"
              :src="ImageFireworks"
            >
          </div>

          <div
            v-if="result.movieInfo"
            class="mt-[12px] inline-flex justify-between items-center text-white/60"
          >
            <img
              class="w-[45px]"
              :src="result.movieInfo.moviePicUrl"
              referrerpolicy="no-referrer"
            >
            <div class="flex-1 text-left ml-[15px]">
              <div class="font-medium">
                《<span v-text="result.movieInfo.movieName" />》
              </div>
              <div class="text-[14px] mt-[12px]">
                豆瓣分数：<span
                  class="font-medium"
                  v-text="result.movieInfo.movieMark / 10"
                />分
              </div>
            </div>
          </div>

          <div
            v-else-if="result.recommendedContent"
            class="mt-[16px] text-white/60"
          >
            「<span v-text="result.recommendedContent" />」
          </div>
        </div>

        <div class="mt-[10px] text-center flex justify-center">
          <div
            class="flex justify-center items-center"
            @click="onShare"
          >
            <img
              class="w-[112px]"
              :src="ImageBtnShare"
            >
          </div>
          <div
            class="btn-again flex justify-center items-center flex-2 ml-[8px]"
            @click="onAgain"
          >
            <img
              class="w-[195px]"
              :src="ImageBtnAgain"
            >
          </div>
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.mood-item {
  &.checked {
    > span {
      font-size: 40px;
    }
  }
}
</style>
