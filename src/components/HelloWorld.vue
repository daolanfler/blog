<script setup lang="ts">
import {  ref } from 'vue'
import {VueComponent as TestMarkdown } from '../mds/test.md'

defineProps<{ msg: string }>()

</script>

<template>

  <TestMarkdown />

</template>

<style scoped>

</style>
