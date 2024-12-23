---
title: JVM life cycle
---

JVM knows nothing about the specifics of the Java programming language. Instead, it is intimately familiar
with a particular binary format—the class file format. These class files encapsulate JVM instructions, also known as 
bytecodes, along with a symbol table and supplementary information. To ensure security, the JVM enforces robust syntactic
and structural constraints on the code contained within class files.

## JVM life cycle
### Instance birth
When a Java application is launched, a runtime instance of the JVM is created. This
instance is responsible for executing the application’s bytecode and managing its runtime environment.

### Execution
The JVM instance starts running the Java application by invoking the main() method of
a designated initial class. This main() method serves as the entry point for the application and must
meet specific criteria: it should be public, static, return void, and accept a single parameter, which is
an array of strings, (String[]). It’s important to note that the criteria for
the main() method may evolve, as a preview version in Java 21 suggests potential simplifications. Any class 
with such a main() method can serve as the starting point for a Java application.

### Application execution
The JVM executes the Java application, processing its instructions and managing memory, threads, and other resources
as needed. 

### Application completion
Once the Java application is executed, the JVM instance is no longer needed. At this point, the JVM instance dies.

>*JVM follows a one application per instance model. Suppose you start multiple Java applications concurrently on the same
computer, using the same concrete implementation of the JVM. In that case, you’ll have multiple JVM instances, each
dedicated to running its respective Java application. These JVM instances are isolated from each other, ensuring the
independence and security of each Java application.*
