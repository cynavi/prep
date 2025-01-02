---
title: Facade
---

The facade pattern is a structural design pattern that provides a simplified interface to a 
complex subsystem. It hides the underlying complexity and offers a unified entry point for clients.

---

## Motivation: Online Order Processing

Consider an e-commerce platform where placing an order involves several complex steps:

1.  **Inventory Check:** Verify product availability.
2.  **Payment Processing:** Authorize and capture payment.
3.  **Shipping Calculation:** Determine shipping costs based on destination and weight.
4.  **Order Fulfillment:** Prepare and ship the order.
5.  **Notification:** Send confirmation emails and updates.

Without a facade, the client (e.g., a web application) would need to interact with multiple 
services or classes directly, making the order processing logic complex and tightly coupled.

---

## The Problem: Tight Coupling and Complexity

```java
// Without Facade (Simplified)
public class OrderProcessor {
    private InventoryService inventoryService;
    private PaymentGateway paymentGateway;
    private ShippingCalculator shippingCalculator;
    private OrderFulfillmentService fulfillmentService;
    private NotificationService notificationService;

    public void processOrder(Order order) {
        if (!inventoryService.checkInventory(order.getItems())) {
            throw new RuntimeException("Inventory not available");
        }

        paymentGateway.processPayment(order.getPaymentInfo());
        double shippingCost = shippingCalculator.calculateShipping(order.getShippingAddress(), order.getItems());
        order.setShippingCost(shippingCost);
        fulfillmentService.fulfillOrder(order);
        notificationService.sendConfirmation(order);
    }
}
```
This code is complex, hard to test, and violates the principle of least knowledge (Demeter's Law).
The OrderProcessor knows too much about the internal workings of each service.

---

## The Solution: Introducing the OrderFacade
The facade provides a simplified interface for placing an order:

```java
// With Facade
public class OrderFacade {
private InventoryService inventoryService;
private PaymentGateway paymentGateway;
private ShippingCalculator shippingCalculator;
private OrderFulfillmentService fulfillmentService;
private NotificationService notificationService;

    public OrderFacade(InventoryService inventoryService, PaymentGateway paymentGateway,
                       ShippingCalculator shippingCalculator, OrderFulfillmentService fulfillmentService,
                       NotificationService notificationService) {
        this.inventoryService = inventoryService;
        this.paymentGateway = paymentGateway;
        this.shippingCalculator = shippingCalculator;
        this.fulfillmentService = fulfillmentService;
        this.notificationService = notificationService;
    }

    public void placeOrder(Order order) {
        if (!inventoryService.checkInventory(order.getItems())) {
            throw new RuntimeException("Inventory not available");
        }

        paymentGateway.processPayment(order.getPaymentInfo());
        double shippingCost = shippingCalculator.calculateShipping(order.getShippingAddress(), order.getItems());
        order.setShippingCost(shippingCost);
        fulfillmentService.fulfillOrder(order);
        notificationService.sendConfirmation(order);
    }
}

// Client Code (Much simpler)
OrderFacade orderFacade = new OrderFacade(new InventoryService(), new PaymentGateway(), new ShippingCalculator(), new OrderFulfillmentService(), new NotificationService());
orderFacade.placeOrder(order); // Simple call to place an order
```

The OrderFacade encapsulates the complex order processing logic. The client only needs to 
interact with the placeOrder() method, simplifying the client code and reducing coupling.

---

## Limitations and Pitfalls
- **Over-Simplification**: If the facade is too simple, it might not provide enough flexibility
for advanced use cases. Clients might need to bypass the facade and interact with the subsystem
directly, defeating the purpose.

- **Maintenance Challenges**: Changes in the underlying subsystem might require modifications to
the facade, potentially affecting all clients.

---

## Use Cases
- **Compilers**: A compiler can use a facade to simplify the compilation process, hiding the 
complex steps of lexical analysis, parsing, code generation, and optimization.

- **Database Access**: ORMs (Object-Relational Mappers) act as facades for database interactions, 
providing a high-level interface for querying and manipulating data.

- **Third-Party Libraries/APIs**: Facades can simplify the use of complex third-party libraries or 
APIs by providing a unified and easier-to-use interface.

---

## Advantages:

- **Abstraction of Complexity**: It simplifies complex subsystems by providing a unified interface.

- **Decoupling**: It decouples the client from the subsystem, making the system more modular and maintainable.

- **Improved Code Readability**: Client code becomes cleaner and easier to understand.

- **Improved Testability**: It becomes easier to test the client code in isolation by mocking the facade.

---

The facade pattern is a powerful tool for managing complexity in software systems. By providing
a simplified interface, it promotes code reusability, maintainability, and testability.

---
