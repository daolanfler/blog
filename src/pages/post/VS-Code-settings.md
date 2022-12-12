---
title: VS Code 配置
date: 2019-03-21 21:43:56
updateDate: 2022-04-02 13:44:00
tags:
  - VS Code
  - 编辑器
---

## 字体 {#font}

字体一般只要是等宽就行了。推荐一款很好用的等宽字体 [FiraCode](https://github.com/tonsky/FiraCode)，可以开启 Font Legatures（连字符），只需在设置里面打开就行：

```json
"editor.fontLigatures": true,
```

## 快捷键 {#shortcuts}

ctrl + shift + p ，输入 shortcut，可以看到[快捷键参考](https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf)，一些多行编辑的快捷键可以记一下提升开发速率。如 ctrl + alt + shit + ArrowKey、ctrl + p 等等。可以打开 screencast mode 用来演示。

[Emmet](https://code.visualstudio.com/docs/editor/emmet)。可以自定义很多操作，具体可以看文档。这里是一个绑定快捷键进行数学运算的例子：

```json
{
  "key": "ctrl+shift+u",
  "command": "editor.emmet.action.evaluateMathExpression"
},
```

## 主题 {#theme}

ctrl + shift + p，输入主题，选择主题即可。`One Dark Pro` 和 `GitHub Plus`，这两个主题不错，icon 推荐 `material icon theme`。

## 插件 (前端、Vue 相关) {#extensions}

- Vetur // for Vue2
- Volar // for Vue3
- Eslint
- Prettier
- GitLens
- Partial Intellisense // diff 剪贴板上的文本

## 集成终端 {#terminal}

如果是 windows 系统，用 git bash 可能会顺手一些。

```json
"terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
```

当然也可以用 powershell cmd 或者 Cmder。

## 对于 Vue 和小程序开发 {#vue-miniprogram}

需要设置 file.associations 让 vs code 识别文件类型：

```json
"files.associations": {
    "*.vue": "vue",
    "*.wxss": "css",
    "*.wxml": "html",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
},
```

## [Code Snippets 代码片段](https://code.visualstudio.com/docs/editor/userdefinedsnippets) {#code-snippets}

[vue-vscode-snippets](https://marketplace.visualstudio.com/items?itemName=sdras.vue-vscode-snippets) 提供了一些常用的 snippets. 或者你可以自己定义 snippets，ctrl + shift + p 输入 snippets，选择相关文件类型，这里有一个例子：

```json
{
  // Example:
  "Print to console": {
    "prefix": "log",
    "body": ["console.log('$1')", "$2"],
    "description": "Log output to console"
  },
  "TS vue template": {
    "prefix": "tsbase",
    "body": [
      "<template lang=\"${1:pug}\">\n</template>\n",
      "<script lang=\"ts\">\n\timport Component from 'vue-class-component'\n</script>\n",
      "<style lang=\"less\" scoped>\n</style>\n"
    ]
  }
}
```

或者用这个可以[在线编辑的](https://snippet-generator.app/)

## Debug {#debug}

官方文档上有 [Nodejs debug 教程](https://code.visualstudio.com/docs/nodejs/nodejs-debugging)，下面是两个基本例子：

```json
{
  "type": "node",
  "request": "launch",
  "protocol": "inspector",
  "name": "run dev",
  "program": "${workspaceFolder}\\build\\dev-server.js",
  "skipFiles": ["${workspaceFolder}/node_modules/**/*.js"],
  "args": ["malls"]
},
{
  "type": "node",
  "request": "launch",
  "name": "run build",
  "protocol": "inspector",
  "program": "${workspaceFolder}\\build\\build.js",
  "skipFiles": ["<node_internals>/**/*.js"],
  "args": ["malls"]
},
```

## 同步配置 {#settings-sync}

登录 GitHub 或微软账号即可。

## vim config {#vim-configs}

```json
{
  "vim.insertModeKeyBindings": [
    {
      "before": ["j", "k"],
      "after": ["<Esc>"]
    }
  ],
  "vim.handleKeys": {
    "<C-w>": false,
    "<C-b>": false,
    "<C-k>": false,
    "<C-f>": false,
    "<C-n>": false,
    "<C-c>": false,
    "<C-x>": false,
    "<C-a>": false
    // "<C-d>": false,
    // normal 模式下，进入visual block 需要使用
    // "<C-v>": false,
  },
  "vim.foldfix": true,
  "vim.smartRelativeLine": true,
  "vim.mouseSelectionGoesIntoVisualMode": false,
  "vim.ignorecase": false,
  "vim.smartcase": true,
  // https://stackoverflow.com/a/11993928/8947428
  "vim.visualModeKeyBindingsNonRecursive": [
    {
      "before": ["leader", "d"],
      "after": ["\"", "_", "d"]
    },
    {
      "before": ["leader", "p"],
      "after": ["\"", "_", "d", "P"]
    }
  ],
  "vim.normalModeKeyBindingsNonRecursive": [
    {
      "before": ["leader", "d"],
      "after": ["\"", "_", "d"]
    },
    {
      "before": ["m"],
      "after": ["i", " ", "<Esc>"]
    }
  ]
}
```
