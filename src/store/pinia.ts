import { defineStore } from "pinia";
import { useRoute } from "vue-router";

export const useAppStateStore = defineStore("appState", {
  state: () => {
    return {
      codePenLoaded: false,
    };
  },
  getters: {
    hideHeader() {
      const route = useRoute();
      if (
        route.fullPath.includes("lyrics") &&
        !route.fullPath.endsWith("lyrics")
      ) {
        return true;
      }
      if (
        route.fullPath.includes("challenges") &&
        !route.fullPath.endsWith("challenges")
      ) {
        return true;
      }
      return false;
    },
  },
});
