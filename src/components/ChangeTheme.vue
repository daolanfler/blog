<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { isDark, toggleDark } from '../store';

</script>

<template>
  <div class="inline-flex mr-4">
    <Icon
      class="text-2xl cursor-pointer align-middle"
      icon="ic:outline-dark-mode"
      v-if="isDark"
      @click="toggleDark()"
    />
    <Icon
      class="text-2xl cursor-pointer"
      icon="ic:outline-light-mode"
      v-else
      @click="toggleDark()"
    />
  </div>
</template>