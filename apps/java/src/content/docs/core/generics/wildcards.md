---
title: Wildcards
---

A wildcard, represented by `?`, is an unknown type.

Wildcard can be used in various situations.
- as the parameter type, filed type, or local variable type
- as a return type (not recommended)

Never use wildcard as a 
- type argument for a generic method invocation
- a generic class instance creation, or a subtype

## Upper bounded wildcards
It's a wildcard type which inherits from another type. Say, you want a method that accepts `List<Integer>`, `List<Double>`,
`List<Float>` and `List<Number>`; you can achieve this by using upper bounded wildcard.

Upper bound wildcard is declared using wildcard `?` followed by `extends` keyword, followed by its `upper bound`.

To write the method that works on lists of `Number` and the subtypes of `Number`, such as `Integer`, `Double`, and `Float`, you would
specify `List<? extends Number>`. The term `List<Number>` is more restrictive than `List<? extends Number>` because the former matches
a list of type `Number` only, whereas the latter matches a list of type `Number` or any of its subclasses.

```java
public class Main {

  public static void consume(List<? extends Number> list) {
    for (Number num : list) {

    }
  }

  public static void main(String[] args) {
    List<Integer> intList = List.of(1, 2, 3);
    consume(intList);

    List<Double> doubleList = List.of(1.4, 2.3, 3.76);
    consume(doubleList);
  }
}
```

## Lower bounded wildcards
It means forcing the type to be a superclass of bounded type. In other words, a lower bounded wildcard restricts the unknown type to
be a specific type or a super type of that type.

A lower bounded wildcard is expressed using the wildcard character (`?`), following by the `super` keyword, followed by its lower
bound: <`? super A`>.

Say you want to write a method that puts `Integer` objects into a list. To maximize flexibility, you would like the method to work on
`List<Integer>`, `List<Number>`, and `List<Object>` — anything that can hold `Integer` values.

To write the method that works on lists of `Integer` and the supertypes of `Integer`, such as `Integer`, `Number`, and `Object`,
you would specify `List<? super Integer>`. The term `List<Integer>` is more restrictive than `List<? super Integer>` because the
former matches a list of type `Integer` only, whereas the latter matches a list of any type that is a supertype of `Integer`.

```java
public static void addNumbers(List<? super Integer> list) {
    for (int i = 1; i <= 10; i++) {
        list.add(i);
    }
}
```

## Unbounded wildcards
It is a wildcard with no upper or lower bound, that can represent any type.

There are two scenarios where an unbounded wildcard is a useful approach:
- If you are writing a method that can be implemented using functionality provided in the `Object` class.
- When the code is using methods in the generic class that don't depend on the type parameter. For example, `List.size` or `List.clear`.
In fact, `Class<?>` is so often used because most of the methods in `Class<T>` do not depend on `T`.

```java
public static void printList(List<?> list) {
    for (Object elem: list) {
      System.out.print(elem);
    }
}
```
>*`List<Object>` and `List<?>` are not the same. You can insert an Object, or any subtype of `Object`, into a `List<Object>`. But
 > you can only insert null into a `List<?>`. The Guidelines for Wildcard Use section has more information on how to determine
> what kind of wildcard, if any, should be used in a given situation.*

>*You can specify an upper bound for a wildcard, or you can specify a lower bound, but you cannot specify both.*

## Lower bounded type vs upper bounded type
When dealing with collections, a common rule for selecting between upper or lower bounded wildcards is PECS. PECS stands for
producer extends, consumer super.

This can be easily demonstrated through the use of some standard Java interfaces and classes.

Producer extends just means that if you are creating a producer of a generic type, then use the extends keyword. Let’s try
applying this principle to a collection, to see why it makes sense:

```java
public static void makeLotsOfNoise(List<? extends Animal> animals) {
    animals.forEach(Animal::makeNoise);   
}
```
Here, we want to call makeNoise() on each animal in our collection. This means our collection is a producer, as all we are
doing with it is getting it to return animals for us to perform our operation on. If we got rid of extends, we wouldn’t be 
able to pass in lists of cats, dogs or any other subclasses of animals. By applying the producer extends principle, we have 
the most flexibility possible.

Consumer super means the opposite to producer extends. All it means is that if we are dealing with something which consumes
elements, then we should use the super keyword. We can demonstrate this by repeating our previous example:

```java
public static void addCats(List<? super Animal> animals) {
    animals.add(new Cat());   
}
```
We are only adding to our list of animals, so our list of animals is a consumer. This is why we use the super keyword.
It means that we could pass in a list of any superclass of animal, but not a subclass. For example, if we tried passing
in a list of dogs or cats then the code would not compile.

The final thing to consider is what to do if a collection is both a consumer and a producer. An example of this might be
a collection where elements are both added and removed. In this case, an unbounded wildcard should be used.

## Reference
- https://www.baeldung.com/java-generics-interview-questions
- https://docs.oracle.com/javase/tutorial/java/generics/wildcardGuidelines.html
