<script setup lang="ts">
import dayjs from 'dayjs'
import { formatDate } from '../utils/datetime'

const router = useRouter()
const routes = router
  .getRoutes()
  .filter(i => i.path.startsWith('/post') && i.meta.frontmatter.date)
  .sort((a, b) => +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date))

const posts = computed(() => routes.filter(i => i))
</script>

<template>
  <div class="pl-16">
    <div v-for="item in posts" :key="item.path" class="mb-4">
      <router-link
        class="text-lg"
        :to="{
          path: `${item.path}`,
        }"
      >
        <span class="blog-title">{{ item.meta.frontmatter.title }}</span>
      </router-link>
      <div class="text-gray-400 mt-2 text-sm">
        {{ formatDate(item.meta.frontmatter.date) }}
      </div>
    </div>
  </div>
</template>
