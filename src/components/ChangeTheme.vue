<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline';
import { isDark, toggleDark } from '../store';
import iconDark from '@iconify-icons/ic/outline-dark-mode'
import iconLight from '@iconify-icons/ic/outline-light-mode'


</script>

<template>
  <div class="inline-flex">
    <Icon
      class="text-2xl cursor-pointer align-middle"
      :icon="iconDark"
      v-if="isDark"
      @click="toggleDark()"
    />
    <Icon
      class="text-2xl cursor-pointer"
      :icon="iconLight"
      v-else
      @click="toggleDark()"
    />

  </div>
  
</template>