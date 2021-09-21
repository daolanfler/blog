---
title: 正则表达式预检查
date: 2019-12-17 14:14:14
tags:
    - 正则表达式
---

## 名词 {#terms}

以下都是预检查，类似于`(?:)`非捕获型分组，匹配到的内容不会被捕获

`(?=pattern)` look ahead positive assert 正向肯定预检查

`(?!pattern)` look ahead negative assert 正向否定预检查

`(?<=pattern)` look behind positive assert 反向肯定预检查

`(?<!pattern)` look behind negative assert 反向否定预检查

## 例子 1 {#example1}

```js

/windows(95|NT|xp)/.exec("windows95OtherString");
// (2) ['windows95', '95', index: 0, input: 'windows95OtherString', groups: undefined]

/windows(?=95|NT|xp)/.exec("windows95");
// ['windows', index: 0, input: 'windows95', groups: undefined]
// 对比上面的可以知道 非捕获型 的含义


/(?<=95|NT|xp)windows/.exec("NTwindows");
// ['windows', index: 2, input: 'NTwindows', groups: undefined]

/(?=95|NT|xp)windows/.exec("95windows");
// null

/(?=95|NT|xp)95windows/.exec("95windows")
['95windows', index: 0, input: '95windows', groups: undefined]
```

## 例子 2：千位分隔符 Look Ahead Positive Assert {#example2}

```javascript
"12345678.32423432".replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
// '12,345,678.32423432'
// x(?=y) 匹配'x'仅仅当x后面跟着'y'
// $1 表示(\d) 捕获到的分组
```

## Reference {#reference}

1. <https://segmentfault.com/q/1010000004651380>

2. [PCRE 表达式全集](https://zh.wikipedia.org/wiki/%E6%AD%A3%E5%88%99%E8%A1%A8%E8%BE%BE%E5%BC%8F#PCRE%E8%A1%A8%E8%BE%BE%E5%BC%8F%E5%85%A8%E9%9B%86)
