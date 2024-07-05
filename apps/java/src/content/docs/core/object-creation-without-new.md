---
title: Create an object without using new operator
---

## Using `newInstance()` method
```java
Class c = Class.forName("package.MyClass");
MyClass object = (MyClass) c.newInstance();
```

## Using `clone()` method.
```java
MyClass obj1 = new MyClass();
MyClass obj2 = obj1.clone();
```

## Using object deserialization
```java
ObjectInputStream inStream = new ObjectInputStream(inputStream);
MyClass object = (MyClass) inStream.readObject();
```

## Creating string and array objects
```java
String s = "string";
int[] a = {1, 2, 3, 4};
```

