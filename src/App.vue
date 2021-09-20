<script setup lang="ts">
import { watch } from '@vue/runtime-core';
// import HelloWorld from './components/HelloWorld.vue'
import { colors } from './store';

// watch(() => colors['--prism-scheme'],
//   v => typeof document !== undefined && document.documentElement.classList.toggle('dark', v === 'dark'),
//   {immediate: true}
// )

</script>

<template>
<div :style="colors" class="m-8">

  <div class="dark:bg-gray-800 bg-white">
    Page Theme: 
    Light Or Dark
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
/* .random {
  @apply dark:bg-gray-800 bg-white;
} */
</style>
