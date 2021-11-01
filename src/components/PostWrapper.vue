<script setup lang="ts">
import { isClient } from '@vueuse/core'
import { formatPostDate } from '../utils/datetime'

// eslint-disable-next-line vue/no-setup-props-destructure
const { frontmatter } = defineProps<{ frontmatter: any }>()

const createDate = formatPostDate(frontmatter.date, 'YYYY-MM-DD HH:mm')

let updateDate = ''

if (frontmatter.updateDate) {
  updateDate = formatPostDate(frontmatter.updateDate, 'YYYY-MM-DD HH:mm')
}

const route = useRoute()

// set document's title
useHead({
  title: `天方夜坛 - ${frontmatter.title}`,
})

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
    <template v-if="route.path.startsWith('/post')">
      <h1 class="text-3xl text-center font-bold mb-8">
        {{ frontmatter.title }}
      </h1>
      <p class="text-right italic">
        created at {{ createDate }}
      </p>
    </template>
    <slot />

    <p v-if="updateDate" class="text-right italic">
      updated at {{ updateDate }}
    </p>
  </div>
</template>
