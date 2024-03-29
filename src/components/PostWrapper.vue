<script setup lang="ts">
import { useHead } from "@vueuse/head";
import { isClient } from "@vueuse/core";
import { computed, onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { formatPostDate } from "../utils/datetime";
import { FrontMatter } from "../utils/types";

// eslint-disable-next-line vue/no-setup-props-destructure
const { frontmatter } = defineProps<{ frontmatter: FrontMatter }>();

const createDate = formatPostDate(frontmatter.date, "YYYY-MM-DD HH:mm");

let updateDate = "";

if (frontmatter.updateDate) {
  updateDate = formatPostDate(frontmatter.updateDate, "YYYY-MM-DD HH:mm");
}

const route = useRoute();
const postBody = ref<HTMLElement>();

const pageTitle = computed(() => {
  if (route.path.startsWith("/post") || route.path.startsWith("/snippets")) {
    return `天方夜坛 - ${frontmatter.title}`;
  }
  return "天方夜坛";
});
// set document's title
useHead({
  title: pageTitle,
});

if (isClient) {
  let imageList = ref<string[]>([]);

  const handleDocumentClick = (e: Event) => {
    const target = e.target as HTMLImageElement;
    if (!imageList.value.length) {
      const list = Array.from(document.querySelectorAll("img")).map(
        item => item.src
      );
      imageList.value = [...list];
    }
    if (target.tagName.toLowerCase() === "img") {
      if (target.src && postBody.value?.contains(target)) {
        const index = imageList.value.indexOf(target.src);
        if (index > -1) {
          location.href = target.src;
        }
      }
    }
  };
  const navigate = () => {
    if (location.hash) {
      document
        .getElementById(location.hash.slice(1))
        ?.scrollIntoView({ behavior: "smooth" });
    }
  };

  onMounted(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener("click", e => {
        e.preventDefault();
        const href = anchor.getAttribute("href") as string;
        history.replaceState({}, "", href);
        navigate();
      });
    });
    navigate();
    setTimeout(navigate, 500);

    document.addEventListener("click", handleDocumentClick, {
      capture: false,
    });
  });

  onUnmounted(() => {
    document.removeEventListener("click", handleDocumentClick);
  });
}
</script>

<template>
  <div
    ref="postBody"
    :class="{ lyrics: frontmatter.type === 'lyrics' }"
  >
    <template v-if="route.path.startsWith('/post')">
      <h1
        class="text-2xl text-center font-bold mb-8 dark:text-gray-200 text-dark-100"
      >
        {{ frontmatter.title }}
      </h1>
      <p class="text-right italic">
        created at {{ createDate }}
      </p>
    </template>
    <slot />

    <p v-if="updateDate" class="text-right italic">
      updated at {{ updateDate }}
    </p>
  </div>
</template>

<style>
.lyrics {
  @apply text-lg;
}
</style>
