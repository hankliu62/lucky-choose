<script setup lang="ts">
/**
 * 首页
 */
import { defineComponent } from 'vue'

import ImageQuestion1 from '@/assets/images/guide/question1.png'
import ImageQuestion2 from '@/assets/images/guide/question2.png'
import ImageQuestion3 from '@/assets/images/guide/question3.png'
import ImageTeShiWu from '@/assets/images/guide/teshiwu.png'
import ImageGo from '@/assets/images/guide/go.png'
import Bg from '@/assets/images/home/bg.png'

defineComponent({
  components: {
  }
})

const questions: any = [
  {
    value: 'CEO和CTO意见不统一，该听谁的？',
    image: ImageQuestion1
  },
  {
    value: '领导让我参加公司马拉松，到底参加不参加？',
    image: ImageQuestion2
  },
  {
    value: '女友和妈妈落水先救谁？',
    image: ImageQuestion3
  }
]
</script>

<template>
  <NuxtLayout name="custom">
    <div
      class="min-h-full bg-no-repeat bg-cover flex justify-center items-center"
      :style="`background-image: url(${Bg})`"
    >
      <div class="pt-82px pb-[30px]">
        <a-carousel
          autoplay
          :dots="false"
          class="w-[305px] h-[285px] !mx-auto"
        >
          <div
            v-for="({ value, image }) in questions"
            :key="image || value"
          >
            <div class=" flex justify-center items-center w-[305px] h-[283px]">
              <img
                class="w-full h-full object-cover"
                :src="image"
              >
            </div>
          </div>
        </a-carousel>

        <div class="mt-58px text-center">
          <img
            class="mx-auto h-[130px] pl-[25px]"
            :src="ImageTeShiWu"
          >
        </div>

        <div class="py-[38px]">
          <img
            class="w-[76px] mx-auto cursor-pointer"
            :src="ImageGo"
            @click="$router.push(`/home`)"
          >
        </div>
      </div>
    </div>
  </NuxtLayout>
</template>
