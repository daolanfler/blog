<script setup lang="ts">
import Test from '../mds/test.md'

</script>

<template>

  <Test />
</template>

<style>
.header-anchor {
  padding-left: 1.5ch;
  margin-left: -1.5ch;
}
.header-anchor:hover {
  text-decoration: underline;
}
.header-anchor:hover::before {
  content: '#';
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
  @apply mb-5;
}

.markdown-body blockquote {
  opacity: .8;
  @apply py-2 px-4 my-6 border-l-4 border-gray-300 dark:border-gray-700;
  quotes: "\201c""\201d""\2018""\2019";
}

.markdown-body ol {
  padding-left: 1.5ch;
  list-style: decimal;
}

.markdown-body :not(h2,h3,h4,h5,h6) a {
  @apply text-blue-500 dark:text-yellow-500;
  text-decoration: underline;
}
</style>
