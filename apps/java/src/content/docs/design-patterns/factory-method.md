---
title: Factory Method
---

The **Factory Method Pattern** is a *creational design pattern* that provides an interface for creating objects in a
superclass but allows subclasses to alter the type of objects that will be created.

---

### Motivation

Imagine you're developing a **payment processing system** for an e-commerce application. The system needs to support
multiple payment methods such as **Credit Card**, **PayPal**, and **Bank Transfer**. Each payment method has its
unique initialization logic and processing rules.

- **CreditCardPaymentProcessor** requires card validation.
- **PayPalPaymentProcessor** requires authentication via PayPal's API.
- **BankTransferPaymentProcessor** requires account verification.

If you directly instantiate each payment processor in your code, you'll introduce **tight coupling** and
**violations of the Open/Closed Principle**.

**Problem:** How do we design a system where adding new payment methods requires minimal changes to the existing code?

**Solution:** Enter the **Factory Method Pattern**.

---

### The Problem with Direct Instantiation

Without the Factory Method Pattern, you might write code like this:

```java
public class PaymentService {
    public void processPayment(String type) {
        if (type.equals("CreditCard")) {
            CreditCardPaymentProcessor processor = new CreditCardPaymentProcessor();
            processor.process();
        } else if (type.equals("PayPal")) {
            PayPalPaymentProcessor processor = new PayPalPaymentProcessor();
            processor.process();
        }
    }
}
```

This approach has several problems:

- **Tight Coupling:** The service depends on concrete implementations.
- **Difficult to Extend:** Adding new payment methods requires modifying the `processPayment` method.
- **Violates Open/Closed Principle:** The class isn't closed for modification.

---

### The Factory Method Solution

With the **Factory Method Pattern**, we encapsulate the creation logic into subclasses. The client code relies on an
abstract creator rather than directly instantiating payment processors.

---

### Key Components of Factory Method Pattern

1. **Product Interface:** Defines the operations of the product.
2. **Concrete Product:** Implements the product interface.
3. **Creator (Abstract Class):** Declares the Factory Method.
4. **Concrete Creator:** Implements the Factory Method to return a concrete product.

**Implementation Example:**

**Step 1: Define the PaymentProcessor Interface**

```java
public interface PaymentProcessor {
    void process();
}
```

**Step 2: Concrete Payment Processors**

```java
public class CreditCardPaymentProcessor implements PaymentProcessor {
    public void process() {
        System.out.println("Processing Credit Card Payment");
    }
}

public class PayPalPaymentProcessor implements PaymentProcessor {
    public void process() {
        System.out.println("Processing PayPal Payment");
    }
}
```

**Step 3: Define Abstract Creator**

```java
public abstract class PaymentProcessorFactory {
    public abstract PaymentProcessor createProcessor();
}
```

**Step 4: Implement Concrete Creators**

```java
public class CreditCardProcessorFactory extends PaymentProcessorFactory {
    public PaymentProcessor createProcessor() {
        return new CreditCardPaymentProcessor();
    }
}

public class PayPalProcessorFactory extends PaymentProcessorFactory {
    public PaymentProcessor createProcessor() {
        return new PayPalPaymentProcessor();
    }
}
```

**Step 5: Client Code**

```java
public class PaymentService {
    public static void main(String[] args) {
        PaymentProcessorFactory factory = new CreditCardProcessorFactory();
        PaymentProcessor processor = factory.createProcessor();
        processor.process();
    }
}
```

Now, adding a new payment method only requires creating a new **Concrete Factory** and **Concrete Product** without modifying the existing code.

---

### Advantages of Factory Method Pattern

1. **Open/Closed Principle:** New payment processors can be added without modifying existing code.
2. **Decoupling:** Client code depends on abstract interfaces, not concrete implementations.
3. **Scalability:** Easily scalable for new payment methods.

---

### Limitations and Pitfalls

1. **Complexity:** Adds additional classes and interfaces.
2. **Single Responsibility Principle Violation:** The creator class is responsible for creating objects, which might
add extra responsibility.
3. **Overuse:** In simpler scenarios, the Factory Method may be overkill.

---

### Classic Use Cases

1. **Payment Processing Systems:** As demonstrated in our example.
2. **Notification Services:** Email, SMS, Push Notifications.
3. **Document Generation Tools:** PDF, Word, HTML document generators.
4. **Database Connection Factories:** Different databases (MySQL, PostgreSQL).

---

### Factory Method vs Simple Factory

- **Simple Factory:** A single factory class is responsible for creating all product types.
- **Factory Method:** Creation is delegated to subclasses, offering greater flexibility.

---

### Closing Notes

The **Factory Method Pattern** is a powerful design tool when:

1. The exact type of object isn’t known until runtime.
2. There’s a need to encapsulate complex object creation logic.
3. New object types are frequently added.
