<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline.js'
import iconDark from '@iconify-icons/ic/outline-dark-mode.js'
import iconLight from '@iconify-icons/ic/outline-light-mode.js'
import { isDark, toggleDark } from '../store'

</script>

<template>
  <div class="inline-flex">
    <Icon
      v-if="isDark"
      class="text-2xl cursor-pointer"
      :icon="iconDark"
      @click="toggleDark()"
    />
    <Icon
      v-else
      class="text-2xl cursor-pointer"
      :icon="iconLight"
      @click="toggleDark()"
    />
  </div>
</template>
