<script setup lang="ts">
import Test from '../mds/test.md'
import { theme, Themes } from '../store'

defineProps<{ msg: string }>()

</script>

<template>
  <div>
    <label > code theme </label>
    <select v-model="theme" class="font-mono mr-5 outline-none text-right">
      <option v-for="theme in Object.keys(Themes)" :key="theme">{{ theme }}</option>
    </select>
  </div>
  <Test />
</template>

<style scoped>
</style>
