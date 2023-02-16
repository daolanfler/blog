<template>
  <div>
    <router-link v-for="(item, index) in subpages" :key="index" :to="item.path">
      {{ item.name }}
    </router-link>
  </div>
</template>

<script lang="ts" setup>
const subpages = [
  {
    name: "Lyrics",
    path: "/lyrics",
  },
];
</script>

<style scoped></style>
