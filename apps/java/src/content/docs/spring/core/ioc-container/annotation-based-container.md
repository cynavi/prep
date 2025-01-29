---
title: Annotation-based Container
---

- How does annotation based container works?
- What is BeanPostProcessor and how does it allow for direct modification of beans?
- How are several default BeanPostProcessors (ConfigurationClassPostProcessor, AutowiredAnnotationBeanPostProcessor,
CommonAnnotationBeanPostProcessor, PersistenceAnnotationBeanPostProcessor, EventListenerMethodProcessor) registered?

---
## BeanPostProcessor

Spring uses `BeanPostProcessor` in conjunction with annotations to make the core IOC container aware of specific 
annotations. `BeanPostProcessor` interface enables modification to bean instances before and after initialization.
Spring provides multiple built-in implementation of `BeanPostProcessor` to handle specific annotations and
configuration, making annotation-based dependency injection possible.

`BeanPostProcessor` interface defines callback methods that you can implement to provide your own (or override the
container's default) instantiation logic, dependency resolution logic, and so forth. 

```java
public interface BeanPostProcessor {

	default @Nullable Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

	default @Nullable Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
		return bean;
	}

}
```

### How does `BeanPostProcessor` work?
- **Bean Instantiation**: `BeanPostProcessor` instances operates on bean instances. That is, the Spring IoC container
instantiates a bean instance and then `BeanPostProcessor` instances do their work.

- **Dependency Injection**: If applicable, Spring injects dependencies into the bean using constructor, setter,
or field injection.

- **`postProcessBeforeInitialization`**: This method is called before the bean's initialization callbacks (e.g.,
`@PostConstruct`, `afterPropertiesSet` from `InitializingBean`). It allows modifications such as custom proxy wrapping
or default property setting. The returned bean instance may be a wrapper around the original.

- **Initialization Phase**: If the bean implements `InitializingBean`, its `afterPropertiesSet()` method is called. 
If annotated with `@PostConstruct`, that method runs.

- **`postProcessAfterInitialization`**: This method is called after initialization, allowing for further modifications,
such as adding AOP proxies or registering the bean with other components. The returned bean instance may be a wrapper
around the original. In case of a `FactoryBean`, this callback will be invoked for both the `FactoryBean` instance
and the objects created by the `FactoryBean` (as of Spring 2.0). The post-processor can decide whether to apply to 
either the `FactoryBean` or created objects or both through corresponding `bean instanceof FactoryBean` checks.
This callback will also be invoked after a short-circuiting triggered by a
`InstantiationAwareBeanPostProcessor#postProcessBeforeInstantiation` method, in contrast to all other 
`BeanPostProcessor` callbacks.

- The fully configured bean is now available for use within the application context.

`BeanPostProcessor` instances are scoped per-container. This is relevant only if you use container hierarchies. If 
you define a BeanPostProcessor in one container, it post-processes only the beans in that container. In other words,
beans that are defined in one container are not post-processed by a `BeanPostProcessor` defined in another container,
even if both containers are part of the same hierarchy.


>*If you write your own `BeanPostProcessor`, you should consider implementing the `Ordered` interface too.
To change the actual bean definition (that is, the blueprint that defines the bean), you instead need to use a
`BeanFactoryPostProcessor`.*

### Example of Custom `BeanPostProcessor`
A simple implementation of `BeanPostProcessor` that modifies bean properties before initialization:

```java
@Component
public class CustomBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        if (bean instanceof SomeBean) {
            ((SomeBean) bean).setSomeProperty("Modified by BeanPostProcessor");
        }
        return bean;
    }
 
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        return bean;
    }
}
```
---
## Built-in BeanPostProcessor Implementations in Spring
Spring provides several `BeanPostProcessor` implementations that process annotations and configure beans dynamically.

### `ConfigurationClassPostProcessor`
- **Purpose**: Processes `@Configuration` and `@Bean` annotations to register additional bean definitions.
- **Implementation**:
  - Scans for `@Configuration` classes.
  - Parses methods annotated with `@Bean`.
  - Registers bean definitions dynamically.

#### **Relevant Code (Excerpt from Spring Source)**
```java
public class ConfigurationClassPostProcessor implements BeanFactoryPostProcessor {
    @Override
    public void postProcessBeanFactory(ConfigurableListableBeanFactory beanFactory) {
        // Scan and process @Configuration classes
        processConfigBeanDefinitions(beanFactory);
    }
}
```
### `AutowiredAnnotationBeanPostProcessor`
- **Purpose**: Handles `@Autowired` and `@Value` dependency injection.
- **Implementation**:
  - Scans for `@Autowired` fields and methods.
  - Uses reflection to inject dependencies.
  - Supports constructor and setter injection.

#### **Relevant Code (Excerpt from Spring Source)**
```java
public class AutowiredAnnotationBeanPostProcessor implements InstantiationAwareBeanPostProcessor {
    @Override
    public PropertyValues postProcessPropertyValues(PropertyValues pvs, PropertyDescriptor[] pds, Object bean, String beanName) {
        // Resolve @Autowired dependencies
        injectAutowiredDependencies(bean, beanName);
        return pvs;
    }
}
```

