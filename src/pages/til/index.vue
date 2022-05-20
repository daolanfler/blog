<template>
  <div class="p-8 font-mono">
    <p>TIL: Today I learned</p>
    <p>Has CodePen Loaded? <span class="code">{{ codePenLoaded }}</span></p>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFlagStore } from '../../store/pinia';

const { codePenLoaded } = storeToRefs(useFlagStore())

</script>
