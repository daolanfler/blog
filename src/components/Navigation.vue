<script setup lang="ts">
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import ChangeTheme from "./ChangeTheme.vue";

const router = useRouter();
const route = useRoute();

const isActiveRoute = (path: string): boolean =>
  router.currentRoute.value.path === path;

const showHeader = computed(() => {
  return (
    !route.fullPath.includes("lyrics") || route.fullPath.endsWith("lyrics")
  );
});
</script>

<template>
  <header v-show="showHeader" class="m-auto">
    <nav class="grid nav h-24 items-center dark:text-gray-200">
      <div class="title">
        <router-link :to="{ path: '/' }">
          天方夜坛
        </router-link>
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
  @apply dark:text-gray-400 text-gray-800 py-8 lt-md:px-6;
}

.nav span {
  @apply dark:hover:text-gray-100 hover:text-blue-500;
}
:deep() {
  svg {
    @apply dark:hover:text-gray-100 hover:text-blue-500;
  }
}

.title {
  @apply leading-8 font-semibold text-xl sm:text-3xl dark:text-gray-300;
  > a {
    @apply bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 text-transparent;
    @apply dark:(from-[rgba(234,11,251,84%)] to-[rgba(248,149,113,83%)]);
  }
}
</style>
