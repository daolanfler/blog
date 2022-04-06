---
title: Type vs Interface and Union vs Intersection in TypeScript
date: 2021-11-01 20:08:03
tags:
  - typescript
---

初看 [TypeScript 文档](https://www.typescriptlang.org/docs/handbook/intro.html)时，时常疑惑 type 和 interface ，
[_Union Types_](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) ( "|" ) 和
[_Intersection Types_](https://www.typescriptlang.org/docs/handbook/2/objects.html#intersection-types) ( "&" ) 的区别。

## Type vs Interface

二者的确十分相似，[文档](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces)上说：

> Type aliases and interfaces are very similar, and in many cases you can choose between them freely. Almost all features of an `interface` are available in `type`, the key distinction is that a type cannot be re-opened to add new properties vs an interface which is always extendable.

几乎 `interface` 上所有的功能，`type` 上都有，主要区别在于 type 不能 _re-open_ 添加新的属性，而 interface 总是可扩展的。
文档上比较有代表性的点：

- Type aliases may not participate in declaring merging, but interfaces can.
- Interfaces may only be used to declare the shapes of objects, not rename primitives.

visit [Official Doc](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#differences-between-type-aliases-and-interfaces) to see the playground example.

## Intersection Types vs Union Types

- "|" in type position means _Union Types_
- "&" in type position means _Intersection Types_

### 1. Example when no conflicts

[playground link](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZZOTCALmRAFcBbAI2gG4Dla4oBrcgMUpATGDoQTAL548oSLEQoAwnDC5mxMhRr0oTQtQjoA7t179BwvGLwB6C8knQAzhGNDkYAJ4AHCHeR43n5ACCIMDUcAA2AIzIALxoWMgAZMjyYOIIQnaKvOwg+iBBIeER5AWhkTFKhCrkEQBMADTMrBzkABQAlDEAfLgijdq6Bsgd3b1m4n4okJlRsaVFyBAAHpAgACbeKcgA-C5QlCjk8GEOyFZ7B74eU15gtRXz5curG3HYu2D7h8jHp+efl3E514Jhc128V38j3usQw2AAPskFD48OkQJlkNlcnp8sEyrUSnjwjDKkQSOQACz9FhsTjDTrRHo4PrMHT6NoMplicyTFy3ADMDyJYXuzwg602yI+X2QR3Cf2svxQkJumQpQsKIsWK3FrzhOwu3yVZ0V8pQQA)

```ts
interface Dog {
  age: number
  bark: Function
}

interface Cat {
  age: number
  meow: Function
}

// intersection types
type Animal1 = Dog & Cat

const unknownAnimal1: Animal1 = {
  age: 12,
  bark: () => {},
  meow: () => {},
}

type test1 = Animal1 extends Cat ? true : false // true
type test2 = Animal1 extends Dog ? true : false // true

// union types
type Animal2 = Dog | Cat

const unknownAnimal2: Animal2 = {
  age: 4,
  bark: () => {},
  meow: () => {},
}

type test3 = Animal2 extends Cat ? true : false // false
type test4 = Animal2 extends Dog ? true : false // false
```

通过 test1~4 的结果可以得知，经过 _intersection_ 操作得到的 Animal1 既是 Cat 也是 Dog ，而经过 _union_ 操作得到的 Animal2 既不是 Dog 也不是 Cat 。虽然直观上难以理解，但是从代码来看就是这样。

### 2. Example when having conficts

[playground link](https://www.typescriptlang.org/play?#code/JYOwLgpgTgZghgYwgAgCIHsDmyDeAoZZOTCALmQGcwpRMBuA5AIzigGtyAxAVxATGDoQDAL548oSLEQoAwnDC5GxMshDcAtk2gNCGiOgDuXXv0HC8YvAHprySdAoQzQ5GACeABwgVkeD97IAIIgwBpwADYAjMgAvGhYyABkyPJg4ghCVMi8bCBGICFhkVHkReHRcUqEKuRRAEwANMi2yAAqXigA5Opa0F32vvmKcBQUwJggcEwRKGDobp3IPRAAbv0AdAAU9QDM9fUAlIws7ORbh3EAfLgijYz6RueXsTc4YlaZINm5+YaFoQq9TKgJKVXwNRI5C6DS6zVaHUCXSoNBAmAGwCG6BGYwmUxmcwWAW6IDWmx2+yOJ1YHGQF2ut3uegMxjpLzeH3E-iWkCoMXi5TBEAAHpAQAATXxpZAAfjcUG4KHI8AiThadmoiu5gV5YHqVUFlRFYslCWwcs1SuQKrVrUtXNavHMi28vm1KEN+viGGwAB9Ugo-Hgvj8QHkCobdiDihEvdUiFDkAAWJnMGnPBnvVOPVn0163SwZLKKX4R0ERJPRoHg5SJrpJuHUs5szN3B4sjP596FrnEtw+MC7A3l-XGiASqWBi0Kq02lCtOd+Pu6pPDmOj0Xj00+2XyxXIZWRW12RfiIA)

```ts
interface Dog {
  age: string
  bark: Function
}

interface Cat {
  age: number
  meow: Function
}

// intersection types
type Animal1 = Dog & Cat

const unknownAnimal1: Animal1 = {
  age: 12, // Type 'number' is not assignable to type 'never'.(2322)
  bark: () => {},
  meow: () => {},
}

const unknownAnimal2: Animal1 = {
  age: '12', // Type 'string' is not assignable to type 'never'.(2322)
  bark: () => {},
  meow: () => {},
}

type test1 = Animal1 extends Cat ? true : false // true
type test2 = Animal1 extends Dog ? true : false // true

// union types
type Animal2 = Dog | Cat

const unknownAnimal3: Animal2 = {
  age: 4,
  bark: () => {},
  meow: () => {},
}

const unknownAnimal4: Animal2 = {
  age: '4',
  bark: () => {},
  meow: () => {},
}

type test3 = Animal2 extends Cat ? true : false // false
type test4 = Animal2 extends Dog ? true : false // false
```

可以看到，当有冲突时，在 _intersection_ 得到的 Animal1 中，age 是 `never`，不管是 `number` 还是 `string` 都会报错。而 _union_ 得到的 Animal2 中，age 既可以是 `number` 又可以是 `string`。

### 3. More examples

[playground link](https://www.typescriptlang.org/play?#code/C4TwDgpgBAglC8UDkAnAhgOwCYHsC2SUAPsgMYAWAlgDZZIBQ9okUAQgsuRNdToSUgDuOFLQZNw0AMIc4Jdo2bRgEAM7AAjBxkQAHiuyrk6bPkIB+KMBQBXaAC4oAMzTVV0APQfnr91EWSVmrAAEwcUDr6EIbGmLgExGRUYolIXDx8qcKidFCW1nZQji5unt4F0AEsKuoAzNpQegZYRqhxZqkUNLn5tg4+pVBQXgN+VdAAIrJQAGRsw94YEABuEChQQA)

```ts
type A = 'random' | 'child'

type B = 'hello' | 'world'

type C = A | B

type test1 = C extends 'random' ? true : false // false

type test2 = C extends 'random' | 'child' | 'hello' | 'world' ? true : false // true

type test3 = C extends 'random' | 'child' ? true : false // false

type D = A & B // never
```

## Reference

1. [What does the ampersand (&) mean in a TypeScript type definition?](https://stackoverflow.com/questions/38317625/what-does-the-ampersand-mean-in-a-typescript-type-definition)
2. [The Art of Type Programming](https://mistlog.medium.com/the-art-of-type-programming-cfd933bdfff7)
