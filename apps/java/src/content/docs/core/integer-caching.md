---
title: Integer caching
---

## Repharse
- Why 1 == 1 is true but 1000 == 1000 is false when dealing with wrapper classes?

JVM caches object of wrapper classes (`Integer`, `Byte`, `Short`, `Character`, and `Long`) with values in the range `-128` to `127`.

When you assign an `Integer` with a value within this range, you get the same instance from the cache.
```java
Integer a = 1; // cached instance
Integer b = 1; // cached instance
System.out.println(a == b); // true as both refer to same instance
```
When the value is outside the caching range, a new object is created for each assignment.
```java
Integer a = 1000; // cached instance
Integer b = 1000; // cached instance
System.out.println(a == b); // false as both refer to different instance
```
