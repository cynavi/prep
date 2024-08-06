---
title: Generic subtypes
---

From [oracle docs](https://docs.oracle.com/javase/tutorial/java/generics/inheritance.html)

As you already know, it is possible to assign an object of one type to an object of another type provided that the types are
compatible. For example, you can assign an `Integer` to an `Object`, since `Object` is one of `Integer`'s supertypes:

```java
Object someObject = new Object();
Integer someInteger = new Integer(10);
someObject = someInteger;   // OK
```
In object-oriented terminology, this is called an `is a` relationship. Since an `Integer` is a kind of `Object`, the assignment
is allowed. But `Integer` is also a kind of `Number`, so the following code is valid as well:

```java
public void someMethod(Number n) { }
someMethod(new Integer(10));   // OK
someMethod(new Double(10.1));   // OK
```

The same is also true with generics. You can perform a generic type invocation, passing `Number` as its type argument, and any
subsequent invocation of add will be allowed if the argument is compatible with `Number`:

```java
Box<Number> box = new Box<Number>();
box.add(new Integer(10));   // OK
box.add(new Double(10.1));  // OK
```

Now consider the following method:

`public void boxTest(Box<Number> n) { }`
What type of argument does it accept? By looking at its signature, you can see that it accepts a single argument whose type is
`Box<Number>`. But what does that mean? Are you allowed to pass in `Box<Integer>` or `Box<Double>`, as you might expect? The
answer is `no`, because Box<Integer> and Box<Double> are not subtypes of `Box<Number>`.

This is a common misunderstanding when it comes to programming with generics, but it is an important concept to learn.

>*Given two concrete types `A` and `B` (for example, `Number` and `Integer`), `MyClass<A>` has no relationship to `MyClass<B>`,
regardless of whether `A` and `B` are related. The common parent of `MyClass<A>` and `MyClass<B>` is `Object`.*
