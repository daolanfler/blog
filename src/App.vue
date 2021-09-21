<script setup lang="ts">
import { colors } from './store';


</script>

<template>
  <Navigation/>
  <main :style="colors " class=" max-w-screen-md m-auto py-10">
    <router-view></router-view>
  </main>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
}

body {
  @apply dark:bg-gray-800 dark:text-white bg-white;
  @apply  m-auto antialiased;
}
</style>
