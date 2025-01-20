---
title: Dependency Injection
---

At the end of this section, you should know
- How to instantiate bean?
- What is circular dependency and its resolution?
- Constructor-based DI vs setter-based DI and when to prefer which

---

Dependency Injection (DI) is a process where objects declare their dependencies via constructor
arguments, factory method arguments, or properties. These dependencies are injected by the Spring 
container, reversing the control from the object managing its dependencies (Inversion of Control).

Using DI leads to cleaner, more testable code by decoupling objects. Dependencies are typically 
defined as interfaces or abstract classes, enabling the use of stubs or mocks in unit tests.

Spring supports two DI variants:

1. **Constructor-based DI**
2. **Setter-based DI**

---

## Constructor-based Dependency Injection
The Spring container invokes a constructor with arguments representing dependencies. Example:

### Java Class
```java
public class SimpleMovieLister {
    private final MovieFinder movieFinder;

    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

### XML Configuration
```xml
<bean id="movieFinder" class="com.example.MovieFinder" />
<bean id="movieLister" class="com.example.SimpleMovieLister">
    <constructor-arg ref="movieFinder" />
</bean>
```

### Annotation Configuration
```java
@Component
public class SimpleMovieLister {
    private final MovieFinder movieFinder;

    @Autowired
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```
If a bean is a dependency of another bean, that usually means that one bean is set as a property of
another. Typically, you accomplish this with the `<ref/>` element in XML-based metadata or through 
autowiring.

### Resolving Constructor Arguments
- **By Type**: Spring matches arguments by their type.
- **By Index**: Explicitly specify argument positions.
- **By Name**: Use the `name` attribute in XML or parameter names annotated with `@ConstructorProperties`.

### Example
#### Java Class
```java
public class ExampleBean {
    private final int years;
    private final String answer;

    public ExampleBean(int years, String answer) {
        this.years = years;
        this.answer = answer;
    }
}
```

#### XML Configuration
```xml
<bean id="exampleBean" class="com.example.ExampleBean">
    <constructor-arg name="years" value="42" />
    <constructor-arg name="answer" value=""The Answer" />
</bean>
```

#### Annotation Configuration
```java
@Component
public class ExampleBean {
    private final int years;
    private final String answer;

    @Autowired
    public ExampleBean(@Value("42") int years, @Value("The Answer") String answer) {
        this.years = years;
        this.answer = answer;
    }
}
```
---

## Setter-based Dependency Injection
The Spring container calls setter methods to inject dependencies after invoking a no-argument constructor.

### Java Class
```java
public class SimpleMovieLister {
    private MovieFinder movieFinder;

    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```

### XML Configuration
```xml
<bean id="movieFinder" class="com.example.MovieFinder" />
<bean id="movieLister" class="com.example.SimpleMovieLister">
    <property name="movieFinder" ref="movieFinder" />
</bean>
```

### Annotation Configuration
```java
@Component
public class SimpleMovieLister {
    private MovieFinder movieFinder;

    @Autowired
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
}
```
---

## Constructor vs. Setter Injection
- Use **constructor injection** for mandatory dependencies. This approach ensures immutability and that
all required dependencies are set at initialization.
- Use **setter injection** for optional dependencies or when reconfiguration is needed.

---

## Circular Dependencies
Circular dependencies (e.g., A depends on B and B depends on A) are problematic with constructor 
injection but can be resolved with setter injection. Spring detects circular references and throws
a `BeanCurrentlyInCreationException` when they are unresolvable.

One possible solution is to edit the source code of some classes to be configured by setters rather than
constructors. Alternatively, avoid constructor injection and use setter injection only. In other words,
although it is not recommended, you can configure circular dependencies with setter injection.

Unlike the typical case (with no circular dependencies), a circular dependency between bean A and bean B
forces one of the beans to be injected into the other prior to being fully initialized itself (a 
classic chicken-and-egg scenario).

---

## Dependency Injection Examples

### XML Example
```xml
<bean id="exampleBean" class="com.example.ExampleBean">
    <property name="beanOne" ref="anotherExampleBean" />
    <property name="beanTwo" ref="yetAnotherBean" />
    <property name="integerProperty" value="1" />
</bean>

<bean id="anotherExampleBean" class="com.example.AnotherBean" />
<bean id="yetAnotherBean" class="com.example.YetAnotherBean" />
```

### Annotation Example
```java
@Component
public class ExampleBean {
    private AnotherBean beanOne;
    private YetAnotherBean beanTwo;
    private int integerProperty;

    @Autowired
    public void setBeanOne(AnotherBean beanOne) {
        this.beanOne = beanOne;
    }

    @Autowired
    public void setBeanTwo(YetAnotherBean beanTwo) {
        this.beanTwo = beanTwo;
    }

    @Value("1")
    public void setIntegerProperty(int integerProperty) {
        this.integerProperty = integerProperty;
    }
}
```

---

## Best Practices
1. Favor **constructor injection** for required dependencies.
2. Use **setter injection** for optional dependencies.
3. Keep DI configurations minimal and focused.
4. Avoid circular dependencies where possible.

---
