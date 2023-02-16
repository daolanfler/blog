<script setup lang="ts">
import { useRouter } from "vue-router";
import ChangeTheme from "./ChangeTheme.vue";

const router = useRouter();

const isActiveRoute = (path: string): boolean =>
  router.currentRoute.value.path === path;
</script>

<template>
  <header class="m-auto">
    <nav class="grid nav h-24 items-center dark:text-gray-200">
      <div class="title">
        <router-link :to="{ path: '/' }">天方夜坛</router-link>
      </div>
      <div class="grid grid-flow-col gap-x-5 items-center">
        <router-link :to="{ path: '/' }">
          <span
            class="font-bold"
            :class="{ 'active-route': isActiveRoute('/') }"
          >
            Blog
          </span>
        </router-link>
        <router-link :to="{ path: '/snippets' }">
          <span
            class="font-bold"
            :class="{ 'active-route': isActiveRoute('/snippets') }"
          >
            Snippets
          </span>
        </router-link>
        <router-link :to="{ path: '/about' }">
          <span
            class="font-bold"
            :class="{ 'active-route': isActiveRoute('/about') }"
          >
            About
          </span>
        </router-link>
        <ChangeTheme />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="postcss">
.active-route {
  @apply underline;
}

.nav {
  grid-template-columns: auto max-content;
  @apply dark: text-gray-400 text-gray-800 py-8 lt-md:px-6;
}

:deep() {
  .nav span,
  svg {
    @apply dark: hover:text-gray-100 hover:text-blue-500;
  }
}

.title {
  @apply leading-8 font-semibold text-xl sm: text-3xl dark:text-gray-300;
}
</style>
