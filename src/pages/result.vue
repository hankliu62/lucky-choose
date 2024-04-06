<script setup lang="ts">
/**
 * 结果页
 */
import Bg from '@/assets/images/home/bg.png'
</script>

<template>
  <NuxtLayout name="custom">
    <div
      class="result-container p-[24px_22px]"
      :style="`background-image: url(${Bg})`"
    >
      <div class="text-center text-[16px]">
        小万为你提供的选择
      </div>

      <div class="mx-auto">
        <div class=" flex justify-center items-center rounded-[12px] shadow-[0_2px_6px_rgb(0_0_0_/_4%),_0_2px_10px_rgb(0_0_0_/_8%)] mt-[24px] mx-auto w-[215px] h-[54px] bg-[#fff]">
          <span class="text-[16px]">水上乐园</span>
        </div>
      </div>

      <div class="text-center mt-[28px] text-[16px]">
        我们是有“依据”的科学选择
      </div>

      <div class="text-[16px]">
        星座运势
      </div>
    </div>
  </NuxtLayout>
</template>

