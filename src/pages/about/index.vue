<template>
  <div class="h-[calc(100vh-16em)] flex flex-col justify-center items-center">
    <div class="flex items-center space-x-6 flex-wrap">
      <span class="site-link" @click="jumpTo('twitter')">
        <Icon icon="mdi:twitter" class="text-[#1a8cd8] w-12 h-12" />
        <span class="font-mono text-[12px]">Twitter</span>
      </span>
      <span class="site-link" @click="jumpTo('github')">
        <Icon icon="mdi:github" class="w-12 h-12" />
        <span class="font-mono text-[12px]">GitHub</span>
      </span>
      <span class="site-link" @click="jumpTo('onlyfans')">
        <!-- <img
          src="../../assets/icons/512px-OnlyFans_Logo.svg.png"
          class="h-12"
          alt="onlyfans icon"
        > -->
        <Icon icon="tabler:brand-onlyfans" class="text-[#1a8cd8] w-12 h-12" />
        <span class="self-start font-mono text-[12px]">OnlyFans</span>
      </span>
    </div>
    <div
      class="mt-8 text-3xl text-gray-400 dark:hover:text-white hover:(text-blue underline)"
    >
      <router-link :to="{ path: '/gallery' }" class="font-mono">
        Others
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO  spotify now playing
// lint staged
function jumpTo(place: string) {
  switch (place) {
    case "twitter":
      window.location.href = "https://twitter.com/daolanfler";
      break;
    case "github":
      window.location.href = "https://github.com/daolanfler";
      break;
    case "onlyfans":
      window.location.href = "https://www.bilibili.com/video/BV1GJ411x7h7";
      break;
    default:
      break;
  }
}
</script>

<style scoped lang="postcss">
.site-link {
  @apply cursor-pointer flex flex-col items-center;
  &:hover {
    span {
      @apply text-blue dark:text-white;
    }
  }
  span {
    @apply mt-2 text-gray-400;
  }
}
</style>
