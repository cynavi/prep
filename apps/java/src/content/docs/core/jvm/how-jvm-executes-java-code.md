---
title: How the JVM executes Java code
---

The JVM executes Java code which are compiled into bytecode. Bytecode is a low-level
representation of Java code that is platform-independent. When a Java application is
executed, the JVM interprets or compiles this bytecode into machine code for the host
system’s hardware.

To interact with the host system and leverage platform-specific features, the JVM can use
native methods. These native methods are written in languages such as C or C++ and are
dynamically linked to the specific platform on which the JVM is running. These methods
provide a bridge between the platform independent Java code and the native code specific to
the host system.

It’s crucial to understand that despite the Java programming language’s commitment to platform
independence, the JVM is inherently platform-specific. It signifies that a tailored virtual
machine implementation exists for every distinct platform.

The JVM serves a singular yet vital purpose: to execute Java applications. Its life
cycle is straightforward, giving birth to a new instance when an application
begins and gracefully concluding its existence when the application completes.
Each application, when launched, triggers the creation of its dedicated JVM
instance. It means that running the same code three times on the same machine
initiates three independent JVMs.

While the JVM may operate quietly in the background, numerous concurrent
processes ensure its continuous availability. These processes are the unsung
heroes that keep the JVM running seamlessly. These are as follows:

## Timers

Timers are the clockwork of the JVM, orchestrating events that occur periodically, such as
interruptions and repetitive processes. They play a crucial role in maintaining the synchrony
of the JVM’s operations.

## Garbage collector processes

The garbage collector processes manage memory within the JVM. They execute the essential task
of cleaning up memory by identifying and disposing of objects that are no longer in use,
ensuring efficient memory utilization.

## Compilers

Compilers within the JVM take on the transformative role of converting bytecode, the
low-level representation of Java code, into native code that the host system’s hardware can
understand. This process, known as just-in-time (JIT) compilation, enhances the performance
of Java applications.

## Listeners

Listeners serve as the attentive ears of the JVM, ready to receive signals and information.
Their primary function is to relay this information to the appropriate processes within the JVM,
ensuring that critical data reaches its intended destination.

Diving deeper into the parallel processes or threads within the JVM, it’s essential to
recognize that the JVM allows concurrently executing multiple threads. These threads run
in parallel and enable Java applications to perform tasks simultaneously. This concurrency
in Java is closely linked to native threads, the fundamental units of parallel execution at
the operating system level. Additionally, it’s worth noting that, as of Java 21, virtual
threads have become a new feature. Virtual threads introduce a lightweight form of concurrency
that can be managed more efficiently, potentially altering the landscape of parallel
execution in Java.

## Parallel thread in JVM
When a parallel process or thread in Java is born, it undergoes a series of initial
steps to prepare for its execution:

### Memory allocation
The JVM allocates memory resources to the thread, including a dedicated portion of the heap for
storing its objects and data. Each thread has its own memory space, ensuring isolation from 
other threads.

### Object synchronization
Thread synchronization mechanisms, such as locks and monitors, are established to coordinate
access to shared resources. Synchronization ensures that threads do not interfere with each
other’s execution and helps prevent data corruption in multi-threaded applications. 

### Creation of specific registers
The thread is equipped with specific registers, which are part of the thread’s execution 
context. These registers hold data and execution state information, allowing the thread to
operate efficiently. 

### Allocation of the native thread
A native thread, managed by the operating system, is allocated to support the Java thread’s
execution. The native thread is responsible for executing the Java code and interacting with
the underlying hardware and operating system.

If an exception occurs during the execution of a thread, the native part of the JVM promptly
communicates this information back to the JVM itself. The JVM is responsible for handling 
the exception, making necessary adjustments, and ensuring the thread’s safety and integrity.
If the exception is not recoverable, the JVM closes the thread.

When a thread completes its execution, it releases all the specific resources associated with
it. It includes the resources managed by the Java part of the JVM, such as memory and objects,
and the resources allocated by the native part, including the native thread. These resources
are efficiently reclaimed and returned to the JVM, ensuring that the JVM remains responsive
and resource efficient.

In essence, thread management in the JVM is a complex and highly orchestrated
process, allowing for concurrently executing multiple threads, each with its own
memory space and specific resources.

## JVM data type
In the realm of data, the JVM operates with two fundamental categories:

### Primitives
Primitives are basic data types that include numeric types, Boolean values, and return
addresses. These types do not require extensive type checking or verification at runtime. They operate
with specific instructions tailored to their respective data types. For example, instructions such as
iadd, ladd, fadd, and dadd handle integer, long, float, and double values, respectively.

### returnAddress type
The returnAddress type in the JVM represents a particular data type critical in
method invocation and return. This type is internal to the JVM and is not directly
accessible or utilized by the Java programming language. Here’s an explanation
of the importance and reason behind the returnAddress type:

- **Method invocation and return**: The returnAddress type is used by the JVM to manage method
  invocations and returns efficiently. When a method is invoked, the JVM needs to keep track of where
  to return once it completes its execution. This is crucial for maintaining the flow of control in a
  program and ensuring that the execution context is correctly restored after a method call.

