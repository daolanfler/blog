---
title: this in javascript's function
date: 2018-04-06 23:35:06
tags: javascript
---

## 一般情况 {#usual-case}

最近在看 GitHub 上的一本书，You-Dont-Know-JS ，这本书讲解的this非常清楚：要理解this的指向，首先得知道call-site这个概念：
> To understand this binding, we have to understand the call-site: the location in code where a function is called (not where it’s declared).

然后根据这个函数在call-site是怎样被调用的，按如下四条规则，优先级从上到下：

> 1. Is the function called with `new` (new binding)? If so, this is the newly constructed object.`var bar = new foo()`
> 2. Is the function called with `call` or `apply` (explicit binding), even hidden inside a bind hard binding? If so, this is the explicitly specified object.
> `var bar = foo.call( obj2 )`
> 3. Is the function called with a context (implicit binding), otherwise known as an owning or containing object? If so, this is that context object.
> `var bar = obj1.foo()`
> 4. Otherwise, default the this (default binding). If in strict mode, pick undefined, otherwise pick the global object.
> `var bar = foo()`

## Lexical this {#lexical-this}

一般情况以上四条规则就可以cover 了，但是ES6 新加的箭头函数就不是这样。它的this用lexical this概括再好不过了。Lexical 这个词，在讲作用域时提到了JS 是Lexical Scope ，lexical 强调的是声明时，author-time，反正我是这么理解的。所以，箭头函数中的this就只与定义它时的父级上下文相关，而且无法用bind、call、apply 改变。 看下面三个例子，就很清楚了：

```javascript
function foo() {
  setTimeout(() => {
    // `this` here is lexically adopted from `foo()`
    console.log( this.a )
  },100)
}
var obj = {
  a: 2
}
foo.call( obj ) // 2 将 foo 中的 `this` 绑定到了 obj 上，对应情形 2
```

```javascript
function foo() {
  var self = this // lexical capture of `this`
  setTimeout( function(){
    console.log( self.a )
  }, 100 )
}
var obj = {
  a: 2
}
foo.call(obj) // 2 注意这里不是箭头函数
```

```javascript
function foo() {
  // return an arrow function
  return () => {
    console.lot(this.a)
  }
}
var obj1 = {
  a: 2
}
var obj2 = {
  a: 3
}
var bar = foo.call(obj1)
bar.call(obj2) // 2 not 3! 这证明了箭头函数中的 `this` 无法通过 bind 来改变。
```