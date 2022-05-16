<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline.js'
import heartIcon from '@iconify-icons/el/heart.js'
</script>

<template>
  <footer class="py-5 h-16">
    <div class="copyright flex items-center justify-center ">
      <span class="dark:text-gray-300">&copy; 2022</span>&nbsp;<Icon :icon="heartIcon" class="text-red-600" />
      &nbsp;<span>daolanfler</span>
    </div>
  </footer>
</template>

<style>
</style>
