<template>
  <ColorModeScript />
  <Navigation />
  <main
    class="m-auto py-8 lt-md:px-6"
    :style="{
      minHeight: hideHeader ? 'calc(100vh - 4em)' : 'calc(100vh - 10em)',
    }"
  >
    <router-view />
  </main>
  <Footer />
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ColorModeScript } from "./components/ColorModeScript";
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
import { useAppStateStore } from "./store/pinia";
// TODO 看看也没有什么办法，只在服务端设置 ColorMode inline-script, maybe server-side components?
// import crypto from "crypto";

// // 全局的 表明这是我自己的 inline-script
// const nonce = crypto.randomBytes(16).toString("base64");

const appState = useAppStateStore();
const { hideHeader } = storeToRefs(appState);

</script>
