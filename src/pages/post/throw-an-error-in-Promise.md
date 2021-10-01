---
title: throw an error in Promise
date: 2019-03-27 21:35:48
tags:
  - Promise
  - JavaScript
---

## 在 Promsie 中抛出异常 {#throw-err-in-promise}

之前有一次想通过在 promise 中抛出异常，通过`try catch`捕获到异常，然后实现某种逻辑。当时搜了一下，有人说用 `setTimeout`，那个时候我对 `event loop`、`microtask & macrotask` 还没有什么概念。现在我也记不得当时的问题是什么了。反正搜到一个 [stackoverflow 问题](https://stackoverflow.com/questions/30715367/why-can-i-not-throw-inside-a-promise-catch-handlerå)。

最近了解了一下 event loop 和 microtask & macrotask 相关内容，再回顾这个问题就清除了很多。`try catch` 是不能捕获异步抛出的异常的...

首先定义这两个函数，返回 promise 对象：

```js
function do1() {
  return new Promise((resolve, reject) => {
    throw new Error('do1')
    setTimeout(resolve, 1000)
  })
}

function do2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject(new Error('do2'))
    }, 1000)
  })
}
```

Promise A+ 中[并没有关注于如何创建 promise](https://promisesaplus.com/#point-5)。但是 Chrome 中运行 `do1()`返回的是一个 rejected promise。执行下面的代码：

```js
do1()
  .then(do2)
  .catch(err => {
    console.log(err.stack)
    throw err
  })
```

由于在 do1() 中抛出了异常，这个 then 中的 do2 不会执行。catch 中的回掉会执行，log err.stack，[根据规范](https://promisesaplus.com/#point-42)，如果`onRejected` 中抛出了异常，则返回一个以该异常为 reason 的 rejected promise。Chrome console 会提示`uncaught error in promise`。如果给包裹上 `try catch`，是捕获不到错误的，为什么可以看参考链接 2。

然后看下面的代码，与上面不同之处在于 `throw err` 放到 `setTimeout` (一个 macrotask)中了：

```js
do1()
  .then(do2)
  .catch(err => {
    console.log(err.stack)
    setTimeout(() => {
      throw err
    })
  })
```

执行之后返回的是一个 `resolved promise` 。error 是一个 `uncaught Error`，而不是 `uncaught Error in promise`。

## 参考链接 {#refrence}

1. [Promise A+ 规范](https://promisesaplus.com/)
2. 一篇关于 [task-microtask-queues-schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) 的博客
