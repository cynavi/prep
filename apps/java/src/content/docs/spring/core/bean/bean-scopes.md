---
title: Bean Scopes
---

Spring supports six primary scopes for beans, with four being specific to web-aware`ApplicationContext`
environments. A `web-aware ApplicationContext` is one that is configured to handle web-specific 
features such as HTTP requests, sessions, and WebSocket interactions, typically found in web 
applications. Additionally, custom scopes can also be implemented. The following table summarizes 
these scopes:

| Scope       | Description |
|-------------|-------------|
| **singleton** | (Default) A single instance per Spring IoC container. |
| **prototype** | Creates a new instance for each request. |
| **request**   | A single instance per HTTP request (web-aware only). |
| **session**   | A single instance per HTTP session (web-aware only). |
| **application** | A single instance per `ServletContext` (web-aware only). |
| **websocket** | A single instance per WebSocket session (web-aware only). |

## Singleton Scope
The **singleton** scope ensures that only one shared instance of a bean exists within a Spring IoC 
container. All requests for the bean by ID return the same instance.

### Example
In XML configuration:
```xml
<bean id="accountService" class="com.something.DefaultAccountService"/>
```
This is equivalent to explicitly specifying the scope:
```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="singleton"/>
```

### Real Use Case
Consider a logging service or configuration manager shared across an application. For example, a 
`LoggerService` can be implemented as a singleton to ensure consistent and thread-safe logging 
throughout the application.

---

## Prototype Scope
The **prototype** scope creates a new bean instance for every request. This scope is ideal for stateful
beans.

### Example
In XML configuration:
```xml
<bean id="accountService" class="com.something.DefaultAccountService" scope="prototype"/>
```

### Real Use Case
For instance, a user session handler where each user interaction requires a fresh handler object to 
manage temporary state. For example, a `ReportGenerator` class that generates customized reports for 
each request can benefit from the prototype scope.

**Note:** Spring does not manage the entire lifecycle of prototype-scoped beans. Initialization 
lifecycle callbacks are invoked, but destruction lifecycle callbacks are not. The client code must 
handle cleanup and resource release. For example, a prototype bean holding expensive database 
connections should release them explicitly when no longer needed.

---

Moving on to the Web-Specific Scopes

## Request Scope
The **request** scope creates a bean instance for each HTTP request.

### Example
```xml
<bean id="loginAction" class="com.something.LoginAction" scope="request"/>
```

### Real Use Case
A login form handler where the form data is specific to each user request. For example, a
`LoginFormHandler` bean can store and validate user credentials during an HTTP request.

---

## Session Scope
The **session** scope creates a bean instance for the duration of an HTTP session.

### Example
```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session"/>
```

### Real Use Case
A shopping cart object that persists across multiple requests during a user’s session. For instance,
an `ECommerceCart` bean can store selected items until the user checks out or ends the session.

---

## Application Scope
The **application** scope ties the bean lifecycle to the `ServletContext`.

### Example
```xml
<bean id="appPreferences" class="com.something.AppPreferences" scope="application"/>
```
### Real Use Case
Application-wide settings or resources shared across the entire web application, such as a 
`GlobalSettings` bean holding application metadata or configurations.

---

## WebSocket Scope
The **websocket** scope creates a bean instance for the duration of a WebSocket session. This is 
useful for applications using STOMP over WebSocket.

More: https://docs.spring.io/spring-framework/reference/web/websocket/stomp/scope.html

### Real Use Case
For example, a `ChatSessionHandler` bean could manage the state and messages of a WebSocket-based
chat session.

---

## Scoped Proxies
To safely inject shorter-lived scoped beans (e.g., request or session) into longer-lived beans 
(e.g., singleton), Spring provides scoped proxies.

### Example
```xml
<bean id="userPreferences" class="com.something.UserPreferences" scope="session">
    <aop:scoped-proxy/>
</bean>

<bean id="userService" class="com.something.SimpleUserService">
    <property name="userPreferences" ref="userPreferences"/>
</bean>
```
Here, the `userPreferences` bean is proxied, ensuring each HTTP session gets the correct instance. When
the singleton `userService` accesses `userPreferences`, it interacts with the correct session-specific
instance.

---

## Custom Scopes
Spring allows the creation of custom scopes by implementing the
`org.springframework.beans.factory.config.Scope` interface. For example, in a microservices architecture,
you might need a custom scope to manage beans specific to a particular tenant. This can be achieved by
creating a `TenantScope` that binds beans to a tenant identifier, ensuring that each tenant gets a 
unique instance of the required beans during its lifecycle. This approach is particularly useful in 
multi-tenant applications where resources need to be isolated per tenant.

### Example Implementation
```java
public class ThreadScope implements Scope {
    private ThreadLocal<Map<String, Object>> threadScope = ThreadLocal.withInitial(HashMap::new);

    @Override
    public Object get(String name, ObjectFactory<?> objectFactory) {
        return threadScope.get().computeIfAbsent(name, k -> objectFactory.getObject());
    }

    @Override
    public Object remove(String name) {
        return threadScope.get().remove(name);
    }

    @Override
    public void registerDestructionCallback(String name, Runnable callback) {
        // No-op for thread scope
    }

    @Override
    public String getConversationId() {
        return Thread.currentThread().getName();
    }
}
```
### Registering Custom Scope
```java
ConfigurableBeanFactory beanFactory = applicationContext.getBeanFactory();
beanFactory.registerScope("thread", new ThreadScope());
```

### Real Use Case
A thread-specific logger where each thread requires its own instance to isolate logging contexts. For
example, a `ThreadLocalLogger` could store logs specific to each thread's operations.

---
