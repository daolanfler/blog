<script setup lang="ts">
import Footer from "./components/Footer.vue";
import Navigation from "./components/Navigation.vue";
</script>

<template>
  <Navigation />
  <main class="m-auto py-8 lt-md:px-6">
    <router-view />
  </main>
  <Footer />
</template>
