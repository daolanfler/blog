/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

declare module "*.vue" {
  import { DefineComponent } from "vue";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

declare module "*.md" {
  import { defineComponent } from "vue";

  const Component: ReturnType<typeof defineComponent>;
  export default Component;
}

declare module "markdown-it-attrs" {
  import { PluginSimple } from "markdown-it";
  const plugin: PluginSimple;
  export default plugin;
}

declare module "https://cdn.jsdelivr.net/npm/fabric@5.3.0/+esm" {
  export * from "fabric";
}

declare module "https://colorjs.io/dist/color.js" {
  import Color from "colorjs.io";
  export default Color;
}
