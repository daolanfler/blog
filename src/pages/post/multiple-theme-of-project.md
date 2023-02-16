---
title: 前端项目的主题切换
date: 2022-10-27 17:04:00
tags:
  - css
  - vue
  - react
---

## 这里所说的主题的定义

第一种是 light/dark 这两种组题（又称为 color mode），和操作系统的主题类似，亮色和暗色，浏览的 media query 支持检测系统设定的主题:

```css
body {
  background-color: white;
  color: black;
}

@media screen and (prefers-color-scheme: dark) {
  body {
    background-color: black;
    color: white;
  }
}
```

第二种则是 red/blue/pink/dark/light 这种，每个组题里面有一套自定义的颜色。比如 `--primary-color` （主色）这一 css 变量（也有可能是 sass 或者其他变量）在 red 主题是红色的，而在 blue 主题则是蓝色的。通常这么使用：

```css
html {
  --primary-color: #0a244d;
}

html[data-theme='red'] {
  --primary-color: red;
}

html[data-theme='blue'] {
  --primary-color: blue;
}
```

## 几个开源组件库的方案

### element-ui vue2 版本

1. 组件库的自定义主题功能

   通过查看 element-ui 组件的目录和组件代码，可以发现它的组件中是没有样式代码的，样式文件则是从 `packages/theme-chalk/src/index.scss` 这个入口文件打包的。这样做的好处是只需要定义一些 scss variable，根据这些变量的值就可以生成包含了所有组件样式的主题文件。从它文档上下载的主题文件里面就包含了一个定义 scss 变量的 json 文件，通过这个文件以及 `packages/theme-chalk/src/index.scss` 就可以通过 `sass` 编译生成组件库所有的 css 文件。

2. 结合项目使用

   根据设计给出的颜色，去文档上的主题编辑器配置好颜色，配置多套主题后下载样式代码。切换主题的时候动态地去创建和删除组件库的 `<style>` 元素，注意一下央视的优先级。

### naive-ui vue3 版本

1. 组件库的主题

   该项目采用的是 css-in-js 的方案，[css-render](https://github.com/07akioni/css-render)。naiveui 内置了 dark/light 两种主题，所有组件默认使用亮色主题，可以通过 `n-config-provider` [调整](https://www.naiveui.com/zh-CN/dark/docs/customize-theme) 全局的主题变量，通过传入 `themeOverrides` 可以覆盖默认的变量。

   还可以调整单个组件的主题变量，给组件传入 `themeOverrides` ，和全局的用法类似。

   翻阅源码发现，css 变量分为全局性的和组件特有的。`n-config-provider` 支持 override 全局性的 css 变量，比如这里 darkTheme 中通用的 css 变量 `src/_styles/common/dark.ts`，包括了 primaryColor, infoColor, opactiy 之类的。组件以 `Alert` 组件为例，`src/alert/styles/light.ts` 这个文件 export 了 `AlertThemeVars` 这个类型，就是此组件支持的自定义变量。

2. 配合项目使用

   根据设计给出的颜色，配置好传入给 `n-config-provider` 的 `themeOverrides` 对象即可，可以配置多套主题而不拘泥于 light/dark ，切换主题也很简单，使用不同的 `themeOverrides` 对象即可。

这么做的优点，主题配置细分到了原子化的级别，系统和组件不必是同一个主题，方便 code-splitting, 不需要引入全局的 css 样式文件。缺点是，css 变量都在组件内联了 (inline)，在控制台审查元素看起来比较臃肿，[详见文档上的解释](https://www.naiveui.com/zh-CN/dark/components/config-provider#inline-theme-disabled.vue)

### chakra-ui 2.x (React)

1. 组件库的主题

   该项目也是采用的 css-in-js 不过使用的是 [`@emotion/react`](https://emotion.sh/docs/introduction)。和 naiveui 类似，也同时支持全局（通过 theme tokens）和组件级别的主题配置，[详见文档](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-single-components)。

   对于[自定义组件样式](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-component-styles)，chakra 则是更进一步，多数组件有`baseStyle`，`sizes` 以及 `variants` 可以让你自定义不同 size 或者 variant 的样式，甚至可以扩展 sizes 和 variants。

   主题除了在 chakra 内部使用之外，还能用来配置[全局样式](https://chakra-ui.com/docs/styled-system/customize-theme#customizing-global-styles)：

   > Global styles are theme-aware styles you can apply to any html elemtn golbally.

2. 配合项目使用

   也和 naive-ui 类似，定义多套主题，切换主题时改变传入 ChakraProvider 的 theme 对象即可。

3. Color Mode 以及屏幕闪现问题

   Chakra 文档中 color-mode 这一节也十分有用，特别是 [SSR 这一段](https://chakra-ui.com/docs/styled-system/color-mode#add-colormodemanager-optional-for-ssr)：

   > For server-side rendered sites, e.g. in Next.js, you may want to know the color preference of a user upfront so you can avoid rendering the initial color mode and then changing it during hydration (so-called flashing).

   SSR 的项目需要提前知道客户端的主题偏好，避免 SSR 渲染初始的 color-mode 之后，到客户端的 hydrate 的时候又是另一个 color-mode 造成了一闪而过的白屏（本博客就有这个问题，如果设定为 dark mode 之后刷新一下页面就会有白屏闪现）。Chakra + Nextjs 的解决方案是通过 cookie 将偏好主题传递给服务端渲染。

## 配合 tailwindcss 的使用

如果没有用到组件库，最方便的还是使用 tailwindcss 。对于简单的直接用 dark/light variant 去写死颜色值就可以了。

如果需要多套主题，则可以定义 [css variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables) 一起使用。

定义好 css variables:

```css
// tailwind.var.css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  :root {
    --primary-color: #29b601;
  }
  [data-theme='dark'] {
    --primary-color: #0d86ff;
  }
  [data-theme='blue'] {
    --primary-color: #1087ff;
  }
}
```

在 tailwind 配置中做好关联:

```js
module.exports = {
  // ...
  extend: {
    colors: {
      'primary-color': 'var(--primary-color)', // 使用的时候直接 text-primary-color 即可，vscode 插件也能正常提示
    },
  },
  // ...
}
```

## 参考

1. [Dark Mode in CSS](https://css-tricks.com/dark-modes-with-css/)
2. 各个 UI 组件库的官方文档
