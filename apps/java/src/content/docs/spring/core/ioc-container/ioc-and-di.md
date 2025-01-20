---
title: Inversion of Control (IoC) and Dependency Injection (DI)
---

## Inversion of Control (IoC)?
Inversion of Control (IoC) is a principle in software design where the control of object creation and management is transferred
from the object itself to an external entity, often called a container or framework. This approach allows for loose coupling
between components in a system.

IoC is commonly implemented through Dependency Injection (DI), where objects declare their dependencies, and the IoC container
provides those dependencies at runtime.
 
---

## Dependency Injection (DI)
Dependency Injection is a design pattern that provides a way to supply an object with its required dependencies. The main ways
to perform dependency injection are:

1. **Constructor Injection**: Dependencies are provided through the constructor of the class.
2. **Setter Injection**: Dependencies are provided through setter methods.
3. **Interface Injection**: Dependencies are provided through an interface implemented by the dependent class.

---

## IoC and DI in Action
Let’s consider a scenario where we have an `OrderService` that relies on a `PaymentProcessor` for processing payments. Without 
IoC, the `OrderService` would directly instantiate `PaymentProcessor`, leading to tight coupling.

### Without IoC (Tightly Coupled Code)
```java
class PaymentProcessor {
    void processPayment(double amount) {
        System.out.println("Processing payment of: " + amount);
    }
}
 
class OrderService {
    private PaymentProcessor paymentProcessor;
 
    public OrderService() {
        this.paymentProcessor = new PaymentProcessor(); // Direct instantiation
    }
 
    void placeOrder(double amount) {
        paymentProcessor.processPayment(amount);
        System.out.println("Order placed successfully.");
    }
}
 
public class Main {
    public static void main(String[] args) {
        OrderService orderService = new OrderService();
        orderService.placeOrder(100.0);
    }
}
```
In this example:
- `OrderService` directly depends on the `PaymentProcessor` implementation.
- This tight coupling makes it difficult to switch to a different `PaymentProcessor` implementation or test `OrderService` independently.

---

## With IoC and Dependency Injection (Loosely Coupled Code)
Using an IoC container, we can make `OrderService` and `PaymentProcessor` loosely coupled:

### Step 1: Define Interfaces and Implementations
```java
interface PaymentProcessor {
    void processPayment(double amount);
}
 
class CreditCardProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing credit card payment of: " + amount);
    }
}
 
class PayPalProcessor implements PaymentProcessor {
    @Override
    public void processPayment(double amount) {
        System.out.println("Processing PayPal payment of: " + amount);
    }
}
```

### Step 2: Refactor `OrderService`
```java
class OrderService {
    private PaymentProcessor paymentProcessor;
 
    // Constructor Injection
    public OrderService(PaymentProcessor paymentProcessor) {
        this.paymentProcessor = paymentProcessor;
    }
 
    void placeOrder(double amount) {
        paymentProcessor.processPayment(amount);
        System.out.println("Order placed successfully.");
    }
}
```

### Step 3: Configure IoC Container
In a Spring configuration file or using annotations:

```java
@Configuration
class AppConfig {
    @Bean
    public PaymentProcessor paymentProcessor() {
        return new CreditCardProcessor();
    }
 
    @Bean
    public OrderService orderService(PaymentProcessor paymentProcessor) {
        return new OrderService(paymentProcessor);
    }
}
```

### Step 4: Run the Application
```java
public class Main {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(AppConfig.class);
        OrderService orderService = context.getBean(OrderService.class);
        orderService.placeOrder(100.0);
    }
}
```
 
---

## Key Advantages of IoC and DI
1. **Loose Coupling**: Objects depend on abstractions (interfaces) rather than concrete implementations.
2. **Improved Testability**: Dependencies can be easily mocked or stubbed in unit tests.
3. **Flexibility**: Switching between different implementations of a dependency is straightforward.
4. **Enhanced Maintainability**: Centralized configuration makes it easier to manage changes.

---
 
