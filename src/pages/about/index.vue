<template>
  <div class="lt-md:px-6">
    <div class="flex flex-col gap-y-4 mt-4">
      <Icon icon="mdi:twitter" class="hover:text-[#1a8cd8] w-8 h-8" />
      <router-link :to="{ path: '/gallery' }" class="underline block">
        Gallery
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
a {
  width: fit-content;
}
</style>
