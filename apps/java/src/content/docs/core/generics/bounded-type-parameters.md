---
title: Bounded type parameters
---

Bounded parameters means restricting the types that can be used as generic type arguments.

To force generic type to be a subclass of Shirt.
```java
public class Drawer<T extends Shirt> {
  
  public void add(T shirt) {
  }
}
```
`extends` forces `T` to be a subclass of `Shirt`. 
```java
// usage
Drawer<Shirt> shirtDrawer = new Drawer<>();
```

## Multiple bounded type parameter
```java
public class Drawer<T extends Shirt & Comparable> {
}
```
Here, `Shirt` is class and `Comparable` is an interface. So, the type now must respect both upper bounds.

>*If one of the upper bounds is a class, it must be first argument.*
