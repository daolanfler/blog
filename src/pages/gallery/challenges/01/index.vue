<template>
  <div class="demo-wrapper">
    <div ref="textRef" class="text m-auto text-5xl">
      May you stay forever young
    </div>
    <div v-if="colorList.length" class="text-base mt-8">
      <div class="w-full flex flex-col justify-center gap-4">
        <div class="flex justify-center gap-x-16">
          <div>
            <div class="mb-2">
              开始
            </div>
            <ColorPicker
              :theme="theme"
              :color="colorList[0]"
              @change-color="changeStartColor"
            />
          </div>
          <div>
            <div class="mb-2">
              结束
            </div>
            <ColorPicker
              :theme="theme"
              :color="colorList[1]"
              @change-color="changeEndColor"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4">
      <button class="btn" @click="toggleTheme">
        切换{{ theme ==='light' ? '暗色' : '亮色' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ColorPicker } from "vue-color-kit";
import { onMounted, reactive, ref, watch } from "vue";
import "vue-color-kit/dist/vue-color-kit.css";
import { storeToRefs } from "pinia";
import { useAppStateStore } from "@/store/pinia";

const appStore = useAppStateStore();

const { theme } = storeToRefs(appStore);

const colorList = reactive<string[]>([]);
const textRef = ref<HTMLElement>();

function changeStartColor(color: any) {
  const { r, g, b, a } = color.rgba;
  colorList[0] = `rgba(${r}, ${g}, ${b}, ${a})`;
}

function changeEndColor(color: any) {
  const { r, g, b, a } = color.rgba;
  colorList[1] = `rgba(${r}, ${g}, ${b}, ${a})`;
}

watch(colorList, newVal => {
  textRef.value!.style.setProperty("--un-gradient-from", newVal[0]);
  textRef.value!.style.setProperty("--un-gradient-to", newVal[1]);
});

function toggleTheme() {
  appStore.toggleTheme();
}

onMounted(() => {
  const textStyle = getComputedStyle(textRef.value!);
  const fromColor = textStyle.getPropertyValue("--un-gradient-from");
  const toColor = textStyle.getPropertyValue("--un-gradient-to");

  colorList[0] = fromColor;
  colorList[1] = toColor;
});

</script>

<style lang="postcss" scoped>
.demo-wrapper {
  .text {
    @apply bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent;
    @apply dark:(from-[rgba(234,11,251,0.84)] to-[rgba(248,149,113,0.83)]);
    line-height: 2;
  }
  text-align: center;
  font-style: italic;
}
:deep(.hu-color-picker) {
  width: 218px !important;
}
</style>
