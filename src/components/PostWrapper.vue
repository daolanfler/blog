<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { formatDate } from '../utils/datetime'

// eslint-disable-next-line vue/no-setup-props-destructure
const { frontmatter } = defineProps<{ frontmatter: any }>()

const createDate = formatDate(frontmatter.date, 'll')
if (isClient) {
  const navigate = () => {
    if (location.hash) {
      document
        .querySelector(decodeURIComponent(location.hash))
        ?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  onMounted(() => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault()
        const href = anchor.getAttribute('href') as string
        history.replaceState({}, '', href)
        navigate()
      })
    })
    navigate()
    setTimeout(navigate, 500)
  })
}
</script>

<template>
  <div class="px-8">
    <h1 class="text-3xl text-center font-bold mb-8">
      {{ frontmatter.title }}
    </h1>
    <p class="text-right">
      {{ createDate }}
    </p>
    <slot />
  </div>
</template>
