<template>
  <div ref="blitzRef" />
</template>

<script setup lang="ts">
import sdk from "@stackblitz/sdk";
import { onMounted, ref } from "vue";

const blitzRef = ref<HTMLElement | null>(null);

const props = defineProps<{ id: string }>();

onMounted(() => {
  sdk.embedProjectId(blitzRef.value!, props.id, {
    forceEmbedLayout: true,
    openFile: "index.js",
    height: 500,
    devToolsHeight: 50,
  });
});
</script>
