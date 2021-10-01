---
title: JavaScript 语言精粹代码片段
date: 2019-11-04 11:04:38
tags: 
- snippet
- js基础
---


这本书很老了，代码基本都过时了，整理出来看看也罢。

```js
// 模拟 new 的行为
Function.prototype.method = function(name, func) {
    this.prototype[name] = func
    return this
}

Function.method('new', function() {
    var that = Object.create(this.prototype)
    var obj = this.apply(that, arguments)
    return (typeof obj === 'object' && obj) || that
})

var Mammal = function(name) {
    this.name = name
}

var human = Mammal.new('people')
```

```js
// 模拟类
Object.create = function(o) {
    let F = function() {}
    F.prototype = o
    return new F()
}

var mammal = function(spec) {
    var that = {}

    that.get_name = function() {
        return spec.name
    }
    that.says = function() {
        return spec.saying || ''
    }
    return that
}

var cat = function(spec) {
    spec.saying = spec.saying || 'meow'
    var that = mammal(spec)
    that.purr = function(n) {
        var i,
            s = ''
        for (i = 0; i < n; i++) {
            if (s) {
                s += '-'
            }
            s += 'r'
        }
        return s
    }
    that.get_name = function() {
        return that.says() + ' ' + spec.name + ' ' + that.says()
    }
    return that
}

Object.method('superior', function(name) {
    var that = this,
        method = that[name]
    return function() {
        debugger
        console.log(method())
        method.apply(that, arguments)
    }
})

var coolcat = function(spec) {
    var that = cat(spec),
        super_get_name = that.superior('get_name')
    that.get_name = function(n) {
        return 'like' + super_get_name() + 'baby'
    }
    return that
}

var mycat = coolcat({ name: 'Bix' })
```

```js
// 事件发射与监听
var eventuality = function(that) {
    var registry = {}
    that.fire = function(event) {
        var array,
            func,
            handler,
            i,
            type = typeof event === 'string' ? event : event.type
        if (registry.hasOwnProperty(type)) {
            array = registry[type]
            for (i = 0; i < array.length; i += 1) {
                handler = array[i]
                func = handler.method
                if (typeof func === 'string') {
                    func = this[func]
                }
                func.apply(this, handler.parameters || [event])
            }
        }
        return this
    }
    that.on = function(type, method, parameters) {
        var handler = {
            method: method,
            parameters: parameters
        }
        if (registry.hasOwnProperty(type)) {
            registry[type].push(handler)
        } else {
            registry[type] = [handler]
        }
        return this
    }
    return that
}
```

```js
// 初始值为 initial 的 m（row） x n（column） 矩阵
Array.matrix = function(m, n, initial) {
    var a,
        i,
        j,
        mat = []
    for (i = 0; i < m; i++) {
        a = []
        for (j = 0; j < n; j++) {
            a[j] = initial
        }
        mat[i] = a
    }
    return mat
}

// 遍历 DOM 树
const walk_dom = function walk(node, func) {
    func(node)
    node = node.firstChild
    while (node) {
        walk(node, func)
        node = node.nextSibling
    }
}

var body = document.body

walk_dom(body, node => {
    this.count ? this.count++ : (this.count = 1)
})

console.log('I have so many dom: ' + count)
```

```js
// 根据属性排序数组
// Array.prototype.sort(comparefn), this is a comparefn creator
var by = function(name, minor) {
    return function(o, p) {
        if (typeof o === 'object' && typeof p === 'object' && o && p) {
            let a = o[name]
            let b = p[name]
            if (a === b) {
                return typeof minor === 'function' ? minor(o, p) : 0
            }
            if (typeof a === typeof b) {
                return a < b ? -1 : 1
            }
            return typeof a < typeof b ? -1 : 1
        } else {
            throw {
                name: 'Error',
                message: 'Expect an object when sorting by ' + name
            }
        }
    }
}
```

```js
// 用 apply 实现 bind 方法
Function.prototype.bind = function(that) {
    var it = this
    var slice = Array.prototype.slice
    var args = slice.apply(arguments, [1])

    return function() {
        it.apply(that, args.concat(slice.apply(arguments, [0])))
    }
}
```

```js
// 把某些符号变成不于 html 冲突的 entity
String.method(
    'entityify',
    (function() {
        var character = {
            '<': '&lt;',
            '>': '&gt;',
            '&': '&amp;',
            '"': '&quot;'
        }
        return function() {
            return this.replace(/[<>&"]/g, function(c) {
                return character(c)
            })
        }
    })()
)
```
