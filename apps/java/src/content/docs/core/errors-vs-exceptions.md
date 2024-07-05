---
title: Errors vs exceptions
---

## tldr
Errors are unrecoverable system failures beyond program control and requires program termination whereas exceptions
represent unexpected issues within the program that can often be handled.

Errors occur at runtime when the system encounters resource limitations. 

## Exceptions
Exceptions represent unexpected issues within the program that can often be handled within program. Exceptions are just
Java objects with all of them extending from `Throwable`.

## Exception hierarchy
### Checked exceptions
These are the exception that are checked by compiler at compile-time. Since it's checked at compile-time, compiler requires
you to handle exception either declaratively throw the exception up the call stack, or handle it programmatically. 
For example, *FileNotFoundException*, *IOException*, *ServletException* and so on.

### Unchecked exceptions
These are the exception that occurs at run-time. Simply put, if we create an exception that extends RuntimeException,
it will be unchecked; otherwise, it will be checked. The compiler doesn't force you to handle these exceptions.
For example, *NullPointerException*, *IllegalArgumentException*, *ArithmeticException*, *SecurityException* and so on.

### Errors
They represent serious and usually system failures and irrecoverable conditions like a library incompatibility, infinite
recursion, or memory leaks. And even though they don’t extend RuntimeException, they are also unchecked.
For example, *StackOverflowError*, *OutOfMemoryError* and so on.

## Exception handling
### throws
Probably the simplest mechanism to handle an exception is to rethrow it.
```java
private String readLine(String fileName) throws IOException {
    BufferedReader reader = new BufferedReader(new FileReader(fileName));
    String line =  reader.readLine();
    reader.close();
    return line;
}
```
Because IOException is a checked exception, this is the simplest way to satisfy the compiler, but it does 
mean that anyone that calls our method now needs to handle it too!

## try-catch
```java
private String readLine(String fileName) {
    try {
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        String line =  reader.readLine();
        reader.close();
        return line;
		} catch (IOException e) {
        logger.error("Couldn't read the line", e);
        return null;
		}
}
```

Or you could rethrow it.
```java
private String readLine(String fileName) {
    try {
        BufferedReader reader = new BufferedReader(new FileReader(fileName));
        String line =  reader.readLine();
        reader.close();
        return line;
		} catch (IOException e) {
        throw new MyCustomException("Unable to read line");
		}
}
```

## Resources
- https://www.baeldung.com/java-exceptions
