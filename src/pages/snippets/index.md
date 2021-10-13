---
title: Snippets
date: 2021-10-04 20:51
---

## $$ in Chrome Devtools

`$$` is a shortcut `document.querySelectAll`，[参考这里](https://medium.com/frontmen/art-of-debugging-with-chrome-devtools-ab7b5fd8e0b4)，但不是完全相等。

## 使用 [JSDoc](https://jsdoc.app/) 对 js 代码注释以获得类型提示 {#using-jsdoc-to-comment-js-code}

需要项目中有相应的 `.d.ts` 文件定义的类型，引入`@types/pkgName`或者有些库会自带 `ts declaration`或则自己定义。示例：

```javascript
/** @type {BMap.Map} */
const map = this.bmap;
// 这样在输入 map. 的时候（vscode的）intellisense 即可触发

/**
 * @returns {import("node_modules/element-ui/types/table-column.js").ElTableColumn[]}
 */
export default function (customHeaders = []) {
  return xxxx;
}
```

## 检测元素是否超出了边界 {#check-if-element-exceeds}

参考 Element UI el-table 中 [showOverflowTooltip](https://github.com/ElemeFE/element/blob/50a464ea555c0711d1c47efa31c3cff742ededf1/packages/table/src/table-body.js#L252) 的实现：

```javascript
export function isContentOverflow(el) {
  // use range width instead of scrollWidth to determine whether the text is overflowing
  // to address a potential FireFox bug: https://bugzilla.mozilla.org/show_bug.cgi?id=1074543#c3
  const range = document.createRange();
  range.setStart(el, 0);
  range.setEnd(el, el.childNodes.length);
  const rangeWidth = range.getBoundingClientRect().width;
  const padding =
    (parseInt(getComputedStyle(el).paddingLeft, 10) || 0) +
    (parseInt(getComputedStyle(el).paddingRight, 10) || 0);
  return (
    rangeWidth + padding > el.offsetWidth || el.scrollWidth > el.offsetWidth
  );
}
```
