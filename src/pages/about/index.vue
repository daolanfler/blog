<template>
  <div class="lt-md:px-6">
    <div class="flex flex-col space-y-4 items-start">
      <span class="site-link" @click="jumpTo('twitter')">
        <Icon icon="mdi:twitter" class="text-[#1a8cd8] w-8 h-8" />
        <span class="font-mono text-[12px]">Twitter</span>
      </span>
      <span class="site-link" @click="jumpTo('github')">
        <Icon icon="mdi:github" class="w-8 h-8" />
        <span class="font-mono text-[12px]">GitHub</span>
      </span>
      <span class="site-link" @click="jumpTo('onlyfans')">
        <img
          src="../../assets/icons/512px-OnlyFans_Logo.svg.png"
          class="h-8"
          alt="onlyfans icon"
        >
        <span class="self-start font-mono text-[12px]">OnlyFans</span>
      </span>
    </div>
    <div class="mt-8">
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
