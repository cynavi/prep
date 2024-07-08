---
title: Creating thread
---

## By extending `java.lang.Thread` class
Extend the `Thread` class and override `run()` method.
```java
public class Main extends Thread {
    
    @Override
    public void run() {
        // Perform task here
    } 
}
```
To start performing task, create and object of `Main` and call `start()` method.
```java
Main main = new Main();
main.start();
```

## By implementing `java.lang.Runnable` interface
Implement the `Runnable` interface and override `run()` method.
```java
public class Main implements Runnable {

    @Override
    public void run() {
      // Perform task here
    }
}
```
To start performing task, create an object to `java.lang.Thread` class by passing an object of your 
thread class which implements Runnable interface and call `start()` method.
```java
Thread t = new Thread(new Main());      
t.start();
```
## Keynotes
Extending `Thread` class means you will limit your class to thread behavior as you cannot extend
any other class (Multiple inheritance).

Extending `Thread` class means you will inherit all the methods of `Thread` which you may not need.

Implementing `Runnable` interface will separate actual task from the runner. `Runnable` interface
represents only the task, and you can pass this task to any type of runner, either a thread or any executors.

Implementing `Runnable` makes your code loosely coupled. Because it separates the task from the runner.
Extending `Thread` will make your code tightly coupled. Because, single class will act as both 
task container and runner.
