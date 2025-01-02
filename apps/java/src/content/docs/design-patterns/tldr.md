---
title: tldr
---

| **Pattern**          | **Strong Points**                                                                                             | **Weaknesses**                                                        | **When to Use**                                                       | **Problem Solved**                                                           | **Comparison**                                                                                                             |
|----------------------|----------------------------------------------------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------|----------------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------|
| **Adapter**          | - Allows incompatible interfaces to work together. <br> - Improves code reusability. <br> - Provides a way to integrate third-party classes. | - Can introduce complexity if overused. <br> - May make the code harder to maintain. | - When you need to adapt an existing class/interface to another one. <br> - When integrating third-party libraries or legacy code.       | - Solves the problem of incompatible interfaces by converting one interface to another. | - Unlike the **Facade** pattern (which simplifies interaction), **Adapter** transforms one interface into another. |
| **Builder**          | - Separates the construction process from the final product. <br> - Makes the code more readable and maintainable. <br> - Can be used for complex objects with multiple configuration options. | - Can lead to excessive class creation if there are many variants. <br> - Overuse may make code unnecessarily complex. | - When creating complex objects that require step-by-step construction. <br> - When object creation involves multiple optional configurations.                         | - Solves the problem of constructing complex objects without exposing the construction logic. | - In contrast to **Factory Method** (which creates objects in one go), **Builder** breaks the creation process into distinct, manageable steps. |
| **Decorator**        | - Adds functionality dynamically without altering the original object. <br> - Supports the **Open/Closed Principle** (open for extension, closed for modification). <br> - More flexible than subclassing. | - Can result in an excessive number of small classes, complicating maintenance. <br> - Might introduce complexity if used extensively.         | - When you need to add responsibilities or features to objects without modifying their code. <br> - When you want to avoid subclassing and prefer flexible runtime behavior changes. | - Solves the problem of extending an object’s behavior dynamically, without affecting other objects. | - Unlike **Strategy** (which changes behavior by swapping algorithms), **Decorator** adds functionality to objects. |
| **Facade**           | - Simplifies interactions with complex subsystems. <br> - Provides a unified interface to a set of interfaces. <br> - Reduces dependencies between client and complex subsystem.                     | - May obscure necessary details, making debugging harder. <br> - Can hide flexibility of the subsystem behind a simple facade. | - When you need to provide a simplified interface to a complex system. <br> - When you want to reduce the complexity of interacting with multiple subsystems. | - Solves the problem of complexity in a system by providing a simplified, high-level interface. | - **Facade** hides internal subsystem complexity, while **Adapter** allows compatibility between incompatible interfaces. |
| **Factory Method**   | - Promotes loose coupling between client and product classes. <br> - Encapsulates object creation logic. <br> - Makes the code more flexible by deferring object instantiation to subclasses.                                 | - Can result in a proliferation of factory classes. <br> - May lead to excessive indirection. | - When you need to instantiate different types of objects, but want to defer instantiation to subclasses. <br> - When object creation needs to be abstracted for flexibility. | - Solves the problem of object creation, allowing subclasses to decide which class to instantiate. | - Unlike **Abstract Factory** (which creates families of related products), **Factory Method** creates objects of one class hierarchy. |
| **Observer**         | - Facilitates a decoupled, one-to-many relationship between objects. <br> - Supports event-driven programming. <br> - Allows for easy notification of state changes in an object. | - Can result in memory management issues if observers are not properly deregistered. <br> - May create unexpected dependencies. | - When one object (the subject) needs to notify many dependent objects (observers) about changes. <br> - When implementing event-driven systems or notification mechanisms. | - Solves the problem of notifying multiple objects when a subject changes its state. | - **Observer** focuses on communication between objects via events, while **Strategy** focuses on changing behavior by swapping algorithms. |
| **Singleton**        | - Ensures that a class has only one instance. <br> - Provides a global point of access to that instance. <br> - Useful for managing shared resources.                         | - Makes unit testing difficult. <br> - Can lead to hidden dependencies. <br> - Makes the code harder to extend and maintain over time. | - When you need to ensure that a class has only one instance across the system. <br> - When you need a global access point to an object. | - Solves the problem of ensuring a single, globally accessible instance of a class. | - Unlike **Factory** (which creates multiple instances), **Singleton** ensures that only one instance exists and is shared. |
| **Strategy**         | - Allows algorithms to be swapped dynamically at runtime. <br> - Promotes the **Open/Closed Principle** by allowing new behaviors to be added without altering the client. <br> - Makes code easier to maintain by separating concerns.                         | - Can result in an increased number of classes (one for each strategy). <br> - May introduce unnecessary complexity if not used properly. | - When you need to define a family of algorithms, and make them interchangeable. <br> - When you need to change an object's behavior at runtime based on specific conditions. | - Solves the problem of changing behavior or algorithms dynamically without altering the client code. | - Unlike **Decorator** (which adds functionality), **Strategy** changes the way an object behaves based on the selected algorithm. |

---

1. **Adapter**:
  - Focuses on making two incompatible interfaces compatible.
  - Can introduce complexity if overused but is useful when integrating third-party or legacy code.

2. **Builder**:
  - Ideal for constructing complex objects step-by-step, especially with many optional parameters.
  - Can result in too many classes if many variants are needed.

3. **Decorator**:
  - Provides a flexible way to add new responsibilities to objects at runtime, without modifying the original object.
  - Can lead to class proliferation if used excessively.

4. **Facade**:
  - Hides the complexities of a subsystem and provides a simplified interface.
  - Risk of losing flexibility as the internal subsystem becomes hidden.

5. **Factory Method**:
  - Helps to decouple the creation of objects from their usage by defining a common interface for object creation.
  - Can lead to a proliferation of factory classes.

6. **Observer**:
  - Enables a one-to-many dependency relationship where one object notifies many others about changes in its state.
  - Can cause memory management problems if observers are not deregistered properly.

7. **Singleton**:
  - Ensures that a class has only one instance and provides a global point of access.
  - Can make unit testing harder and hide dependencies.

8. **Strategy**:
  - Defines a family of interchangeable algorithms, allowing behavior to change at runtime.
  - May introduce complexity if too many strategies are defined.

