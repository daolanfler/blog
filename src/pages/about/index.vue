<template>
  <div class="<md:px-6">
    <p>
      <i>Has CodePen Loaded? </i>
      <code>&nbsp;{{ codePenLoaded }}</code>
    </p>

    <div class="flex flex-col gap-y-4 mt-4">
      <router-link :to="{ path: '/lyrics' }" class="underline block">
        Lyrics
      </router-link>
      <router-link :to="{ path: '/draft' }" class="underline block">
        Draft
      </router-link>
      <router-link :to="{ path: '/terms' }" class="underline block">
        Terms
      </router-link>
      <router-link :to="{ path: '/color' }" class="underline block">
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

<style scoped>
a {
  width: fit-content;
}
</style>
