---
title: addEventListener 中的回调是放在任务队列中的吗？
date: 2022-04-02 10:46:00
tags:
  - javascript
  - event-loop
---

之前看到的这篇 Jake Archibald [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) 关于 event-loop 的文章，有一个疑惑，同样是 addEventListener，如果是用户点击触发的，那事件回调就是异步的，如果通过 `el.click()` 这种 javascript 触发的方式则是[同步的](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/#:~:text=event%20to%20dispatch-,synchronously,-%2C%20so%20the%20script)，那冒泡事件的回调和原始事件的回调是不是在同一个 task 中执行呢？

然后前几天看 《Vue.js 设计与实现》中关于绑定事件处理函数是需要做一个判断：[事件的触发时间早于处理函数绑定的时间则不执行处理函数](https://github.com/daolanfler/misc/blob/f0c0478b367c625750f8b4ddccee582ba32a58db/apps/learn-vue3/renderer/main.js#L143)。意思就是：假如我们在原始事件的回调中 _动态地_ 去给父元素添加事件绑定，那在这个事件绑定地回调中，要忽略这次事件，那如何区分呢？在这个例子的上下文中，修改响应式数据会同步地触发 `patchElement` 去修改父级元素的 HTML Attributes 和事件监听，顺序是这样的：

- 用户点击，触发 `click` 事件
- --> 子元素的 _onClick callback_ 执行
- --> 响应式数据的副作用同步触发
- --> 修改父元素的事件监听 (本来是没有的)
- --> 事件冒泡到父元素
- --> 父元素的 _onClick callback_ 执行。

在这里，原始事件的触发时间实际上是早于父元素上 `click` 回调的绑定时间。  
这样可以确定，对于用户点击事件，原始事件处理函数和冒泡事件地处理函数是在同一个 eventloop 的 task 中的。  

有一点要注意的是 microtask 不仅会在 event-loop 中 task 之后执行也会在 JavaScript excuction context empty 的时候执行：

> If the [stack of script settings objects](https://html.spec.whatwg.org/multipage/webappapis.html#stack-of-script-settings-objects) is now empty, [perform a microtask checkpoint](https://html.spec.whatwg.org/multipage/webappapis.html#perform-a-microtask-checkpoint)
> — [HTML: Cleaning up after a callback](https://html.spec.whatwg.org/multipage/webappapis.html#clean-up-after-running-a-callback) step 3

## 查阅文档和标准

- [MDN 的说明](https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide#tasks)
- [HTML Standard 的说明](https://html.spec.whatwg.org/multipage/webappapis.html#generic-task-sources) 这个标准里面并没有说哪些 api 会将 task 放到 task queue，哪些会放到 mcirotask queue
  引用 [8.1.6.1 Event Loops Definitions](https://html.spec.whatwg.org/multipage/webappapis.html#definitions-3) 中这段关于 microtask queue 的描述：
  > Each [event loop](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop) has a microtask queue, which is a queue of microtasks, initially empty. A microtask is a colloquial way of referring to a task that was created via the [queue a microtask](https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-microtask) algorithm.

可以这么认为，如果一个 task 是通过 [queue a mircotask](https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-microtask) 创造的，则认为它是一个 microtask，否则是一个 task(macro-task)，比如通过 [queue a task](https://html.spec.whatwg.org/multipage/webappapis.html#queue-a-task)

## 例子验证一下

<Stackblitz id="js-hmjac3" />

[stackblitz example](https://stackblitz.com/edit/js-hmjac3?file=index.js)

通过 `appDiv.click()` 触发事件，log 如下：

```plaintext

Click: title
Click: bubble to body
Click: bubble to document
in main JS sync log
// 由上可见，通过 el.click() 触发的，3个事件处理回调都是同步执行的

Title: in promise
Body: in promise
in main JS promise
Body: in promise 2
// 微任务紧随其后

Title: in setTimeout
Title: promise in setTimeout
// 新的任务，setTimeout 中的回调会放到不同的 task 中，promise 紧随其后

Body: in setTimeout
// 最后一个任务
```

注释掉 `appDiv.click()` ，通过用户点击触发事件，log 如下：

```plaintext
// 代码同步执行
in main JS sync log
in main JS promise

// 点击标题，一个任务执行
Click: title // 第一个事件回调
Title: in promise // 此时 js execution context empty 微任务执行
Click: bubble to body // body 冒泡事件回调执行
Body: in promise // 此时 js execution context empty 微任务执行
Body: in promise 2 // 微任务中触发的微任务继续执行
Click: bubble to document // document 冒泡事件回调执行

// 新的任务
Title: in setTimeout
Title: promise in setTimeout

// 新的任务
Body: in setTimeout
```
