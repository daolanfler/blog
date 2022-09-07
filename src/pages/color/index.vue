<template>
  <div class="w-full h-full">
    <div>
      <div class="mb-2">
        HEX input:
      </div>
      <textarea
        v-model="colorstr"
        type="textarea"
        placeholder="请输入 hex 颜色字符串，由空格或逗号分开"
        resize
        class="border h-40 w-full rounded text-gray-900 break-words p-2 px-4"
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
  <button
    class="h-8 bg-green-500 rounded mt-4 px-4 text-light-400"
    @click="getColorList"
  >
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

  <h2 class="mb-4 font-bold mt-4">
    计算底色 + 有透明度的颜色 => 无透明度的颜色
  </h2>
  <div>
    <div class="mb-2">
      <label class="mr-2" for="opcolor">带透明度的颜色</label>
      <input
        id="opcolor"
        v-model="taColor.opacityColor"
        class="px-2 rounded text-gray-900 border border w-[300px]"
        type="text"
        placeholder="输入带透明度的颜色"
      >
    </div>
    <div class="mb-2">
      <label class="mr-2" for="opcolor">底色</label>
      <input
        id="opcolor"
        v-model="taColor.bg"
        type="text"
        class="px-2 rounded text-gray-900 border w-[300px]"
        placeholder="输入无透明度的底色 rgba"
      >
    </div>
    <div>
      <span>结果：</span>
      <span
        :style="{ background: taResult?.[0] }"
        class="h-8 leading-8 text-center rounded w-max inline-block ml-4 px-4"
      >{{ taResult?.[0] }}</span>
      <span
        class="h-8 leading-8 text-center rounded w-max inline-block ml-4 px-4"
        :style="{ background: taResult?.[1] }"
      >{{ taResult?.[1] }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { $ref } from 'vue/macros'

const colorstr = $ref<string>('')
let colorList = $ref<string[]>([])

const getBgColor = (hexColor: string) => {
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
  const [r, g, b] = hex.match(/\w\w/g)!.map((x) => parseInt(x, 16))
  return `rgba(${r},${g},${b},${alpha})`
}

const rgbaStr = computed(() => {
  return colorList.map((item) => hex2rgba(item)).join('\n')
})

// transparency adjust color  https://stackoverflow.com/questions/15898740/how-to-convert-rgba-to-a-transparency-adjusted-hex
const taColor = reactive({
  bg: 'rbga(0,0,0,1)',
  opacityColor: '',
})

const taResult = computed(() => {
  const [r1, g1, b1, a1 = 1] = (
    taColor.opacityColor.match(/[\d\.]+/g) || []
  ).map((x) => parseFloat(x))
  console.log([r1, g1, b1, a1])
  const [r2, g2, b2, a2] = (taColor.bg.match(/[\d\.]+/g) || []).map((x) =>
    parseFloat(x)
  )
  console.log([r2, g2, b2, a2])
  const r = Math.round(r1 * a1 + r2 * (1 - a1))
  const g = Math.round(g1 * a1 + g2 * (1 - a1))
  const b = Math.round(b1 * a1 + b2 * (1 - a1))
  return [`rgb(${r}, ${g}, ${b})`, `#${toHex(r)}${toHex(g)}${toHex(b)}`]
})

const toHex = (str: number) => {
  const a = str.toString(16)
  return a.length > 1 ? a : `0${a}`
}
</script>
