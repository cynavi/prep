---
title: Adapter
---

The adapter pattern is a structural design pattern that converts the interface of a class into 
another interface to make it compatible with additional clients. It allows classes to work 
together that couldn't otherwise due to incompatible interfaces.

## Motivation
Imagine a scenario where a legacy logging system logs messages in XML format, while a new, 
modern logging system logs messages in JSON format.

These two systems are incompatible because of their differing interfaces and method names. The
goal is to make these systems work together seamlessly.

This is where the Adapter Pattern comes into play. An adapter bridges the gap between the two
systems, handling the conversion of method calls and ensuring compatibility. From the client
code's perspective, nothing changes—the interface and method names remain consistent. The 
adapter handles all the necessary conversions behind the scenes.

### Why Not Merge the Codebase?
One possible solution might involve merging the codebases of the old and new loggers into a
unified system. However, this approach violates the **Single Responsibility Principle (SRP)**
by combining multiple concerns—logging, data format conversion, and integration—into one module.
Additionally, it introduces significant time and maintenance costs.

## The Solution
The Adapter Pattern consists of the following key components:

1. **Target Interface:** Defines the interface that the client interacts with.
2. **Adaptee:** Represents the existing component (e.g., the legacy logger) that needs to be adapted.
3. **Adapter:** Bridges the gap between the Target Interface and the Adaptee, ensuring smooth communication.
4. **Client:** Operates using the Target Interface without concern for the underlying Adaptee.

### Design and Implementation
Below is an example implementation in Java:

```java
interface JSONLogger {
    void logMessage(String message);
}

class XMLLogger {
    public void log(String XMLMessage) {
        System.out.println(XMLMessage);
    }
}

class LoggerAdapter implements JSONLogger {
    private final XMLLogger xmlLogger;

    public LoggerAdapter(XMLLogger xmlLogger) {
        this.xmlLogger = xmlLogger;
    }

    @Override
    public void logMessage(String message) {
        xmlLogger.log("<message>" + message + "</message>");
    }
}

public class Main {
    public static void main(String[] args) {
        JSONLogger logger = new LoggerAdapter(new XMLLogger());
        logger.logMessage("hello");
    }
}
```

This example demonstrates how the Adapter Pattern ensures compatibility between two otherwise
incompatible interfaces.

## Limitations and Pitfalls
1. **Performance Overhead:** Adapters introduce an additional layer of abstraction, which may 
slightly impact performance, especially in performance-critical systems.
2. **Complexity and Maintainability:** Managing multiple adapters can become challenging if there
are frequent updates or a large number of legacy components.

## Classic Use Cases
1. **Legacy System Integration:** Seamlessly connect modern systems with older ones.
2. **Payment Gateways:** Provide a unified interface for multiple payment systems like PayPal,
Stripe, or Square.
3. **UI Widgets in Frameworks:** Enable custom UI components to integrate with standardized interfaces.
4. **Cross-Platform Compatibility:** Abstract platform-specific operations.
5. **Third-Party API Integration:** Adapt APIs with differing protocols (e.g., SOAP to RESTful APIs).

## Closing Notes
The Adapter Pattern effectively supports:

1. **Single Responsibility Principle (SRP):** Adapters focus solely on bridging incompatible interfaces.
2. **Open/Closed Principle (OCP):** New adapters can be added without modifying existing code.
3. **Loose Coupling:** The client interacts with the adapter, and changes to the Adaptee do not affect the client.
