<template>
  <div class="dark:text-gray-300">
    <div class="mb-6">
      <p class="text-lg font-bold mb-2">Whoami ?</p>
      <p>A wanderer by trade, a fontend developer</p>
      <p>Randomly using mac/linux/window and feels all ok</p>
      <p>Recently been learning rust (wish me good luck)</p>
      <p>Enthusiast of rock'n'roll, folk & metal music</p>
      <p>Insisting freedom of speech and liberalisum</p>
      <p>Will be in many corners of this planet</p>
    </div>
    <div class="mb-6">
      <p class="text-lg font-bold mb-2">Things that make life easier</p>
      <ul>
        <li>Vue3 + Vite</li>
        <li>Leaflet</li>
        <li>Rxjs</li>
        <li>D3</li>
        <li>WSL2 on windows</li>
        <li>VS Code + Vim extension</li>
      </ul>
    </div>
    <div class="mb-6">
      <p class="text-lg font-bold mb-2">Demo & Others</p>
      <span class="inline-block hover:underline">
        <router-link
          :to="{ path: '/gallery' }"
          class="dark:hover:text-white hover:text-blue"
        >
          visit here {{ ">>" }}
        </router-link>
      </span>
    </div>

    <div>
      <p class="text-lg font-bold mb-2">Find me here</p>
      <div class="flex items-center space-x-6 flex-wrap">
        <a href="mailto:daolanfler@gmail.com">
          <span class="site-link">
            <Icon icon="logos:google-gmail" class="text-[#1a8cd8] w-8 h-8" />
            <span class="font-mono text-[12px]">Gmail</span>
          </span>
        </a>
        <a href="https://twitter.com/daolanfler">
          <span class="site-link">
            <Icon icon="mdi:twitter" class="text-[#1a8cd8] w-8 h-8" />
            <span class="font-mono text-[12px]">Twitter</span>
          </span>
        </a>
        <a href="https://github.com/daolanfler">
          <span class="site-link">
            <Icon icon="mdi:github" class="w-8 h-8" />
            <span class="font-mono text-[12px]">GitHub</span>
          </span>
        </a>
        <a href="https://discord.gg/ukNc3UJZxE">
          <span class="site-link">
            <Icon icon="ic:baseline-discord" class="w-8 h-8" />
            <span class="self-start font-mono text-[12px]">Discord</span>
          </span>
        </a>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// TODO  spotify now playing
// lint staged
function jumpTo(place: string) {
  switch (place) {
    // case "gmail":
    //   window.open("mailto:daolanfler\+blog@gmail.com");
    //   break;
    case "twitter":
      window.location.href = "https://twitter.com/daolanfler";
      break;
    case "github":
      window.location.href = "https://github.com/daolanfler";
      break;
    case "discord":
      window.location.href = "https://discord.gg/ukNc3UJZxE";
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
