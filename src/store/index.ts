import { useDark, useToggle } from '@vueuse/core'
import { ref } from 'vue'

export const isDark = useDark()
export const toggleDark = useToggle(isDark)

export const codePenLoaded = ref(false)
