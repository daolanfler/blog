<script setup lang="ts">
import { Icon } from '@iconify/vue';
import { useRoute, useRouter } from 'vue-router';
import { isDark, toggleDark } from '../store';

const router  = useRouter()

</script>

<template>
  <div class="inline-flex">
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