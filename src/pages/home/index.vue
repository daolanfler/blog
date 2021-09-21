<script setup lang="ts">
import dayjs from 'dayjs';
import { reactive } from 'vue-demi';
import blogList from '../../mds/blog/'

const list = reactive(blogList)
list.sort((a, b) => dayjs(b.date).valueOf() - dayjs(a.date).valueOf())

</script>

<template>
  <div class="pl-16">
    <div v-for="item in list" :key="item.path" class="mb-4">
      <router-link class="text-lg" :to="{
        path: `/post/${item.path}`
      }">
        <span class="blog-title">{{ item.title }}</span>
      </router-link>
      <div class="text-gray-400 mt-2 text-sm">{{ item.date }}</div>
    </div>
  </div>
</template>

<style scoped>
.blog-title {
  @apply text-lg font-semibold hover:underline text-gray-700 hover:text-black;
  @apply dark:text-gray-300 dark:hover:text-white;
}
</style>