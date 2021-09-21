import { reactive, ref, watch } from "vue";
import Themes from "./theme.json";
import { useDark, useToggle } from '@vueuse/core'

export { Themes };

export const DefaultColors = Themes.Default;
export const colors = reactive({ ...DefaultColors }) as any;

export const isDark = useDark()
export const toggleDark = useToggle(isDark)


export function resetCodeTheme() {
  Object.assign(colors, DefaultColors);
}


export function applyCodeTheme(name: keyof typeof Themes) {
  Object.assign(colors, DefaultColors, Themes[name]);
}

watch(isDark, v => {
  if(v) {
    applyCodeTheme("Vitesse Dark")
  } else {
    applyCodeTheme('Vitesse Light')
  }
}, {immediate: true})