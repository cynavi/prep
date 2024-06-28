---
title: Multiple inheritance
---

## Rephrase
- What is diamond problem?

## tldr
Java doesn’t support multiple inheritance using class. However, it is possible to mimic multiple inheritance
using interfaces and composition (wrapper classes).

## Multiple inheritance using classes
```java
public class FrontendDeveloper {

    public String whoAmI() {
        return "Frontend Developer";
    }
}

public class BackendDeveloper {

  public String whoAmI() {
    return "Backend Developer";
  }
}

public class Developer extends FrontendDeveloper, BackendDeveloper {

  public static void main(String[] args) {
    Developer developer = new Developer();
    // calling whoAmI() throws compilation error as java cannot determine
    // which whoAmI() method (BackendDeveloper or FrontendDeveloper) should take precedence
    developer.whoAmI();
  }
}
```
One reason why the Java does not permit you to extend more than one class is to avoid the
issues of multiple inheritance of state, which is the ability to inherit fields from multiple classes.

For example, suppose that you are able to define a new class that extends multiple classes. When you create an 
object by instantiating that class, that object will inherit fields from all the class's superclasses.
What if methods or constructors from different superclasses instantiate the same field? Which method or 
constructor will take precedence? Because interfaces do not contain fields, you do not have to worry about
problems that result from multiple inheritance of state.

Multiple inheritance of implementation is the ability to inherit method definitions from multiple classes.
Problems arise with this type of multiple inheritance, such as name conflicts and ambiguity. When compilers 
of programming languages that support this type of multiple inheritance encounter superclasses that contain
methods with the same name, they sometimes cannot determine which member or method to access or invoke. In 
addition, a programmer can unwittingly introduce a name conflict by adding a new method to a superclass.

## Multiple inheritance using interfaces
If both implemented interfaces contain default methods with the same method signature, the implementing class
must explicitly specify which default method is to be used, or it should override the default method in the 
implementing class, or it should specify which default method is to be used in the default overridden method
of the implementing class.

```java
public interface FrontendDeveloper {

    default String whoAmI() {
        return "Frontend developer";
    }

    List<String> techStack();
}

public interface BackendDeveloper {

  default String whoAmI() {
    return "Backend developer";
  }

  List<String> techStack();
}

public class Developer implements FrontendDeveloper, BackendDeveloper {

  public static void main(String[] args) {
    Developer developer = new Developer();
    System.out.println(developer.whoAmI());
  }

  @Override
  public String whoAmI() {
    return FrontendDeveloper.super.whoAmI() + ", " + BackendDeveloper.super.whoAmI();
  }

  @Override
  public List<String> techStack() {
    return List.of("Java", "Spring", "Angular", "SQL");
  }
}
```

## Multiple inheritance using composition
Composition or wrapper classes can also be used to mimic multiple inheritance. Composition does not offer 
interfaces' degree of flexibility and modularity. Method calls must be manually delegated, which might be 
laborious in some situations. 
```java
public class FrontendDeveloper {

    String whoAmI() {
        return "Frontend developer";
    }
}

public class BackendDeveloper {

  public List<String> techStack() {
    return List.of("Java", "SQL", "Kafka", "Spring");
  }
}

public class Developer {

  private FrontendDeveloper frontendDeveloper;
  private BackendDeveloper backendDeveloper;


  public String whoAmI() {
    return frontendDeveloper.whoAmI();
  }

  public List<String> techStack() {
    return backendDeveloper.techStack();
  }
}
```
