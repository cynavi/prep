---
title: Spring IoC Container
---

The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container
and is responsible for instantiating, configuring, and assembling the beans. The container gets its
instructions on what objects to instantiate, configure, and assemble by reading configuration
metadata. The configuration metadata is represented in XML, Java annotations, or Java code.

## Configuration Metadata
Spring IoC container consumes a form of configuration metadata. This configuration metadata represents
how you, as an application developer, tell the Spring container to instantiate, configure, and assemble
the objects in your application.

- **XML-based configuration**: XML-based configuration metadata configures these beans as `<bean/>`
elements inside a top-level `<beans/>` element.

- **Annotation-based configuration**: It relies on the bytecode metadata for wiring up components.
Example: The `AutowiredAnnotationBeanPostProcessor`, using a `BeanPostProcessor` in conjunction with
annotations is a common means of extending the Spring IoC container. For example, Spring 2.5
introduced an annotation-based approach to drive Spring’s dependency injection. Essentially, the
`@Autowired` annotation provides the same capabilities as described in Autowiring Collaborators but
with more fine-grained control and wider applicability.

- **Java-based configuration**: You can define beans external to your application classes by using
Java rather than XML files. To use these new features, see the @Configuration, `@Bean`, `@Import`, 
and `@DependsOn` annotations.

## Instantiating a Container
The location path or paths supplied to an `ApplicationContext` constructor are resource strings that
let the container load configuration metadata from a variety of external resources, such as the local
file system, the Java `CLASSPATH`, and so on.

```java
ApplicationContext context = new ClassPathXmlApplicationContext("config.xml", "daos.xml");
PetStoreService service = context.getBean("petStore", PetStoreService.class);
```
## Composing XML-based Configuration Metadata
It can be useful to have bean definitions span multiple XML files. Often, each individual XML
configuration file represents a logical layer or module in your architecture.

The following example shows the`config.xml` configuration file:
```xml
<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
  xsi:schemaLocation="http://www.springframework.org/schema/beans
  https://www.springframework.org/schema/beans/spring-beans.xsd">
  <!-- services -->
    <import resource="services.xml"/>
    <import resource="resources/messageSource.xml"/>
    <import resource="/resources/themeSource.xml"/>
    <bean id="bean1" class="..."/>
    <bean id="bean2" class="..."/>
</beans>
```
Avoid using relative "../" path and fully qualified resource locations like
`file:C:/config/services.xml` or `classpath:/config/services.xml`. It is generally preferable to
keep an indirection for such absolute locations — for example, through "${…}" placeholders that are 
resolved against JVM system properties at runtime.


