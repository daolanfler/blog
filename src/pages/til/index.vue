<template>
  <h2>Today I learned</h2>
  <div>Has CodePen Loaded? {{ codePenLoaded }} </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useFlagStore } from '../../store/pinia';

const { codePenLoaded } = storeToRefs(useFlagStore())

</script>
