<script setup lang="ts">
import { Icon } from '@iconify/vue/dist/offline'
import bookmarkIcon from '@iconify-icons/ic/outline-bookmark-border'
import snippetIcon from '@iconify-icons/ic/outline-text-snippet'

</script>
<template>
  <header>
    <nav class="grid nav">
      <div></div>
      <div class="grid grid-flow-col gap-x-5">
        <router-link :to="{ path: '/'}">
          <span class="font-bold ">Blog</span>
        </router-link>
        <router-link :to="{ path: '/bookmarks' }">
          <Icon :icon="bookmarkIcon" class="text-2xl" />
        </router-link>
        <router-link :to="{ path: '/snippets' }">
          <Icon :icon="snippetIcon" class="text-2xl" />
        </router-link>
        <ChangeTheme></ChangeTheme>
      </div>
    </nav>
  </header>
</template>
