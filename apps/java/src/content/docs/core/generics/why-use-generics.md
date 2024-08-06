---
title: Why use generics?
---

Generics enable types (classes and interfaces) to be parameters when defining classes, interfaces and methods.

## Benefits of using generics
- Stronger type checks at compile time.
- Elimination of type casts (Improves type safety)
- Allows implementation of generic algorithms (E.g. Collections)

```java
List list = new ArrayList():
list.add("ada");
String s = (String) list.get(0);

// With generics
List<String> list1 = new ArrayList():
list.add("ada");
String s = list.get(0); // No type cast
Integer num = list.get(0); // Compilation error
```
Specifying the type of data prevents incorrect type assignments, reducing the need for typecasting and making
it easier to detect bugs (compile-time error is produced, when an incorrect type is provided).

