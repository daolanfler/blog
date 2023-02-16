<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onMounted, toRefs } from "vue";
import { useAppStateStore } from "../store/pinia";

interface Props {
  userName?: string;
  slug: string;
  height?: string;
  editable?: boolean;
  defaultTab?: string;
}

const props = withDefaults(defineProps<Props>(), {
  defaultTab: "css,result",
  editable: false,
  userName: "daolanfler",
  height: "300",
});
const { defaultTab, editable, height, slug, userName } = toRefs(props);

const { codePenLoaded } = storeToRefs(useAppStateStore());

onMounted(() => {
  // 确保只引入一次
  if (codePenLoaded.value) {
    // @ts-expect-error codepen 脚本方法 https://blog.codepen.io/documentation/embedded-pens/#delayed-embeds-6
    window.__CPEmbed && window.__CPEmbed();
    return;
  }
  // is this going to work and change the pinia store state ?
  codePenLoaded.value = true;
  const s = document.createElement("script");
  s.src = "https://cpwebassets.codepen.io/assets/embed/ei.js";
  s.async = true;
  document.body.appendChild(s);
});
</script>

<template>
  <p
    class="codepen"
    :data-height="height"
    :data-default-tab="defaultTab"
    :data-slug-hash="slug"
    :data-editable="editable"
    :data-user="userName"
    style="
      height: 300px;
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 2px solid;
      margin: 1em 0;
      padding: 1em;
    "
  >
    <span>
      See the Pen
      <a :href="`https://codepen.io/${userName}/pen/${slug}`">
        overflow-hidden-with-absolute-position-1
      </a>
      by {{ userName }} (
      <a :href="`https://codepen.io/${userName}`">@{{ userName }}</a>
      ) on
      <a href="https://codepen.io">CodePen</a>
      .
    </span>
  </p>
</template>
