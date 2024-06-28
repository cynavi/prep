---
title: Reference vs value comparison (== vs equals())
---

- `equals()` compares values of an objects
- `==` is a reference comparison, i.e. both objects point to the same memory location

```java
public class Main {
    public static void main(String[] args) {
        String s1 = "Hi";
        String s2 = "Hi";
        String s3 =  new String("Hi");
 
        System.out.println(s1 == s2); // true, both s1 and s2 refer to the same objects
        System.out.println(s1 == s3); // false, as it's comparing reference and new String("Hi") creates new object
        System.out.println(s1.equals(s2)); // true, as it’s only comparing the values given in s1 and s2
        System.out.println(s1.equals(s3)); // true, as it’s only comparing the values given in s1 and s3
    }
}
```
