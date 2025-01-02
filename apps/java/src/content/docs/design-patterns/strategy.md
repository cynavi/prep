---
title: Strategy
---

The Strategy is a behavioural pattern that is used to define a family of algorithms that can be
chosen at runtime.

This way, the client code can change the behavior of a given context at runtime, allowing for
greater flexibility.

---
## Motivation
Imagine building an online payment gateway system. Payments can be made via Credit Card, PayPal,
Bank Transfer, or Cryptocurrency.

Each payment method has its unique processing logic. For example:

- Credit Card requires card number, expiration date, and CVV.
- PayPal requires email and password authentication.
- Cryptocurrency needs a wallet address.

If we try to handle all these payment methods in one class using conditional statements, the 
code becomes messy, hard to maintain, and violates the **Open-Closed Principle**.

Using inheritance might also lead to a deep hierarchy with rigid dependencies. Instead, the
**Strategy Pattern** allows us to encapsulate these payment processing behaviors into separate
classes, making the system scalable and flexible.

---

## The Problem with Traditional Approaches
1. **Overuse of Inheritance**: If we create subclasses for each payment method, adding new 
payment methods becomes cumbersome.
2. **Tight Coupling**: Changes to one payment method might inadvertently break another.
3. **Scalability Issues**: Adding new algorithms requires modifying the base class or existing subclasses.

The Strategy Pattern addresses these issues by promoting loose coupling and focusing on
encapsulating behavior.

---

## The Solution: Strategy Pattern
The Strategy Pattern suggests encapsulating algorithms (payment processing strategies) in their
own classes and using composition to switch between them dynamically.

### Key Components of Strategy Pattern
1. **Context (PaymentProcessor)**: Manages a strategy and delegates behavior to the strategy instance.
2. **Strategy Interface (PaymentStrategy)**: Defines the common behavior (e.g., `processPayment`).
3. **Concrete Strategies (CreditCardPayment, PayPalPayment, CryptoPayment)**: Implement the specific behavior.
4. **Client**: Chooses the desired strategy at runtime.

### Design and Implementation
Below is an example implementation in Java:

```java
// Strategy Interface
interface PaymentStrategy {
    void processPayment(double amount);
}
```
```java
// Concrete Strategies
class CreditCardPayment implements PaymentStrategy {
    public void processPayment(double amount) {
        System.out.println("Paid " + amount + " using Credit Card.");
    }
}
```

```java
class PayPalPayment implements PaymentStrategy {
    public void processPayment(double amount) {
        System.out.println("Paid " + amount + " using PayPal.");
    }
}
```

```java
class CryptoPayment implements PaymentStrategy {
    public void processPayment(double amount) {
        System.out.println("Paid " + amount + " using Cryptocurrency.");
    }
}
```

```java
// Context
class PaymentProcessor {
    private PaymentStrategy strategy;

    public void setPaymentStrategy(PaymentStrategy strategy) {
        this.strategy = strategy;
    }

    public void processPayment(double amount) {
        strategy.processPayment(amount);
    }
}
```

```java
// Client
public class Main {
    public static void main(String[] args) {
        PaymentProcessor processor = new PaymentProcessor();

        processor.setPaymentStrategy(new CreditCardPayment());
        processor.processPayment(100);

        processor.setPaymentStrategy(new PayPalPayment());
        processor.processPayment(200);

        processor.setPaymentStrategy(new CryptoPayment());
        processor.processPayment(300);
    }
}
```

### Using Lambda Expressions and Anonymous Classes
In Java 8+, we can simplify strategy implementations using **Lambda Expressions** or **Anonymous Classes**:

```java
PaymentProcessor processor = new PaymentProcessor();

// Using Lambda for Credit Card Payment
processor.setPaymentStrategy(amount -> System.out.println("Paid " + amount + " using Lambda Credit Card"));
processor.processPayment(100);

// Using Anonymous Class for PayPal Payment
processor.setPaymentStrategy(new PaymentStrategy() {
    public void processPayment(double amount) {
        System.out.println("Paid " + amount + " using Anonymous PayPal.");
    }
});
processor.processPayment(200);
```

### Advantages of Using Lambdas and Anonymous Functions
- **Reduced Boilerplate Code**: Lambdas make strategy implementations more concise.
- **Flexibility**: Strategies can be defined inline, without creating separate classes.
- **Readability**: Code becomes easier to understand when strategies are simple.

---

## Use Cases
1. **Payment Processing Systems**: Credit Card, PayPal, etc.
2. **Sorting Algorithms**: QuickSort, MergeSort, BubbleSort.
3. **Data Compression**: ZIP, RAR, TAR.
4. **Travel Routing Systems**: Fastest Route, Shortest Route.

---

## Limitations and Pitfalls
1. **Increased Number of Classes**: Too many concrete strategy classes can clutter the code.
2. **Over-Engineering**: Using Strategy Pattern for simple problems can add unnecessary complexity.

---

## Closing Notes
The Strategy Pattern excels when you need dynamic behavior switching. By combining it with 
modern Java features like **Lambdas** and **Anonymous Classes**, you can write clean,
maintainable, and flexible code.

- **Separation of Concerns**: Algorithms are encapsulated into separate classes.
- **Interchangeable Strategies**: Strategies can be swapped at runtime.
- **Improved Flexibility**: Adding new algorithms does not require modifying existing code.

---
