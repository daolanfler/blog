---
title: Snippets
date: 2021-10-04 20:51
---

### webpack inline loader

使用 `raw-loader` 加载 svg 文件，获取其中的代码为字符串。[来源](https://github.com/codesandbox/codesandbox-client/issues/747#issuecomment-443996080) 以及 [inline loader 语法](https://webpack.js.org/concepts/loaders/#inline)

```javascript
import earthSvg from '!raw-loader!./icons/earth.svg'
```

### git rebase/merge 中接受某一方的改动

如果存在冲突，某些文件的冲突可能太多了，不想一个个区解决，可以使用以下方法，其中 `ours` 表示 _current change_ `theirs` 表示 _incomming change_。[参考](https://linuxpip.org/git-accept-all-incoming-changes/)

```bash
git checkout --ours pnpm-lock.json
git add pnpm-lock.json
```

### github credential problem

github 在 2021 年禁止了密码登录，可以使用 personal access token 替代 (literally 即原来要输入密码的地方直接输入 token 即可) 密码（可以配置 token 的有效期限、权限范围等）。

### 如何在 vscode 中 debug vue-cli 项目

在 vscode 的 Vue Tutorial [Debugging](https://code.visualstudio.com/docs/nodejs/vuejs-tutorial#_debugging) 这一章节中，提到了[这一教程](https://github.com/microsoft/vscode-recipes/tree/main/vuejs-cli)

### Pipe wsl command line out put to windows clipboard

```bash
alias copylog="git log --after="yesterday" --oneline  | clip.exe"
```

### Neovim's faq on clipboard in wsl

[相关 issue](https://github.com/neovim/neovim/wiki/FAQ#how-to-use-the-windows-clipboard-from-wsl)

### Optional chaining {#optional-chaining}

即将到来的运算符：`?.` 和 `??`

```javascript
const adventurer = {
  name: 'Alice',
  cat: {
    name: 'Dinah',
  },
}

const dogName = adventurer.dog?.name
console.log(dogName)
// expected output: undefined
```

参考 [optional chaining](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)，以及 [nullish coalescing](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing_operator)，coalescing: 合并、凝聚

### Github "dot" shortcut {#github-shortcuts}

在 github 的仓库页面点击 `.` 即可打开 vscode web 版

### $$ in Chrome Devtools

`$$` is a shortcut for `document.querySelectAll`，[参考这里](https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4)，但不是 `===` 的相等

### 使用 [JSDoc](https://jsdoc.app/) 对 js 代码注释以获得类型提示 {#using-jsdoc-to-comment-js-code}

需要项目中有相应的 `.d.ts` 文件定义的类型，引入`@types/pkgName`或者有些库会自带 `ts declaration`或则自己定义。示例：

```javascript
/** 
 * @description 这样在输入 map. 的时候（vscode的）intellisense 即可触发
 * @type {BMap.Map}
 */
const map = this.bmap

/**
 * @returns {import("node_modules/element-ui/types/table-column.js").ElTableColumn[]}
 */
export default function (customHeaders = []) {
  return xxxx
}
```

### 检测元素是否超出了边界 {#check-if-element-exceeds}

参考 Element UI el-table 中 [showOverflowTooltip](https://github.com/ElemeFE/element/blob/50a464ea555c0711d1c47efa31c3cff742ededf1/packages/table/src/table-body.js#L252) 的实现：

```javascript
export function isContentOverflow(el) {
  // use range width instead of scrollWidth to determine whether the text is overflowing
  // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)
  const rangeWidth = range.getBoundingClientRect().width
  const padding =
    (parseInt(getComputedStyle(el).paddingLeft, 10) || 0) +
    (parseInt(getComputedStyle(el).paddingRight, 10) || 0)
  return (
    rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth
  )
}
```
