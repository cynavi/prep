---
title: Instantiating Beans
---

A bean definition serves as a recipe for creating objects in the Spring container. The container uses
this configuration metadata to create or acquire actual objects. Below are key methods for defining
beans, both using XML and Spring annotations.

---

## Instantiation with Constructor
The container creates a bean by calling its constructor. Classes managed this way do not need to
implement specific interfaces. A default no-argument constructor is often recommended.

### XML Configuration
```xml
<bean id="exampleBean" class="examples.ExampleBean" />
<bean name="anotherExample" class="examples.ExampleBeanTwo" />
```

### Annotation Configuration
```java
@Component
public class ExampleBean {
    public ExampleBean() {
        // Constructor logic
    }
}
```
Use `@ComponentScan` to enable scanning for annotated components.

---

## Instantiation with Static Factory Method

Static factory methods can create beans, often useful for legacy code. The factory class and method are
specified in the configuration.

### XML Configuration
```xml
<bean id="clientService"
      class="examples.ClientService"
      factory-method="createInstance" />
```

### Annotation Configuration
```java
@Configuration
public class AppConfig {
  
    @Bean
    public ClientService clientService() {
        return ClientService.createInstance();
    }
}
```

Example static factory method:
```java
public class ClientService {
  
    private static final ClientService INSTANCE = new ClientService();
    private ClientService() {}

    public static ClientService createInstance() {
        return INSTANCE;
    }
}
```

>*In the case of factory method arguments, the container can select a corresponding method among 
>several overloaded methods of the same name. That said, to avoid ambiguities, it is recommended
>to keep your factory method signatures as straightforward as possible.*
---

## Instantiation with Instance Factory Method
An instance factory method uses an existing bean to create a new one. Specify the factory bean and 
method.

### XML Configuration
```xml
<bean id="serviceLocator" class="examples.DefaultServiceLocator" />
<bean id="clientService"
      factory-bean="serviceLocator"
      factory-method="createClientServiceInstance" />
```

### Annotation Configuration
```java
@Configuration
public class AppConfig {

    @Bean
    public DefaultServiceLocator serviceLocator() {
        return new DefaultServiceLocator();
    }

    @Bean
    public ClientService clientService(DefaultServiceLocator serviceLocator) {
        return serviceLocator.createClientServiceInstance();
    }
}
```

Example factory class:
```java
public class DefaultServiceLocator {
    private final ClientService clientService = new ClientServiceImpl();

    public ClientService createClientServiceInstance() {
        return clientService;
    }
}
```

---

## Nested Classes
For nested classes, use either the binary name (`$`) or source name (`.`).

### Example:
```xml
<bean id="nestedBean" class="com.example.SomeThing$OtherThing" />
```

Using annotations:
```java
@Component
public class SomeThing {
  
    @Component
    public static class OtherThing {
      // Logic
    }
}
```

---

## Bean Runtime Type
The runtime type of bean can differ due to:
- Factory methods
- AOP proxies
- Dependency injection

Use `BeanFactory.getType` to determine a bean's runtime type accurately.

---
