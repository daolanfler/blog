<script setup lang="ts">
import { ref } from '@vue/runtime-core';
import { colors } from './store';
import { onClickOutside } from '@vueuse/core'

const target = ref<HTMLElement>()
onClickOutside(target, e => console.log(e))

</script>

<template>
  <header class="flex justify-end align-middle" ref="target">
    <ChangeTheme></ChangeTheme>
  </header>
  <div :style="colors" class="m-8">
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
