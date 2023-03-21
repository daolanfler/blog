---
title: TypeScript 联合、交叉类型 & 代数类型
date: 2021-11-01 20:08:03
tags:
  - typescript
---

首先要说明的是 TypeScript 是一个 structural type system，与之相对应的是 [nominal type system](https://en.wikipedia.org/wiki/Nominal_type_system)（采用的语言有 C++/Java/C#/Rust 等)。二者的具体区别可以查看维基百科。

## `type` vs `interface`

<!-- 初看 [TypeScript 文档](https://www.typescriptlang.org/docs/handbook/intro.html)时，时常疑惑 type 和 interface ，
[_Union Types_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) ( `|` ) 和
[_Intersection Types_](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) ( `&` ) 的区别。 -->

二者的确十分相似，[文档](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)上说：

> Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an `interface` are available in `type`, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

几乎 `interface` 上所有的功能，`type` 上都有，主要区别在于 type 不能 _re-open_ 添加新的属性，而 interface 总是可扩展的。
文档上比较有代表性的点：

- Type aliases may not participate in declaring merging, but interfaces can.
- Interfaces may only be used to declare the shapes of objects, not rename primitives.

visit [Official Doc](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) to see the playground example.

## 代数类型

product type / sum type, [参考了这个回答](https://stackoverflow.com/a/17290029/8947428)

```ts
enum Animal {
  Human = 0,
  Land = 1,
  Water = 2,
  Sky = 3,
}

type A = bool | Animal; // 和类型，它的值有 2 + 4 = 6 种可能

interface B {
  creature: Animal;
  alive: bool;
} // 积类型，它的值有 2 * 4 = 8 种类型
```

## `any` vs `never` vs `unkown`

在 TypeSript 中存在 3 个特殊的类型，`any` `unknown` `never`，他们的区别如下：

- `any` 可以赋值给任何类型，也可以被任何类型赋值，用来绕过类型检查
- `unknown` 顶层类型，不能赋值给任何类型，任何类型都可以赋值给它
- `never` 底层类型，能赋值给任何类型，任何类型都不能赋值给它

关于 never 能赋值给任何类型：

```ts
declare const carNo: unique symbol;

interface Car {
  [carNo]: void;
}

type fn = () => Car;

// getCar 实际上返回的就是 never 但是能和 fn 兼容
const getCar = () => {
  throw new Error();
};

const myCar: Car = getCar();
```

## `intersection` (交叉类型) vs `union` (联合类型)

### TLDR

_intersection_ 得到的是 **子类型**，_union_ 得到的是 **父类型**。

以下面这个 [type-util](https://github.com/vuejs/core/blob/650f5c26f464505d9e865bdb0eafb24350859528/packages/shared/src/typeUtils.ts#LL1C39-L1C39) 为例。
首先需要知道的是：如果一个函数是另一个函数的子类型，那么这个函数的参数的类型就是另一个函数的父类型。所以这里 U 是 I 的父类型，而且 infer 出来的是一个具体的类型，所以就是 `intersection` 了。

```ts
export type UnionToIntersection<U> = (
  U extends any ? (k: U) => void : never
) extends (k: infer I) => void
  ? I
  : never;
```

下面举例说明一下 `A | B` 和 `A & B` 的区别。

### 示例 1：当 A 和 B 的属性的类型「不存在」矛盾时

[playground link](https://www.typescriptlang.org/play?ssl=54&ssc=60&pln=50&pc=1#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZZOTCALmRAFcBbAI2gOVrigGtyAxSkBMYdEHgC+ePKEixEKAMJwwuRsTIUa9KI2oR0Ad07de-QSLwB6E8nHQAzhAMDkYAJ4AHCFbxPXyAIIhg1OAAbAEZkAF40LGQAMmRZMFEEASt5blYQHRBffyDg8myAkPCFQiVyYIAmABpGZjZyAAoASnCAPlwhGsJNHUaWsPacTuFRTxRIFNCIgtzkCAAPSBAAEys4uWQAfgcoShRyeECbZDMdvY8XcbcwCuKZooWl1cjsbbBd-eRD49P389NzNxDA5Lu4xj4-IVbhEMNgAD7rBJ4JIgFLINIZbRZSFBCr5HGBaElIgkcgAFi6TBY7GQzTaHUpPV0tP6g2GxnBEzAAGY7gTbo8ICs1vEtmdPt8UKdJRcvFyyXycoS5oshc9YWK-hKgj9zDLZVcUgBWYqiwXCiFK25vD7IA46qXmLUGhzXABsxQ15ue92t4rtXwdJydH1Ey1sgRYKBg+j49hAcE09wacHxSuCTXIADd0MBlqIE0mCQ0MZlfU1EslUiB0mWCbyIvhSqTkBTatS+vShoytMy6QMGSM8IWIMnS1j7tyK2JwNB4EhLYVed6RXIqi8OgBuUaXV0pADsiqhKqea3uoRte3tRwgm+DgZvLq5AA4j0Fl6qLb7NR9rzY778oactcACcb7Kiui7vj+V4Pv+95akAA)

```ts
interface Dog {
  age: number;
  bark: Function;
}

interface Cat {
  age: number;
  meow: Function;
}

// intersection types
type Animal1 = Dog & Cat;

const unknownAnimal1: Animal1 = {
  age: 12,
  bark: () => {},
  meow: () => {},
};

type test1 = Animal1 extends Cat ? true : false; // true
type test2 = Animal1 extends Dog ? true : false; // true

// union types
type Animal2 = Dog | Cat;

const unknownAnimal2: Animal2 = {
  age: 4,
  bark: () => {},
  meow: () => {},
};

type test3 = Animal2 extends Cat ? true : false; // false
type test4 = Animal2 extends Dog ? true : false; // false

type test5 = Cat extends Animal2 ? true : false; // true
type test6 = Dog extends Animal2 ? true : false; // true
```

通过 test1~4 的结果可以得知，经过 _intersection_ 操作得到的 Animal1 既是 `Cat` 也是 `Dog` ，而经过 _union_ 操作得到的 Animal2 既不是 Dog 也不是 。
从集合的角度来讲，_intersection_ 是交集，得到的结果（也是一个集合）即是可以说的 `A` 也可以说是 `B` ，**是一个子类型**；union 是并集，得到的结果 `C`（集合）显然不能说是 `A` 或者 `B`，反而可以说
`A`、`B` 都是 `C`。

此时声明一个函数接受 `Animal1` 类型的参数，可以看到传入 `unknownAnimal2` 是不兼容的：

```ts
declare function nameAnimal(a: Animal1): void;

// const unknownAnimal2: Animal2
// Argument of type 'Animal2' is not assignable to parameter of type 'Animal1'.
//   Type 'Dog' is not assignable to type 'Animal1'.
//     Property 'meow' is missing in type 'Dog' but required in type 'Cat'.(2345)
// input.tsx(8, 3): 'meow' is declared here.
nameAnimal(unknownAnimal2);
```

再定义一个 `unknownAnimal3` 不显式地给它指定类型，反而是可以作为参数传递给 `nameAnimal` 的 (TypeScript is structural type system)：

```ts
const unknownAnimal3 = {
  age: 4,
  bark: () => {},
  meow: () => {},
};

// 通过
nameAnimal(unknownAnimal3);
```

通过 _extends_ 扩展 `Cat` 和 `Dog`，得到的 `Animal3` 反而是和 `Aniaml2`（交叉类型）等价：

```ts
interface Animal3 extends Cat, Dog {} // equals to Cat & Dog

type test7 = Animal2 extends Animal1 ? true : false; // false
type test8 = Animal3 extends Animal2 ? true : false; // true
type test9 = Animal2 extends Animal3 ? true : false; // true
```

### 示例 2：当 A 和 B 的属性的类型「存在」矛盾时

[playground link](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZZOTCALmQGcwpRMBuA5AIzigGtyAxAVxATGDoQDAL548oSLEQoAwnDC5GxMshDcAtk2gNCGiOgDuXXv0HC8YvAHprySdAoQzQ5GACeABwgVkeD97IAIIgwBpwADYAjMgAvGhYyABkyPJg4ghCVMi8bCBGICFhkVHkReHRcUqEKuRRAEwANMi2yAAqXigA5Opa0F32vvmKcBQUwJggcEwRKGDobp3IPRAAbv0AdAAU9QDM9fUAlIws7ORbh3EAfLgijYz6RueXsTc4YlaZINm5+YaFoQq9TKgJKVXwNRI5C6DS6zVaHUCXSoNBAmAGwCG6BGYwmUxmcwWAW6IDWmx2+yOJ1YHGQF2ut3uegMxjpLzeH3E-iWkCoMXi5TBEAAHpAQAATXxpZAAfjcUG4KHI8AiThadmoiu5gV5YHqVUFlRFYslCWwcs1SuQKrVrUtXNavHMi28vm1KEN+viGGwAB9Ugo-Hgvj8QHkCobdiDihEvdUiFDkAAWJnMGnPBnvVOPVn0163SwZLKKX4R0ERJPRoHg5SJrpJuHUs5szN3B4sjP596FrnEtw+MC7A3l-XGiASqWBi0Kq02lCtOd+Pu6pPDmOj0Xj00+2XyxXIZWRW12RficXOCKsFAwUwCVxTfSGrZwcg+w7kVboYDihh4B8QJ9S3+SNLlaaAoHQKAi2+Eswz+AEYwAVhrSFVBTJtaTzDlsw7Fsu05YNixyOCyxjAA2FCE1UetG0IU5MPZRl2yePCOR7f9AJI4Dy0Q0C7HAyC-zgR9yy2ICEIqMi+OQTxRgoIA)

```ts
interface Dog {
  age: string;
  bark: Function;
}

interface Cat {
  age: number;
  meow: Function;
}

// intersection types (is subtyping of both `Cat` and `Dog`)
type Animal1 = Dog & Cat;

const unknownAnimal1: Animal1 = {
  age: 12, // Type 'number' is not assignable to type 'never'.(2322)
  bark: () => {},
  meow: () => {},
};

const unknownAnimal2: Animal1 = {
  age: "12", // Type 'string' is not assignable to type 'never'.(2322)
  bark: () => {},
  meow: () => {},
};

type test1 = Animal1 extends Cat ? true : false; // true
type test2 = Animal1 extends Dog ? true : false; // true

// union types
type Animal2 = Dog | Cat;

const unknownAnimal3: Animal2 = {
  age: 4,
  bark: () => {},
  meow: () => {},
};

const unknownAnimal4: Animal2 = {
  age: "4",
  bark: () => {},
  meow: () => {},
};

type test3 = Animal2 extends Cat ? true : false; // false
type test4 = Animal2 extends Dog ? true : false; // false
```

`Dog` 的 age 是 `string`, `Cat` 的 age 是 `number` ，二者存在冲突。
在 _intersection_ 得到的 Animal1 中，age 是 `never`，不管是 `number` 还是 `string` 都会报错。
而 _union_ 得到的 Animal2 中，age 既可以是 `number` 又可以是 `string`。

### 其它的一些例子

[playground link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAglC8UDkAnAhgOwCYHsC2SUAPsgMYAWAlgDZZIBQ9okUAQgsuRNdToSUgDuOFLQZNw0AMIc4Jdo2bRgEAM7AAjBxkQAHiuyrk6bPkIB+KMBQBXaAC4oAMzTVV0APQfnr91EWSVmrAAEwcUDr6EIbGmLgExGRUYolIXDx8qcKidFCW1nZQji5unt4F0AEsKuoAzNpQegZYRqhxZqkUNLn5tg4+pVBQXgN+VdAAIrJQAGRsw94YEABuEChQQA)

```ts
type A = "random" | "child";

type B = "hello" | "world";

type C = A | B;

type test1 = C extends "random" ? true : false; // false

type test2 = C extends "random" | "child" | "hello" | "world" ? true : false; // true

type test3 = C extends "random" | "child" ? true : false; // false

type D = A & B; // never
```

## Reference

1. [What does the ampersand (&) mean in a TypeScript type definition?](https://stackoverflow.com/questions/38317625/what-does-the-ampersand-mean-in-a-typescript-type-definition)
2. [The Art of Type Programming](https://mistlog.medium.com/the-art-of-type-programming-cfd933bdfff7)
3. [复制特殊符号的网站](https://copychar.cc/math/)
