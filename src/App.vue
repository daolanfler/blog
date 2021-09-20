<script setup lang="ts">
import { watch } from '@vue/runtime-core';
// import HelloWorld from './components/HelloWorld.vue'
import { colors, pageTheme, setPageTheme } from './store';
import { Icon } from '@iconify/vue';
import { PageTheme } from './utils/enum';
import { codeTheme, Themes } from './store'

watch(pageTheme, v => {
  typeof document !== undefined && document.documentElement.classList.toggle('dark', v === PageTheme.Dark)
})

// watch(() => colors['--prism-scheme'],
//   v => typeof document !== undefined && document.documentElement.classList.toggle('dark', v === 'dark'),
//   {immediate: true}
// )

</script>

<template>
  <div :style="colors" class="m-8">
    <div class="flex justify-end align-middle">
      <div class="inline-flex mr-4">
        <label class="align-middle mr-2">Page theme: </label>
        <Icon
          class="text-3xl cursor-pointer align-middle"
          icon="ic:outline-dark-mode"
          v-if="pageTheme === PageTheme.Light"
          @click="setPageTheme(PageTheme.Dark)"
        />
        <Icon
          color="white"
          class="text-3xl cursor-pointer"
          icon="ic:baseline-light-mode"
          v-if="pageTheme === PageTheme.Dark"
          @click="setPageTheme(PageTheme.Light)"
        />
      </div>
      <div>
        <label class="align-middle mr-2">Code theme:</label>
        <select
          v-model="codeTheme"
          class="font-mono outline-none text-right dark:bg-gray-700 align-middle"
        >
          <option v-for="theme in Object.keys(Themes)" :key="theme">{{ theme }}</option>
        </select>
      </div>
    </div>
    <HelloWorld msg="Hello Vue 3 + TypeScript + Vite"></HelloWorld>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body {
  @apply dark:bg-gray-800 dark:text-white bg-white;
  @apply max-w-screen-md m-auto;
}
</style>
