import { reactive, ref, watch } from "vue";
import Themes from "./theme.json";

export { Themes };

export const DefaultColors = Themes.Default;
export const colors = reactive({ ...DefaultColors }) as any;
export const theme = ref<keyof typeof Themes>("Vitesse Light");

export function resetTheme() {
  Object.assign(colors, DefaultColors);
}

export function applyTheme(name: keyof typeof Themes) {
  Object.assign(colors, DefaultColors, Themes[name]);
}

watch(theme, applyTheme, { immediate: true });
