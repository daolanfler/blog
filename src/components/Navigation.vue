<script setup lang="ts">
// import { Icon } from '@iconify/vue/dist/offline'
// import bookmarkIcon from '@iconify-icons/ic/outline-bookmark-border'
// import snippetIcon from '@iconify-icons/ic/outline-text-snippet'

const router = useRouter()

const isActiveRoute = (path: string) => router.currentRoute.value.path === path

</script>

<template>
  <header class="m-auto">
    <nav class="grid nav h-24 items-center dark:text-gray-200 ">
      <div class="leading-8 font-bold text-xl">
        <router-link :to="{ path: '/' }">
          天方夜坛
        </router-link>
      </div>
      <div class="grid grid-flow-col gap-x-5 items-center">
        <router-link :to="{ path: '/' }">
          <span class="font-bold" :class="{'active-route': isActiveRoute('/')}">Blog</span>
        </router-link>
        <router-link :to="{ path: '/snippets' }">
          <span class="font-bold" :class="{'active-route': isActiveRoute('/snippets')}">Snippets</span>
        </router-link>
        <router-link :to="{ path: '/til' }">
          <span class="font-bold" :class="{'active-route': isActiveRoute('/til')}">TIL</span>
        </router-link>
        <ChangeTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped>
.active-route {
  @apply underline;
}
</style>
