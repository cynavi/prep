---
title: Naming Beans
---

Every bean has one or more identifiers. These identifiers must be unique within the container that hosts
the bean. A bean usually has only one identifier. However, if it requires more than one, the 13 extra 
ones can be considered aliases.

## XML Based Configuration
In XML-based configuration metadata, each bean has one or more identifiers. These identifiers must be 
unique within the container that hosts the bean. Typically, a bean has a single identifier, but if 
additional identifiers are needed, they can be considered aliases (up to 13 extra aliases).

To specify bean identifiers, you can use the id attribute, the name attribute, or both:
- The `id` attribute allows you to specify exactly one identifier for the bean.
- The `name` attribute enables you to specify multiple identifiers (aliases) for the same bean, separated
by commas (,), semicolons (;), or white spaces.

Example:
```xml
<bean id="myBean" name="alias1, alias2; alias3">
<!-- Bean definition -->
</bean>
```
Here, myBean is the primary identifier, while `alias1`, `alias2`, and `alias3` are additional aliases.

Identifiers and aliases are conventionally alphanumeric (e.g., `myBean`, `someService`), but they can
include special characters.

## Annotation Based Configuration
In annotation-based configuration, you use Spring annotations such as `@Component`, `@Service`, 
`@Repository`, or `@Controller` to define beans. By default, the identifier for a bean is derived from
the class name, with the first letter converted to lowercase (e.g., `MyBean` becomes `myBean`).

However, in the (unusual) special case when there is more than one character and both the first
and second characters are upper case, the original casing gets preserved. These are
the same rules as defined by `java.beans.Introspector.decapitalize` (which Spring uses).

You can explicitly define a unique identifier for the bean by providing a value within the annotation:
```java
@Component("customBeanId")
public class MyBean {
// Bean implementation
}
```

In this example, the bean identifier is `customBeanId`.

If you need to define additional aliases for the bean, you can use the `@AliasFor` annotation with 
custom annotations or define multiple names explicitly using the `@Bean` annotation in a configuration
class:
```java
@Configuration
public class AppConfig {
  
    @Bean(name = {"primaryBeanId", "alias1", "alias2"})
    public MyBean myBean() {
        return new MyBean();
    }
}
```

Here:
- `primaryBeanId` is the main identifier.
- `alias1` and `alias2` are additional aliases.

As in XML-based configuration, identifiers and aliases must be unique within the application context and 
can contain special characters if necessary.
