<script setup lang="ts">
import { computed } from 'vue';
import { useRouter } from 'vue-router';
import { isDev } from '../utils/common';
import { formatPostDate } from '../utils/datetime'

const router = useRouter()
const routes = router
  .getRoutes()
  .filter((i) => {
    if (isDev()) {
      return i.path.startsWith('/post') && i.meta.frontmatter.date
    } else {
      return /^\/post(?!\/draft)/.test(i.path) && i.meta.frontmatter.date
    }
  })
  .sort(
    (a, b) =>
      +new Date(b.meta.frontmatter.date) - +new Date(a.meta.frontmatter.date)
  )

const posts = computed(() => routes.filter((i) => i))
</script>

<template>
  <div class="lt-md:px-6">
    <div v-for="item in posts" :key="item.path" class="mb-4">
      <h1 class="blog-title">
        <router-link
          class="text-lg"
          :to="{
            path: `${item.path}`,
          }"
        >
          {{ item.meta.frontmatter.title }}
        </router-link>
      </h1>
      <time
        class="text-gray-400 mt-2 inline-block text-sm font-sans"
        :datetime="formatPostDate(item.meta.frontmatter.date)"
      >
        {{ formatPostDate(item.meta.frontmatter.date) }}
      </time>
    </div>
  </div>
</template>
