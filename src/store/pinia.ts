import { defineStore } from "pinia";

export const useAppStateStore = defineStore("appState", {
  state: () => {
    return {
      codePenLoaded: false,
    };
  },
});
