<template>
  <div class="p-8 font-mono">
    <p>TIL: Today I learned</p>
    <p>Has CodePen Loaded? <span class="code">{{ codePenLoaded }}</span></p>

    <div class="mt-6">
      <router-link :to="{path: '/lyrics'}" class="underline block">
        Lyrics
      </router-link>
      <router-link :to="{path: '/bookmarks'}" class="underline block">
        Bookmarks
      </router-link>
      <router-link :to="{path: '/terms'}" class="underline block">
        Terms
      </router-link>
      <router-link :to="{path: '/color'}" class="underline block">
        Color
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFlagStore } from '../../store/pinia';

const { codePenLoaded } = storeToRefs(useFlagStore())

</script>
