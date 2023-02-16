<template>
  <div>
    <ul >
      <li class="hover:underline mb-2" v-for="(item, index) in subpages" :key="index">
        <router-link :to="`${route.path}/${item.path}`">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const subpages = [
  {
    name: "歌词",
    path: "lyrics",
  },
  {
    name: "乱七八糟",
    path: "whatever",
  },
  {
    name: "颜色转换",
    path: "color",
  },
  {
    name: "术语/缩写解释",
    path: "terms",
  },
  {
    name: 'UI Challenge',
    path: 'challenges'
  }
];
const route = useRoute();
</script>

<style scoped></style>
