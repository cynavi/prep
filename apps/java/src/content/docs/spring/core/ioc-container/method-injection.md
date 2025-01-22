---
title: Method Injection
---

In most application scenarios, beans in a Spring container are often singletons. This means that only
one instance of a bean is created and shared throughout the application. However, sometimes you may 
need a singleton bean to collaborate with a non-singleton (prototype) bean. For example, you may want
a singleton bean to use a fresh instance of a prototype bean every time a method is invoked. 

---
## The Problem
When a singleton bean (A) depends on a prototype bean (B), the container creates the singleton bean 
only once and injects the prototype dependency into it. However, this means the same instance of the 
prototype bean will be reused, which may not meet your requirements if a new instance of the prototype
bean is needed for every method call.

---
## Traditional Solution (Coupling with Spring)
One way to solve this is to make the singleton bean aware of the Spring container. By implementing 
the `ApplicationContextAware` interface, the singleton bean can directly request a new instance of the
prototype bean from the container whenever needed:

```java
package fiona.apple;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

public class CommandManager implements ApplicationContextAware {

    private ApplicationContext applicationContext;

    public Object process(Map commandState) {
        // Get a new instance of the prototype bean
        Command command = createCommand();
        command.setState(commandState);
        return command.execute();
    }

    protected Command createCommand() {
        // Fetch a new instance from the container
        return this.applicationContext.getBean("command", Command.class);
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        this.applicationContext = applicationContext;
    }
}
```

### Why This is Undesirable
While this approach works, it introduces tight coupling between your business logic and the Spring 
Framework, making your code less portable and harder to test.

---

## Method Injection: A Cleaner Approach
Method Injection is an advanced feature of the Spring IoC container that allows you to cleanly handle
such scenarios without coupling your code to Spring.

## Lookup Method Injection
Lookup Method Injection enables the container to override specific methods in a bean to dynamically
return another bean from the container. This is particularly useful when the dependent bean 
(e.g., `myCommand`) is a prototype.

### Key Requirements
1. **Class Restrictions**: The class should not be `final`, and the method to be injected must also
not be `final`.
2. **Abstract Method**: If the method is abstract, the container provides the implementation dynamically.

### How Does It Work?
The Spring Framework uses **bytecode generation** with the CGLIB library to dynamically create a 
subclass of the target bean. This subclass overrides the lookup method (e.g., `createCommand()`) and
provides the desired bean from the Spring container. Since this subclass is generated at runtime, it 
allows Spring to seamlessly integrate the lookup behavior without modifying the original class.

### Example: XML Configuration
```xml
<!-- Define a prototype-scoped bean -->
<bean id="myCommand" class="fiona.apple.AsyncCommand" scope="prototype">
    <!-- Configure dependencies for myCommand here -->
</bean>

<!-- Define a singleton bean with a lookup method -->
<bean id="commandManager" class="fiona.apple.CommandManager">
    <lookup-method name="createCommand" bean="myCommand" />
</bean>
```
In this configuration:
- The `commandManager` bean calls its own `createCommand()` method whenever it needs a new instance
of the `myCommand` prototype bean.
- The `createCommand()` method is dynamically overridden by the Spring container.

### Example: Abstract Lookup Method with Implementation
1. Define the `Command` interface and its implementation:
    ```java
    public interface Command {
        void setState(Object state);
        Object execute();
    }

    public class AsyncCommand implements Command {
        private Object state;

        @Override
        public void setState(Object state) {
            this.state = state;
        }

        @Override
        public Object execute() {
            return "Executing with state: " + state;
        }
    }
    ```

2. Define the abstract `CommandManager`:
    ```java
    public abstract class CommandManager {

        public Object process(Object commandState) {
            Command command = createCommand();
            command.setState(commandState);
            return command.execute();
        }

        @Lookup("myCommand")
        protected abstract Command createCommand();
    }
    ```

3. Spring Configuration:
    ```java
    @Configuration
    public class AppConfig {

        @Bean
        @Scope("prototype")
        public Command myCommand() {
            return new AsyncCommand();
        }

        @Bean
        public CommandManager commandManager() {
            return new CommandManager() {
                @Override
                protected Command createCommand() {
                    // Placeholder stub; will be overridden by Spring.
                    return null;
                }
            };
        }
    }
    ```

4. Using the Bean:
    ```java
    public class Main {
        public static void main(String[] args) {
            AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);

            CommandManager manager = context.getBean(CommandManager.class);
            Object result = manager.process("Sample State");

            System.out.println(result);
            context.close();
        }
    }
    ```

### Notes
- Annotated lookup methods should typically have concrete stub implementations to ensure compatibility
with component scanning.

---
## Alternative: ObjectFactory or Provider Injection
You can use `ObjectFactory` or `javax.inject.Provider` to retrieve a new instance of a prototype bean
as needed:

```java
@Component
public class CommandManager {

    @Autowired
    private ObjectFactory<Command> commandFactory;

    public Object process(Object commandState) {
        Command command = commandFactory.getObject();
        command.setState(commandState);
        return command.execute();
    }
}
```
### ServiceLocatorFactoryBean
Another option is to use `ServiceLocatorFactoryBean` from the `org.springframework.beans.factory.config` 
package, which dynamically creates a service locator for accessing beans.

