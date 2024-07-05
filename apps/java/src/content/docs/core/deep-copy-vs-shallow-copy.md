---
title: Deep copy vs shallow copy
---

## tldr
Deep copy creates a new reference (or allocates new memory location) whereas shallow copy preserves
old reference. This means when shallow copy of some object is done to create another object then 
changes in one object is reflected in the another object as well.

## Shallow copy
Shallow copy is quicker because it just copies the reference. Since object is created based on reference
changes made on one copy is reflected on all other copies. In shallow copy, new memory allocation never
happens for the other object.
```java
public class Test {
  
    int number;

    public Test(int number) {
        this.number = number;
    }
}

public class Main {

    public static void main(String[] args) {
        Test test = new Test(3);
        Test copy = test; // copies the reference, not value
        copy.number = 6;
        System.out.println("Original: " + test.number);
        System.out.println("Copy: " + copy.number);
    }
}
```

## Deep copy
In deep copy, a new memory allocation happens whenever object is created based on original object.
Each object has its own independent reference.
```java
public static void main(String[] args) {
    Test test = new Test(3);
    Test copy = new Test(test.number); // copies the reference, not value
    copy.number = 6;
    System.out.println("Original: " + test.number);
    System.out.println("Copy: " + copy.number);
}
```

## Resources
- https://www.baeldung.com/cs/deep-vs-shallow-copy
- https://www.javatpoint.com/shallow-copy-vs-deep-copy-in-java
