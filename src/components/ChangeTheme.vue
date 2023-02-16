<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline.js'
import Dark from '@iconify-icons/ic/outline-dark-mode.js'
import Light from '@iconify-icons/ic/outline-light-mode.js'
import { isDark, toggleDark } from '../store'

</script>

<template>
  <div class="inline-flex">
    <Icon
      v-if="isDark"
      class="text-2xl cursor-pointer"
      :icon="Dark"
      @click="toggleDark()"
    />
    <Icon
      v-else
      class="text-2xl cursor-pointer"
      :icon="Light"
      @click="toggleDark()"
    />
  </div>
</template>
