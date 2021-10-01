<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline'
import iconDark from '@iconify-icons/ic/outline-dark-mode'
import iconLight from '@iconify-icons/ic/outline-light-mode'
import { isDark, toggleDark } from '../store'

</script>

<template>
  <div class="inline-flex">
    <Icon
      v-if="isDark"
      class="text-2xl cursor-pointer align-middle"
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
