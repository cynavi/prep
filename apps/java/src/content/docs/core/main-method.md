---
title: Explain main()
---

## Rephrase
- Is it possible to overload `main()` method?
- Is it possible to declare `main()` method as private or protected or with no access modifier?
- Is it possible to declare `main()` method as non-static?
- Can `main()` method take an argument other than string array?

## `main()` method
`main()` method must be implemented as below:
```java
public class Main {
    public static void main(String[] args) {
        
    }
}
```
`main()` method must be `public` in order to make it accessible to JVM. As `main()` method is the
entry point for Java program JVM must be able to access it.

`main()` method must be declared as `static` so that JVM can call `main()` without instantiating 
it's class. If it's non-static JVM has to call constructor of that class to create an instance.
There will be an ambiguity if constructor of that class takes an argument and JVM might have to pass
values based on constructor.

`main()` must have `void` return type. Any other type is not acceptable.

`main()` method's argument must be string array. From the introduction of var args you can pass 
var args of string type as an argument to main() method as var args are also arrays.

### Overloading `main()` method
A Java class can have any number of `main()` methods. But to run the Java class, class should have
`main()` method with signature as `public static void main(String[] args)`. 

`public static void main(String[] args)` must be present to run Java program as it serves as entry
point for any Java program (JVM calls this).
```java
public class Main {
    
    public static void main(String[] args) {
        // I am the entry point
    }
 
    void main(int arg) {
        // do something
    }
 
    double main(float float1) {
        // do something
        return float1;
    }
}
```
