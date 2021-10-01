---
title: VS Code 配置
date: 2019-03-21 21:43:56
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

- Vetur 不多说了
- Eslint // 不多说了
- Prettier // facebook 的格式化插件 [An opinionated code formatter](https://prettier.io/)
- GitLens // git blame
- TypeScript Extension Pack // 一些提升 ts 开发体验的插件
- Partial Intellisense // 选择两段代码做 diff
- Path Intellisense // 优化路径智能提示，如 webpack alias
- Settings Sync // 同步你的设置 & 插件 & 自定义快捷键 到 github gist
- Document this // 给函数加注释

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

## 同步你的配置 {#settings-sync}

用 `settings sync` ，使用说明参见其文档。

下面是我的设置，仅供参考：

```json
{
  "editor.tabSize": 2,
  "editor.fontLigatures": true,
  "editor.fontFamily": "'Fira Code', Consolas, monospace, 'Segoe UI Emoji'",
  "editor.formatOnPaste": false,
  "workbench.iconTheme": "material-icon-theme",
  "files.autoSave": "onFocusChange",
  "eslint.autoFixOnSave": true,
  "eslint.alwaysShowStatus": true,
  "eslint.validate": [
    "javascriptreact",
    {
      "language": "vue",
      "autoFix": true
    },
    {
      "language": "javascript",
      "autoFix": true
    },
    {
      "language": "html",
      "autoFix": true
    }
  ],
  "eslint.options": {
    "extensions": [".html", ".js", ".vue", ".jsx"]
  },
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\bin\\bash.exe",
  "material-icon-theme.folders.theme": "classic",
  "window.zoomLevel": 0,
  "files.associations": {
    "*.vue": "vue",
    "*.wxss": "css",
    "*.wxml": "html",
    "*.cjson": "jsonc",
    "*.wxs": "javascript"
  },
  "explorer.openEditors.visible": 0,
  "emmet.includeLanguages": {
    "vue-html": "html",
    "wxml": "html"
  },
  "prettier.disableLanguages": [],
  "prettier.printWidth": 120,
  "prettier.semi": false,
  "prettier.singleQuote": true,
  "material-icon-theme.showReloadMessage": false,
  "path-intellisense.mappings": {
    "/": "${workspaceRoot}",
    "@": "${workspaceRoot}/src"
  },
  "gitlens.advanced.messages": {
    "suppressShowKeyBindingsNotice": true
  },
  "sync.gist": "",
  "sync.quietSync": false,
  "sync.askGistName": false,
  "sync.removeExtensions": true,
  "sync.syncExtensions": true,
  "sync.autoDownload": false,
  "sync.autoUpload": false,
  "sync.forceDownload": false,
  "diffEditor.ignoreTrimWhitespace": true,
  "python.jediEnabled": false,
  "workbench.startupEditor": "newUntitledFile",
  "workbench.colorTheme": "One Dark Pro Vivid",
  "vetur.format.defaultFormatter.js": "prettier-eslint",
  "vetur.format.defaultFormatterOptions": {
    "prettier": {
      "semi": false,
      "singleQuote": true,
      "tabWidth": 2
    }
  },
  "vetur.completion.useScaffoldSnippets": true,
  "vetur.validation.template": false,
  "diffEditor.renderSideBySide": false,
  "files.eol": "\n",
  "editor.minimap.enabled": true,
  "editor.suggest.localityBonus": true,
  "gitlens.codeLens.recentChange.enabled": false,
  "gitlens.codeLens.authors.enabled": false,
  "gitlens.codeLens.enabled": false,
  "tslint.autoFixOnSave": true,
  "explorer.confirmDelete": false,
  "breadcrumbs.enabled": false,
  "git.enableSmartCommit": true,
  "git.autofetch": true,
  "editor.suggestSelection": "first",
  "workbench.settings.openDefaultSettings": true,
  "vetur.format.defaultFormatter.html": "prettier"
}
```
