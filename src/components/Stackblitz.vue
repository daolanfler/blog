<template>
  <div ref="blitzRef" />
</template>

<script setup lang="ts">
import sdk from '@stackblitz/sdk'
import {$ref} from 'vue/macros'

const blitzRef = $ref<HTMLElement>()

const props = defineProps<{id: string}>()

onMounted(() => {
  sdk.embedProjectId(blitzRef, props.id, {
    forceEmbedLayout: true,
    openFile: 'index.js',
    height: 500,
    devToolsHeight: 50
  })
})
</script>
