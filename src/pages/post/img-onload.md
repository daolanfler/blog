---
title: img onload
date: 2019-03-10 18:46:14
tags:
  - DOM
  - HTMLElement
---

## img load 事件 {#img-load-event}

最近有一个需求，需要用到 canvas drawImage。看了一下 MDN 上的 canvas 教程，刚开始写出来是这样的：

```javascript
var img = new Image();
img.src = `${prefix}avatar.png`;
img.onload = function () {
  ctx.drawImage(x, y, width, height);
};
```

这样写发现有时候能把图片画上去，有时候不能。查看 [load 事件](https://developer.mozilla.org/en-US/docs/Web/Events/load)的定义：

> The load event is fired when a resource and its dependent resources have finished loading.

load 事件会在资源以及它所依赖的资源完成加载时候触发。这里会不会出现图片很快就加载完成（比如缓存中，从缓存中加载，也是会触发 load 事件的），而这个时候 onload 还没有添加监听器？所以要先添加监听器：

```javascript
var img = new Image();
img.onload = function () {
  ctx.drawImage(x, y, width, height);
};
img.src = `${prefix}avatar.png`;
```

这样画一张图片是够了，但是如果要求要等好几张图片都加载完之后呢。这里有一个方法：

```javascript
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();

const imgPromiseArr = [img1, img2, img3].map((img) => {
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve();
    };
  });
});

await Promise.all(imgPromiseArr);
// now all image loaded
```

load 事件会在资源以及它所依赖的资源完成加载时候触发。这里会不会出现图片很快就加载完成（比如缓存中，从缓存中加载，也是会触发 load 事件的），而这个时候 onload 还没有添加监听器？所以要先添加监听器：

```javascript
var img = new Image();
img.onload = function () {
  ctx.drawImage(x, y, width, height);
};
img.src = `${prefix}avatar.png`;
```

这样画一张图片是够了，但是如果要求要等好几张图片都加载完之后呢。这里有一个方法：

```javascript
var img1 = new Image();
var img2 = new Image();
var img3 = new Image();

const imgPromiseArr = [img1, img2, img3].map((img) => {
  return new Promise((resolve, reject) => {
    img.onload = function () {
      resolve();
    };
  });
});

await Promise.all(imgPromiseArr);
// now all image loaded
```

## 参考 {#reference}

1. [图片的异步加载与 onload 函数](https://www.jianshu.com/p/d3a02ffe94b6)
2. [image pre-loading](https://www.google.com/search?q=image+pre-loading&oq=image+pre-loading)
