<script setup lang="ts">
import { reactive } from 'vue-demi';
import blogList from '../../mds/blog/'

const list = reactive(blogList)

</script>

<template>
  <div>
    <div v-for="item in list" :key="item.path">
      <router-link class="text-lg" :to="{
        path: `/post/${item.path}`
      }">{{ item.title }}</router-link>
      <div>
        {{item.date}}
      </div>
    </div>
  </div>
</template>