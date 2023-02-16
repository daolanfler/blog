<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { isDark, toggleDark } from '../store'
</script>

<template>
  <div class="inline-flex">
    <Icon
      v-if="isDark"
      class="text-2xl cursor-pointer"
      icon="ic:outline-dark-mode"
      @click="toggleDark()"
    />
    <Icon
      v-else
      class="text-2xl cursor-pointer"
      icon="ic:outline-light-mode"
      @click="toggleDark()"
    />
  </div>
</template>
