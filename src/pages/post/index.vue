<script setup lang="ts">

import { computed, defineAsyncComponent } from "vue-demi";
import { useRoute } from "vue-router";
import blogList from "../../mds/blog";
const route = useRoute()

const markdown = defineAsyncComponent(() => import(`../../mds/blog/${route.params.name}.md`))

const id = computed(() => route.params.name)

const blog = blogList.find(item => item.path === id.value)

</script>

<template>
    <div>
        <h1 class="text-3xl font-bold mb-8">{{ blog?.title }}</h1>
        <markdown />
    </div>
</template>

<style>
</style>