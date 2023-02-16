import { Icon } from "@iconify/vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    Icon: typeof Icon;
  }
}
