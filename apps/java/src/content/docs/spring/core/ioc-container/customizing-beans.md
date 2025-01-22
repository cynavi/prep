---
title: Customizing Beans
---

Spring offers extensive capabilities to customize the nature and behavior of beans. This is achieved through various approaches, including
the `FactoryBean` interface, lifecycle callback interfaces (`InitializingBean`, `DisposableBean`), and annotations like `@PostConstruct`
and `@PreDestroy`.

- `FactoryBean` provides abstraction for creating complex beans, with the ability to customize behavior dynamically.
- Lifecycle interfaces (`InitializingBean`, `DisposableBean`) provide explicit control but can lead to tighter coupling with Spring.
- JSR-250 annotations (`@PostConstruct`, `@PreDestroy`) offer a simpler, more declarative alternative.
- XML and Java configurations support `init-method` and `destroy-method` as flexible options for lifecycle management.

---

## 1. FactoryBean
The `FactoryBean` interface provides a way to programmatically create complex objects. Instead of directly defining the bean, 
a `FactoryBean` allows you to control the instantiation logic.

### Key Features
- Allows returning different types of beans or the same bean with varying states.
- Facilitates integration with legacy systems or third-party libraries where instantiation is non-trivial.

### Important Methods
- `Object getObject()`: Produces the bean instance.
- `Class<?> getObjectType()`: Specifies the type of bean.
- `boolean isSingleton()`: Indicates if the bean is a singleton.

### Example
```java
public class MyFactoryBean implements FactoryBean<MyBean> {
    @Override
    public MyBean getObject() throws Exception {
        return new MyBean("Custom Initialization");
    }

    @Override
    public Class<?> getObjectType() {
        return MyBean.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }
}
```

### Notes
- `FactoryBean` can be used in XML or Java configuration.
- To access the `FactoryBean` itself, prefix the bean name with `&`.

### When to Use
- Complex object creation requiring additional logic.
- Adapting third-party or legacy library objects to Spring's lifecycle.

---

## 2. Lifecycle Interfaces: InitializingBean and DisposableBean

Spring provides lifecycle interfaces for explicit control over bean initialization and destruction.

### InitializingBean
Defines the `afterPropertiesSet` method for custom initialization after property injection.

#### Example
```java
public class MyBean implements InitializingBean {
    private String name;

    public void setName(String name) {
        this.name = name;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        System.out.println("InitializingBean: Properties set for " + name);
    }
}
```

### DisposableBean
Defines the `destroy` method for custom cleanup during bean destruction.

#### Example
```java
public class MyBean implements DisposableBean {
    @Override
    public void destroy() throws Exception {
        System.out.println("DisposableBean: Cleaning up resources.");
    }
}
```

### Notes
- Recommended to use annotations (`@PostConstruct`, `@PreDestroy`) over these interfaces for simplicity.
- Alternatives include specifying `init-method` and `destroy-method` in XML/Java configurations.

### When to Use
- When precise control over initialization or cleanup is required.
- Situations where lifecycle methods are tightly coupled with bean logic.

---

## 3. Lifecycle Annotations: @PostConstruct and @PreDestroy

Spring supports JSR-250 annotations for managing bean lifecycle in a declarative manner.

### @PostConstruct
Executes the annotated method after dependency injection is complete.

#### Example
```java
@Component
public class MyBean {
    @PostConstruct
    public void init() {
        System.out.println("@PostConstruct: Initialization logic.");
    }
}
```

### @PreDestroy
Executes the annotated method before the bean is destroyed.

#### Example
```java
@Component
public class MyBean {
    @PreDestroy
    public void cleanup() {
        System.out.println("@PreDestroy: Cleanup logic.");
    }
}
```

### Notes
- Part of the JSR-250 specification.
- Preferred for declarative lifecycle management due to simplicity and reduced coupling.

---

## 4. Combining Techniques

Advanced scenarios may require combining multiple techniques, such as using `FactoryBean` with lifecycle annotations or interfaces.

### Example
```java
public class AdvancedFactoryBean implements FactoryBean<MyBean>, InitializingBean, DisposableBean {
    private MyBean instance;

    @Override
    public MyBean getObject() throws Exception {
        return instance;
    }

    @Override
    public Class<?> getObjectType() {
        return MyBean.class;
    }

    @Override
    public boolean isSingleton() {
        return true;
    }

    @Override
    public void afterPropertiesSet() throws Exception {
        instance = new MyBean("Initialized through FactoryBean");
    }

    @Override
    public void destroy() throws Exception {
        System.out.println("Cleaning up resources for FactoryBean instance");
    }
}
```

---

## 5. Best Practices

1. **Prefer Annotations:** Use `@PostConstruct` and `@PreDestroy` for lifecycle management unless explicit control is necessary.
2. **Leverage FactoryBeans:** Utilize `FactoryBean` for complex or legacy integration scenarios.
3. **Minimize Coupling:** Avoid tight coupling between beans and Spring-specific interfaces where possible.

---