- **Call stack management**: In the JVM, the call stack is a critical data structure that keeps track of
  method calls and returns. It maintains a stack of returnAddress values, each representing the
  address to which control should return when a method completes. This stack is known as the method
  call stack or execution stack.

- **Recursion**: The returnAddress type is essential in handling recursive method calls. When a
  method invokes itself or another method multiple times, the JVM relies on returnAddress values
  to ensure that control returns to the correct calling point, preserving the recursive state.

### boolean type
In the JVM, the boolean type has limited native support. Unlike other programming languages
where boolean values are represented as a distinct data type, in the JVM, boolean values
are managed using the int type. This design choice simplifies the implementation of the JVM
and also has historical reasons tied to the bytecode instruction set.

Here are some key aspects of how boolean values are treated in the JVM:
- **Boolean as integers**: The JVM represents boolean values as integers, with 1 typically denoting true
  and 0 representing false. This means that boolean values are essentially treated as a subset of
  integers.

- **Instructions**: In JVM bytecode instructions, there are no specific instructions for boolean operations.
  Instead, operations on boolean values are carried out using integer instructions. For example,
  comparisons or logical operations involving boolean values are performed using integer instructions
  such as if_icmpne (if int comparison not equal), if_icmpeq (if int comparison equal), and so on.

- **Boolean arrays**: When working with arrays of boolean values, such as boolean[], the JVM often
  treats them as byte arrays. The JVM uses bytes (8 bits) to represent boolean values, which align with
  the byte data type.

- **Efficiency and simplicity**: The choice to represent boolean values as integers simplifies the JVM’s
  design and makes it more efficient. It reduces the need for additional instructions and data types, which
  helps keep the JVM implementation straightforward.

### Reference values
The JVM supports objects that are either instances of dynamically allocated classes
or arrays. These values fall under the reference type, and their operation closely resembles that of
languages such as C/C++. Reference values represent complex data structures, and the JVM performs
runtime type checking and verification to ensure the integrity and compatibility of these data
structures.

Here’s a closer look at these reference types in the JVM:
- **Classes**: The foundation of object-oriented programming in Java. They define the blueprint for
creating objects and encapsulating data and behavior. In the JVM, reference values for classes are used
to point to instances of these classes. When you create an object of a class, you create an instance of
that class, and the reference value points to this instance.

- **Arrays**: Arrays in Java provide a way to store collections of elements of the same data type. In the
JVM, reference values for arrays are used to reference these arrays. Arrays can be of primitive data
types or objects, and the reference value helps access and manipulate the array’s elements.

- **Interfaces**: Interfaces are a fundamental concept in Java, allowing for the definition of contracts that
classes must adhere to. Reference values for interfaces are used to point to objects that implement
these interfaces. When you work with interfaces in Java, you use reference values to interact with
objects that fulfill the interface’s requirements

One common characteristic of reference values in the JVM is their initial state, which is always set to null.
The null state represents the absence of an object or a reference to an object.
The concept of null serves several important purposes in the Java language and
the JVM:
- **Initialization**: When you declare a reference variable but do not assign it to an object, the default
initial value for that reference is null. This default value is essential for scenarios where you want to
declare a reference but not immediately associate it with an object. This practice allows you to declare
a reference variable and assign it to an object when needed, giving you flexibility in your program’s
structure.

- **Absence of value**: null indicates no valid object associated with a particular reference. It is useful for
cases where you need to represent that no meaningful data or object is available at a certain point in
your program.

- **Resource release**: While setting references to null can help indicate to the JVM that an object is no
longer needed, it’s essential to clarify that the primary responsibility for memory management and
resource cleanup lies with the Java Garbage Collector (GC). The GC automatically identifies and
reclaims memory occupied by no longer-reachable objects, effectively managing memory resources.
Developers typically do not need to set references to null for memory cleanup explicitly; it’s a task
handled by the GC.

While null is a valuable concept in Java and the JVM, its usage comes with trade-offs and considerations:
- **NullPointerException**: One of the main trade-offs is the risk of NullPointerException. If you
attempt to perform operations on a reference set to null, it can lead to a runtime exception.
Therefore, it’s crucial to handle null references properly to avoid unexpected program crashes.

- **Defensive programming**: Programmers need to be diligent in checking for null references before
using them to prevent NullPointerException. It can lead to additional code for null checks
and make it more complex.

- **Resource management**: While setting references to null can help release resources, it’s not a
guaranteed method for resource management. Some resources may require explicit cleanup or
disposal, and relying solely on setting references to null may not be sufficient.

- **Design considerations**: When designing classes and APIs, it’s important to provide clear guidance on
how references are meant to be used and under what circumstances they can be set to null.

Through the JVM, Java achieves its Write Once, Run Anywhere promise, enabling developers to create platform-independent
applications. However, understanding the JVM’s intricacies, including how it manages threads, memory, and resources,
is essential for optimizing Java applications and ensuring their reliability.
