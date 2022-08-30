<template>
  <div class="w-full h-full ">
    <div>
      <div class="mb-2">
        HEX input:
      </div>
      <textarea
        v-model="colorstr"
        type="textarea"
        placeholder="请输入 hex 颜色字符串，由空格或逗号分开"
        resize
        class=" border h-40 w-full rounded text-gray-900 break-words p-2 px-4"
      />
    </div>
    <div class="mt-4">
      <div class="mb-2">
        RGBA output:
      </div>
      <textarea
        v-model="rgbaStr"
        type="textarea"
        resize
        class="border h-40 w-full rounded text-gray-900 break-words p-2 px-4"
      />
    </div>
  </div>
  <button class="h-8 bg-green-500 rounded mt-4 px-4 text-light-400" @click="getColorList">
    generate
  </button>
  <div class="w-full grid grid-cols-8 gap-4 mt-4">
    <div
      v-for="(color, index) in colorList"
      :key="index"
      :style="{ color: color, background: getBgColor(colorList[index]) }"
      class="h-8 leading-8 text-center rounded"
    >
      {{ colorList[index] }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { $ref } from 'vue/macros'

const colorstr = $ref<string>('')
let colorList = $ref<string[]>([])

const getBgColor = (hexColor:string) => {
  return hex2rgba(hexColor, 0.1)
}

const getColorList = () => {
  colorList = colorstr
    .split(/[,\r\n\s]/)
    .map((str) => {
      const a = str.trim()
      return a.replace(/\"?(.*)\"?/, '$1')
    })
    .filter((a) => a)
}

const hex2rgba = (hex: string, alpha = 1) => {
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16));
  return `rgba(${r},${g},${b},${alpha})`;
};

const rgbaStr = computed(() => {
  return colorList.map(item => hex2rgba(item)).join('\n')
})
</script>
