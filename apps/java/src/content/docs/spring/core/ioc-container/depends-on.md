---
title: Using depends-on
---

At the end of this section, you should know
- How to explicitly force certain beans to be initialized before the required bean?
- What's the bean destruction order when `depends-on` or `@DependsOn` is used?
- How does `depends-on` influence the initialization and shutdown order?

---

Sometimes dependencies between beans are less direct. An example is when a static initializer in a class
needs to be triggered, such as for database driver registration. The `depends-on` attribute or
`@DependsOn` annotation can explicitly force one or more beans to be initialized before the bean using
this element is initialized. 

## XML Configuration
```xml
<bean id="beanOne" class="ExampleBean" depends-on="manager,accountDao">
  <property name="manager" ref="manager" />
</bean>

<bean id="manager" class="ManagerBean" />
<bean id="accountDao" class="x.y.jdbc.JdbcAccountDao" />
```

## Annotation Configuration
```java
@Configuration
public class AppConfig {

    @Bean
    @DependsOn({"manager", "accountDao"})
    public ExampleBean beanOne(@Autowired ManagerBean manager, @Autowired JdbcAccountDao accountDao) {
        ExampleBean exampleBean = new ExampleBean();
        exampleBean.setManager(manager);
        return exampleBean;
    }

    @Bean
    public ManagerBean manager() {
        return new ManagerBean();
    }

    @Bean
    public JdbcAccountDao accountDao() {
        return new JdbcAccountDao();
    }
}

```

This annotation ensures that the specified beans (`manager` and `accountDao`) are initialized before
`beanOne`.

In addition to controlling initialization order, the `depends-on` attribute (or `@DependsOn` in 
annotation-based configuration) can also influence the shutdown order of beans. This is only relevant
for singleton beans, as these are typically destroyed when the application context is closed.

`@DependsOn` (or `depends-on`) ensures that beans that declare a dependency on others are destroyed 
after the beans they depend on. This can be important for resource management or cleanup processes. 
For example, a bean that manages resources (like a connection pool or file stream) may need to be 
destroyed before beans that rely on those resources to avoid resource leaks.

In above example, `beanOne` will be destroyed after `manager` and `accountDao` when the application
context is shut down.

---
