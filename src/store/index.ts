import { reactive, ref, watch } from "vue";
import Themes from "./theme.json";
import {PageTheme} from '../utils/enum'

export { Themes };

export const DefaultColors = Themes.Default;
export const colors = reactive({ ...DefaultColors }) as any;
export const codeTheme = ref<keyof typeof Themes>("Vitesse Light");

export const pageTheme = ref<PageTheme>(PageTheme.Dark)
export function setPageTheme(theme: PageTheme) {
  pageTheme.value = theme
  localStorage.theme = theme
  if (theme === PageTheme.Light) {
    codeTheme.value = 'Default'
  } else {
    codeTheme.value = 'Vitesse Dark'
  }
}

export function resetCodeTheme() {
  Object.assign(colors, DefaultColors);
}

export function applyCodeTheme(name: keyof typeof Themes) {
  Object.assign(colors, DefaultColors, Themes[name]);
}

watch(codeTheme, applyCodeTheme, { immediate: true });
