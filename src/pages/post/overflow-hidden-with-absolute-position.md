---
title: 绝对定位与 overflow hidden
date: 2021-07-29 17:43:00
tags:
    - CSS
---

遇到一个问题，子元素为绝对定位，父元素宽度固定，试图调整子元素的 `right` 使其能在父元素外展示。开始以为是 `z-index` 的问题，但是没有成功。

这是失败的样子：

<CodePen slug="zYwWLvO" />
<!-- {% codepen daolanfler zYwWLvO default css,result 300 %} -->

这是期望的样子:

<CodePen slug="zYwWLdG" />
<!-- {% codepen daolanfler zYwWLdG default css,result 300 %} -->

可以看到，前者 child 绝对定位是基于 parent 的（或者说 child 的 containing block 是 parent），后者 child 的 containing block 是 grand。

关于 `overflow: hidden` 的[规范](http://www.w3.org/TR/CSS21/visufx.html#overflow)有说：

> This property specifies whether content of a block container element is clipped when it overflows the element’s box. It affects the clipping of all of the element’s content except any descendant elements (and their respective content and descendants) whose containing block is the viewport or an ancestor of the element.

即 overflow hidden 会裁剪掉它后代中除了以 viewport 或者是它祖先为 containing block 的。如此即可解释两个例子的展现上的不同了，直觉上也好理解。

## 参考：{#reference}

1. <https://blog.csdn.net/liufeng520/article/details/26058775>
