---
title: 前端项目的主题切换
date: 2022-06-06 11:15:59
tags:
  - css
  - vue
  - react
---

## 组件库的主题方案

### element-ui vue2 版本

通过查看 element-ui 组件的目录和组件代码，可以发现它的组件中是没有样式代码的，样式文件则是从 `packages/theme-chalk/src/index.scss` 这个入口文件打包的。这样做的好处是可以定义一些 scss variable，只需改变这些变量的值就可以生成包含了所有组件样式的主题文件。从它文档上下载的主题文件里面就包含了一个定义 scss 变量的 json 文件，反过来根据这个文件，可以搭建一个后台服务，生成主题 css 样式文件

### naive-ui vue3 版本

### chakra-ui

## 业务项目的换肤

### 定义 scss 颜色变量 + scss 特定的语法生成两套样式文件

brand color

### 使用 tailwindcss 支持亮色/暗色两种主题

比如这个博客，对于简单的直接用 dark variant 去写死颜色值就可以了。

若需要用到 brand color，则可以和 [css variables](https://tailwindcss.com/docs/customizing-colors#using-css-variables) 一起使用。
