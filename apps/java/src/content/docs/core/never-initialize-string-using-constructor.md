---
title: Never initialize string using constructor
---

## Rephrase
- Difference between initializing string as `String s = "hi"` vs `String s = new String("hi")`.
- What is Java String Pool?
- What is String interning?

## tldr
`String s = new String("hi")` explicitly creates a new and referentially distinct instance of a String object; `String s = "text"` may
reuse an instance from the string constant pool if one is available.

## String pool
It is a place in heap memory where all the strings defined in the program are stored by the JVM.

Since Strings are immutable the JVM can optimize the amount of memory allocated for them by storing only one copy of 
each literal String in the pool. This process is called `interning`.

When we create a String variable and assign a value to it, the JVM searches the pool for
a String of equal value. If found, the Java compiler will simply return a reference to its memory address, without allocating
additional memory. If not found, it’ll be added to the pool (interned) and its reference will be returned.
```java
public class Main {
    public static void main(String[] args) {
        String s1 = "Hi";
        String s2 = "Hi";
        System.out.println(s1 == s2); // true, both s1 and s2 refer to the same location
    }
}
```

## Strings allocated using the constructor
When we create a String via the new operator, the Java compiler will create a new object and store it in the heap space reserved for
the JVM. Every String created like this will point to a different memory region with its own address.
```java
public class Main {
    public static void main(String[] args) {
        String s1 = new String("Hi");
        String s2 =  new String("Hi");
        System.out.println(s1 == s2); // false
    }
}
```

## Manual interning
We can manually intern a String in the String Pool by calling the `intern()` method on the object we want to intern.
Manually interning the String will store its reference in the pool, and the JVM will return this reference when needed.
```java
public class Main {
    public static void main(String[] args) {
        String s1 = new String("Hi");
        String internedString = s1.intern();
    }
}
```
