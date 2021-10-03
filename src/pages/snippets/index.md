# Snippets

## 检测元素是否超出了边界

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
