---
title: Type erasure
---

More on [oracle docs](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html).

Type erasure implies that generic type information is not available to the JVM at runtime (only available to 
compiler at compile-time). The reason behind this is to preserve backward compatibility with older versions of
Java.

Type erasure replaces all type parameters in generic types with their bounds or Object if the type parameters are
unbounded. The produced bytecode, therefore, contains only ordinary classes, interfaces, and methods.

Type erasure inserts type casts if necessary to preserve type safety.

Type erasure generates bridge methods to preserve polymorphism in extended generic types.

Type erasure ensures that no new classes are created for parameterized types; consequently, generics incur
no runtime overhead.

## Erasure of generic types
The compiler erases all the type parameters and replaces each with its first bound if the type parameter is
bounded or Object if the type parameter is unbounded.

Consider the following generic class that represents a node in a singly linked list:
```java
public class Node<T> {
  
  private T data;
  private Node<T> next;
  
  public Node(T data, Node<T> next) {
    this.data = data;
    this.next = next;
  }
  
  public T getData() {
    return data;
  }
}
```
Because the type parameter `T` is unbounded, the Java compiler replaces it with `Object`:
```java
public class Node {

    private Object data;
    private Node next;

    public Node(Object data, Node next) {
        this.data = data;
        this.next = next;
    }

    public Object getData() { 
      return data;
    }
}
```

## Erasure of generic methods
The compiler also erases type parameters in generic method arguments. Consider the following generic method:
```java
public class Main {
  
  public static <T> int count(T[] arr, T elem) {
    int cnt = 0;
    for (T e : arr)
      if (e.equals(elem))
        ++cnt;
    return cnt;
  }
}
```
Because `T` is unbounded, the Java compiler replaces it with `Object`:
```java
public class Main {

  public static int count(Object[] arr, Object elem) {
    int cnt = 0;
    for (Object e : arr)
      if (e.equals(elem))
        ++cnt;
    return cnt;
  }
}
```
Suppose the following classes are defined:

```java
class Shape { }
class Circle extends Shape { }
class Rectangle extends Shape { }
```

You can write a generic method to draw different shapes:

`public static <T extends Shape> void draw(T shape) { }`
The Java compiler replaces T with Shape:

`public static void draw(Shape shape) { }`

## Effects of type erasure and bridge methods
Sometimes type erasure causes a situation that you may not have anticipated. The following example shows how this can occur.
The following example shows how a compiler sometimes creates a synthetic method, which is called a bridge method, as part 
of the type erasure process.

Given the following two classes:
```java
public class Node<T> {

    public T data;

    public Node(T data) { this.data = data; }

    public void setData(T data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}
```

```java
public class MyNode extends Node<Integer> {
    public MyNode(Integer data) { 
      super(data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```
Consider the following code:
```java
MyNode mn = new MyNode(5);
Node n = mn;            // A raw type - compiler throws an unchecked warning
n.setData("Hello");     // Causes a ClassCastException to be thrown.
Integer x = mn.data;  
```
After type erasure, this code becomes:
```java
MyNode mn = new MyNode(5);
Node n = mn;            // A raw type - compiler throws an unchecked warning
                        // Note: This statement could instead be the following:
                        //     Node n = (Node)mn;
                        // However, the compiler doesn't generate a cast because
                        // it isn't required.
n.setData("Hello");     // Causes a ClassCastException to be thrown.
Integer x = (Integer)mn.data; 
```
The next section explains why a `ClassCastException` is thrown at the `n.setData("Hello");` statement.

### Bridge methods
When compiling a class or interface that extends a parameterized class or implements a parameterized interface, the compiler
may need to create a synthetic method, which is called a bridge method, as part of the type erasure process. You normally
don't need to worry about bridge methods, but you might be puzzled if one appears in a stack trace.

After type erasure, the Node and `MyNode` classes become:
```java
public class Node {

    public Object data;

    public Node(Object data) { 
      this.data = data;
    }

    public void setData(Object data) {
        System.out.println("Node.setData");
        this.data = data;
    }
}
```

```java
public class MyNode extends Node {

    public MyNode(Integer data) {
      super(data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```
After type erasure, the method signatures do not match; the `Node.setData(T)` method becomes `Node.setData(Object)`. As a 
result, the `MyNode.setData(Integer)` method does not override the `Node.setData(Object)` method.

To solve this problem and preserve the polymorphism of generic types after type erasure, the Java compiler generates a
bridge method to ensure that subtyping works as expected.

For the `MyNode` class, the compiler generates the following bridge method for `setData`:
```java
class MyNode extends Node {

    // Bridge method generated by the compiler
    public void setData(Object data) {
        setData((Integer) data);
    }

    public void setData(Integer data) {
        System.out.println("MyNode.setData");
        super.setData(data);
    }
}
```
The bridge method `MyNode.setData(object)` delegates to the original `MyNode.setData(Integer)` method. As a result,
the `n.setData("Hello");` statement calls the method `MyNode.setData(Object)`, and a `ClassCastException` is thrown because
`"Hello"` can't be cast to `Integer`.
