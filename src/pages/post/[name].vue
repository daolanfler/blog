<script setup lang="ts">
import {
  computed,
  defineAsyncComponent,
  defineComponent,
  ref,
  watch,
  defineProps,
  toRefs,
} from "vue-demi";
// import { useRoute } from "vue-router";
import { formatDate } from "../../utils/datetime";
// import blogList from "../../mds/blog";

// const route = useRoute()

const props = defineProps<{ name: string }>();

const { name } = toRefs(props);

const modules = import.meta.glob("../../mds/blog/*.md");

const markdown = defineAsyncComponent(
  // () => import(`../../mds/blog/${name.value}.md`)
  modules[`../../mds/blog/${name.value}.md`]
);

const md = ref<ReturnType<typeof defineComponent>>(null);

const createDate = ref("");

// watchEffect(() => {
//   if (md.value) {
//     const date = md.value.frontmatter?.date
//     if (!date) return
//     createDate.value = formatDate(date, 'll')
//   }
// })

watch(md, (val) => {
  if (val) {
    const date = md.value.frontmatter?.date;
    if (!date) return;
    createDate.value = formatDate(date, "ll");
  }
});
</script>

<template>
  <div class="px-8">
    <h1 class="text-3xl text-center font-bold mb-8">
      {{ md?.frontmatter.title }}
    </h1>
    <p class="text-right">{{ createDate }}</p>
    <markdown ref="md" />
    {{ name }}
  </div>
</template>

<style>
h1 {
  @apply text-3xl font-bold mb-8;
}

.header-anchor {
  padding-left: 1.5ch;
  margin-left: -1.5ch;
}
.header-anchor:hover {
  text-decoration: underline;
}
.header-anchor:hover::before {
  content: "#";
  position: relative;
  float: left;
  width: 0;
  height: 0;
  left: -1.5ch;
  @apply dark:text-gray-100 text-blue-600;
}

.markdown-body {
  @apply pb-10;
}

.markdown-body h2 {
  @apply text-2xl font-bold mb-6 mt-10;
}

.markdown-body p {
  @apply my-5;
}

.markdown-body blockquote {
  opacity: 0.8;
  @apply py-2 px-4 my-6 border-l-4 border-gray-300 dark:border-gray-700;
  quotes: "\201c""\201d""\2018""\2019";
}

.markdown-body ol {
  padding-left: 1.5ch;
  list-style: decimal;
}

.markdown-body :not(h1, h2, h3, h4, h5, h6) a {
  @apply text-blue-500 dark:text-yellow-500;
  text-decoration: underline;
}
</style>