### `CommonAnnotationBeanPostProcessor`
- **Purpose**: Supports JSR-250 annotations like `@PostConstruct` and `@PreDestroy`.
- **Implementation**:
  - Detects lifecycle annotations (`@PostConstruct`, `@PreDestroy`).
  - Calls the respective methods at the correct lifecycle stage.

#### **Relevant Code (Excerpt from Spring Source)**
```java
public class CommonAnnotationBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // Invoke @PostConstruct methods
        invokeInitMethods(bean);
        return bean;
    }
 
    @Override
    public void postProcessBeforeDestruction(Object bean, String beanName) {
        // Invoke @PreDestroy methods
        invokeDestroyMethods(bean);
    }
}
```

### `PersistenceAnnotationBeanPostProcessor`
- **Purpose**: Processes JPA-related annotations like `@PersistenceContext`.
- **Implementation**:
  - Injects `EntityManager` instances into beans marked with `@PersistenceContext`.

#### **Relevant Code (Excerpt from Spring Source)**
```java
public class PersistenceAnnotationBeanPostProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) {
        // Inject EntityManager for @PersistenceContext
        processPersistenceAnnotations(bean);
        return bean;
    }
}
```

### `EventListenerMethodProcessor`
- **Purpose**: Enables `@EventListener` to register event listeners dynamically.
- **Implementation**:
  - Scans for methods annotated with `@EventListener`.
  - Registers event listeners with the `ApplicationEventMulticaster`.

#### **Relevant Code (Excerpt from Spring Source)**
```java
public class EventListenerMethodProcessor implements BeanPostProcessor {
    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) {
        // Register event listener methods
        processEventListenerMethods(bean);
        return bean;
    }
}
```
 
---

## How These PostProcessors Are Registered
Spring automatically registers these post-processors when annotation-based configuration is enabled.

### **Implicit Registration via `AnnotationConfigApplicationContext`**
```java
AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
```
- This automatically registers necessary post-processors.

### **Explicit Registration in XML Configuration**
```xml
<context:annotation-config/>
```

### With Spring Boot
`@SpringBootApplication` is the key entry point. When Spring Boot starts up, it automatically configures the 
application context using the `@EnableAutoConfiguration` annotation.

Spring Boot scans the classpath and automatically registers beans, including post-processors, based on the presence
of specific libraries or annotations. For example, if Spring Boot detects that `spring-boot-starter-data-jpa` is in
the classpath, it will register the `PersistenceAnnotationBeanPostProcessor` for handling persistence-related annotations.

1. **`ConfigurationClassPostProcessor`**
- This is registered by Spring Boot through the `@EnableAutoConfiguration` mechanism.
- The `ConfigurationClassPostProcessor` is part of the internal Spring context, and it's automatically registered by
Spring Boot when it starts up. It is registered as a `@Bean` in Spring's internal context configuration. 
- Spring Boot's internal configuration class, SpringApplication, indirectly enables this by invoking the
`AnnotationConfigApplicationContext` (which is triggered by Spring Boot's `@SpringBootApplication`), which triggers the
post-processor registration.

2. **`AutowiredAnnotationBeanPostProcessor`**
- This processor is automatically registered by Spring during the application context initialization phase, 
specifically when the `AnnotationConfigApplicationContext` is initialized .
- Spring Boot behavior: When Spring Boot starts, `@EnableAutoConfiguration` ensures that the 
`AutowiredAnnotationBeanPostProcessor` is registered, which allows for automatic dependency injection using `@Autowired`.

3. **`CommonAnnotationBeanPostProcessor`**
- This is also registered automatically as part of the Spring container initialization. It is included in Spring Boot's
auto-configuration and is added to the `ApplicationContext` as part of the default configuration.
- When the context is created, `CommonAnnotationBeanPostProcessor` is registered to handle annotations that require
lifecycle processing (like `@PostConstruct`). The post-processor is defined in the `AnnotationConfigApplicationContext`.

4. **`PersistenceAnnotationBeanPostProcessor`**
- This is automatically registered in Spring Boot when Spring Data JPA or other persistence mechanisms are available
in the classpath.
- Spring Boot’s auto-configuration detects the presence of JPA dependencies (such as Hibernate or Spring Data JPA) and
registers this post-processor if it finds them.
- This happens through `@EnableAutoConfiguration`, which ensures that the correct beans related to persistence are created and that the post-processor is registered to handle injection of persistence-related annotations.

5. **`EventListenerMethodProcessor`**
- This post-processor is automatically registered when Spring Boot starts, and is part of the event handling system.
- Spring Boot enables event handling by registering this processor in the context. This occurs as part of Spring's 
default application context initialization when `@EnableAutoConfiguration` is invoked.
- If Spring Boot detects event-related beans or configurations (such as an `@EventListener`-annotated method), it
automatically wires up this post-processor to handle the event listeners.

---
