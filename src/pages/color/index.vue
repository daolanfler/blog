<template>
  <div class="w-full h-full">
    <textarea v-model="colorstr" type="textarea" placeholder="请输入 hex 颜色字符串，由空格或逗号分开" resize class=" h-40 w-full rounded-md text-gray-900 break-words" />
  </div>
  <button class="h-8 bg-green-500 rounded mt-4 px-4" @click="getColorList">
    generate
  </button>
  <div class="w-full grid grid-cols-8 gap-4 mt-4 ">
    <div v-for="(color, index) in colorList" :key="index" :style="{backgroundColor: color}" class="h-6" /> 
  </div>
</template>


<script setup lang="ts">
import { $ref } from 'vue/macros';

const colorstr = $ref<string>("")
let colorList = $ref<string[]>([])

const getColorList = () => {
  colorList = colorstr.split(/[,\r\n\s]/).map(str => {
    const a = str.trim();
    return a.replace(/\"?(.*)\"?/, "$1");
  }).filter(a => a)
}
</script>
