<template>
  <ul>
    <li v-for="(item, index) in list" :key="index" class="hover:underline mb-4">
      <router-link :to="`${route.path}/${item.path}`">
        {{ item.name }}
      </router-link>
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { useRoute } from "vue-router";

const route = useRoute();
const list = [
  {
    name: "文字渐变",
    path: "01",
  },
  {
    name: "渐变色边框",
    path: "02",
  },
  {
    name: "循环滚动",
    path: "03",
  },
  {
    name: "虚线边框",
    path: "04",
  },
  {
    name: "SCSS Palyground",
    path: "05",
  },
  {
    name: "fabric js dash 流动动画",
    path: "06",
  },
  {
    name: "canvas 画布",
    path: "07",
  },
];
</script>

<style lang="postcss" scoped></style>
