<script setup lang="ts">
import {Icon} from '@iconify/vue'

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
        <Icon icon="ic:outline-bookmark-border" class="text-2xl" />
        </router-link>
        <router-link :to="{ path: '/snippets' }">
        <Icon icon="ic:outline-text-snippet" class="text-2xl"/>
        </router-link>
        <ChangeTheme></ChangeTheme>
      </div>
    </nav>
  </header>
</template>

<style lang="css">
.nav {
  grid-template-columns: auto max-content;
  padding: 2em;
}
</style>