---
## Arbitrary Method Replacement
A more flexible but less common form of method injection is arbitrary method replacement, where you 
replace an existing method with a new implementation using the `MethodReplacer` interface.

### Example: Replacing a Method
```java
public class MyValueCalculator {
    public String computeValue(String input) {
        // Original implementation
    }
}

public class ReplacementComputeValue implements MethodReplacer {

    public Object reimplement(Object obj, Method method, Object[] args) throws Throwable {
        String input = (String) args[0];
        // New implementation logic
        return ...;
    }
}
```

### XML Configuration
```xml
<bean id="myValueCalculator" class="x.y.z.MyValueCalculator">
    <replaced-method name="computeValue" replacer="replacementComputeValue">
        <arg-type>String</arg-type>
    </replaced-method>
</bean>

<bean id="replacementComputeValue" class="a.b.c.ReplacementComputeValue" />
```

### Notes on Arbitrary Method Replacement
- Use `<arg-type>` to specify method arguments when dealing with overloaded methods.
- This approach is rarely needed but can be useful for highly dynamic scenarios.

---

## Real Use Case: Handling Dynamic DataSource Resolution Using Method Injection
In scenarios where a dynamic `DataSource` is required based on an identifier (e.g., `appId`), method 
injection using `@Lookup` might not be the best approach because `@Lookup`-based methods require 
a `no-arguments` signature. For such cases, leveraging `ObjectProvider` or a factory method is a more
appropriate solution.

### Why Lookup Method Injection Has Limitations
The Spring documentation specifies that methods intended for lookup injection must follow this format:

```plaintext
<public|protected> [abstract] <return-type> theMethodName(no-arguments);
```

This restriction exists because Spring dynamically overrides the method using a runtime-generated 
subclass to provide the desired bean. The `no-arguments` requirement ensures that Spring can replace
the method without needing additional runtime logic to handle arguments.

For scenarios requiring runtime parameters (like `appId`), **lookup method injection** does not 
directly apply. Instead, you can use `ObjectProvider` or a factory pattern to dynamically resolve 
dependencies based on runtime values.

### Using `ObjectProvider` for Dynamic Bean Resolution
ObjectProvider is a more flexible version of ObjectFactory. It allows for more advanced functionality
such as checking if a bean is available in the application context and obtaining a bean lazily. 
It also supports passing arguments.

**Key Characteristics**:
- Can return optional or multiple beans.
- It provides additional methods like `getIfAvailable()` or `getIfUnique()` to handle scenarios where
the bean might not exist or where multiple beans of the same type exist.
- Supports lazy initialization and is more powerful for complex dependency injection scenarios.

#### 1. Define a `DataSourceManager` to Resolve Beans

```java
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Component;
import javax.sql.DataSource;

@Component
public class DataSourceManager {

    private final ObjectProvider<DataSource> dataSourceProvider;

    public DataSourceManager(ObjectProvider<DataSource> dataSourceProvider) {
        this.dataSourceProvider = dataSourceProvider;
    }

    public DataSource getDataSource(String appId) {
        return dataSourceProvider.getObject(appId);
    }
}
```

#### 2. Configure the `DataSource` Bean
Define a `DataSource` bean with a `prototype` scope that accepts the `appId` as an argument.

```java
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class DataSourceConfig {

    @Bean
    @Scope("prototype")
    public DataSource appDataSource(String appId) {
        HikariDataSource dataSource = new HikariDataSource();
        dataSource.setJdbcUrl("jdbc:vertica://host:port/database_" + appId);
        dataSource.setUsername("username");
        dataSource.setPassword("password");
        return dataSource;
    }
}
```

#### 3. Use the `DataSourceManager`
Now you can dynamically resolve the `DataSource` using the `appId` at runtime.

```java
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.sql.Connection;

@Service
public class DemoService {

    private final DataSourceManager dataSourceManager;

    @Autowired
    public DemoService(DataSourceManager dataSourceManager) {
        this.dataSourceManager = dataSourceManager;
    }

    public void performOperation(String appId) {
        DataSource dataSource = dataSourceManager.getDataSource(appId);

        try (Connection connection = dataSource.getConnection()) {
            // Perform database operations
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
```
---
## Key Takeaways
1. **Lookup Method Injection Limitations:**
  - The injected method must have a `no-arguments` signature.
  - It is suitable when no runtime parameters are required for the dependency resolution.

2. **ObjectProvider Advantages:**
  - Allows dynamic resolution of beans with runtime arguments.
  - Provides flexibility and supports prototype-scoped beans effectively.

3. **Prototype Scope:**
  - Ensure beans like `DataSource` are defined with a `prototype` scope to get a new instance for 
each request when required.

By using `ObjectProvider` or factory methods, you can elegantly handle scenarios like dynamically
resolving `DataSource` based on `appId` while maintaining clean and decoupled code.

---
