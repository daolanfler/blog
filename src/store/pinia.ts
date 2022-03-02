import { defineStore } from 'pinia'

export const useFlagStore = defineStore('flag', {
  state: () => {
    return {
      codePenLoaded: false,
    }
  },
})
