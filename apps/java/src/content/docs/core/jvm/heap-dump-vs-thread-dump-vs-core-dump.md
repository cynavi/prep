---
title: Heap dump vs thread dump vs core dump
---

## Heap dump
JVM creates the heap which contains references to objects in use at runtime. Heap dump is a saved copy of the
current state of all objects in use at runtime.

Heap dumps is helpful when analyzing scenario like `OutOfMemoryError`.
```java
public class Main {
    public static void main(String[] args) {
        List<Integer> nums = new ArrayList<>();
        try {
            while (true) {
                nums.add(10);
            }
        } catch (OutOfMemoryError e) {
            System.out.println("Out of memory error occurred!");
        }
    }
}
```
To capture heap dump use tools like `jmap`.

### Thread dump
Thread dump contains the snapshot of all threads in a running Java program at a specific instant. Thread dump is
helpful for analyzing performance issues (detecting threads stuck in an infinite loop, deadlocks where multiple
threads are waiting for one other to release resources, threads not getting enough CPU time).
```java
public class ThreadDump {
    public static void main(String[] args) {
        longRunningTask();
    }
    
    private static void longRunningTask() {
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            if (Thread.currentThread().isInterrupted()) {
                System.out.println("Interrupted!");
                break;
            }
            System.out.println(i);
        }
    }
}
```

## References
- https://www.baeldung.com/java-heap-thread-core-dumps
