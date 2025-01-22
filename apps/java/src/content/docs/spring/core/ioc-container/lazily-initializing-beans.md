---
title: Lazily Initializing Beans
---

By default, `ApplicationContext` implementations eagerly create and configure all singleton beans as part
of the initialization process. Generally, this pre-instantiation is desirable, because errors in the 
configuration or surrounding environment are discovered immediately, as opposed to hours or even days 
later. When this behavior is not desirable, you can prevent pre-instantiation of a singleton bean by 
marking the bean definition as being lazy-initialized. A lazy-initialized bean tells the IoC container 
to create a bean instance when it is first requested, rather than at startup.

This behavior is controlled by the `@Lazy` annotation or in XML the `lazy-init` attribute on the
`<bean/>` element.

```java
@Bean
@Lazy
ExpensiveToCreateBean lazy() {
    return new ExpensiveToCreateBean();
}

@Bean
AnotherBean notLazy() {
    return new AnotherBean();
}
```
```xml
<bean id="lazy" class="com.something.ExpensiveToCreateBean" lazy-init="true"/>

<bean name="notLazy" class="com.something.AnotherBean"/>
```

When the preceding configuration is consumed by an `ApplicationContext`, the `lazy` bean is not eagerly
pre-instantiated when the `ApplicationContext` starts, whereas the `notLazy` one is eagerly 
pre-instantiated.

It is also possible to control lazy-initialization for a set of beans by using the `@Lazy` annotation
on `@Configuration` annotated class or in XML using the `default-lazy-init` attribute on the
`<beans/>` element.
```java
@Configuration
@Lazy
public class LazyConfiguration {
	// No bean will be pre-instantiated...
}
```
```xml
<beans default-lazy-init="true">
  <!-- No bean will be pre-instantiated... -->
</beans>
```

## Lazy Initialization of a Lazy Bean in an Eager Singleton with Proxies
**Question**

How does Spring handle lazy initialization, when a lazy bean is a dependency of a non-lazy singleton
bean? How does Spring create and manage proxies in this scenario?

**Scenario**
- Bean A is a singleton.
- Bean B is lazy and is a dependency of Bean A.

If a bean is lazy, Spring typically uses a proxy to handle the bean's lazy initialization.
The proxy will delay the actual initialization of the bean until one of its methods is invoked. 
In some cases, Spring uses CGLIB (if the bean class is not an interface) or JDK dynamic proxies 
(if the bean implements an interface).

**Steps Spring Takes**
- **Bean Definition and Context Setup**: When Spring initializes the context, it recognizes that
Bean A is a singleton, and Bean B is lazy. Bean A will be instantiated immediately, but Bean B will
not be created at this point.

- **Proxy for Lazy Bean**: Since Bean B is lazy, Spring creates a proxy for Bean B. This proxy acts 
as a placeholder for the actual bean. When any method of Bean B is called, the proxy will trigger 
the initialization of the actual Bean B. In some cases, Spring uses CGLIB (if the bean class is not an
interface) or JDK dynamic proxies (if the bean implements an interface).

- **Dependency Injection**: Bean A, which is a singleton and non-lazy, will have Bean B injected 
into it. Spring does not inject the actual instance of Bean B immediately; instead, it injects the 
proxy of Bean B. This proxy will handle the lazy initialization of Bean B when required.

- **Triggering Initialization**: When Bean A calls any method of Bean B (e.g., through a method or a
property), the proxy for Bean B intercepts this call and triggers the instantiation of the actual 
Bean B at that point.

```java
@Component
public class BeanA {
    private final BeanB beanB;

    @Autowired
    public BeanA(@Lazy BeanB beanB) {
        this.beanB = beanB;
    }

    public void useBeanB() {
        beanB.doSomething();  // Lazy initialization occurs here if not already initialized
    }
}

@Component
public class BeanB {
    public BeanB() {
        System.out.println("BeanB initialized");
    }

    public void doSomething() {
        System.out.println("BeanB is doing something");
    }
}
```
**Explanation**
- BeanA is a singleton, and it has a dependency on `BeanB`, which is marked as `@Lazy`.
- When Spring initializes the application context, `BeanA` is created right away, but `BeanB` is not
initialized at this point. Instead, Spring injects a proxy of `BeanB` into `BeanA`.
- The first time `BeanA` calls any method on `BeanB` (in this case, `useBeanB()` calls 
`beanB.doSomething()`), the proxy intercepts the call and triggers the creation of the actual `BeanB`.
This is the point where `BeanB` gets initialized and the message `BeanB initialized` is printed.

**Proxy Details**
- If `BeanB` is a class, Spring would use **CGLIB** proxies (subclassing `BeanB`).
- If `BeanB` implements an interface, Spring would use a `JDK dynamic proxy` (implementing the same
interface as `BeanB`).
