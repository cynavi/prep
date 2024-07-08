---
title: Fail-fast vs fail-safe iterators
---

## tldr
Fail-fast iterators (`ArrayList`, `HashMap`) throws `ConcurrentModificationException` if a collection is modified while iterating
over it whereas fail-safe iterators (`ConcurrentHashMap`, `CopyOnWriteArrayList`) does not as they use copy of original collection.

## Fail-fast
Fail-fast system shuts down its operation as-fast-as-possible when errors or failures occurs exposing those
failures and errors immediately.

Fail-fast iterators does not tolerate any structural modifications (add, remove or update) to a collection
while iterating over it. This is because collections maintain an internal counter called `modCount`. When an
item is added or removed from the Collection, `modCount` counter gets incremented. When iterating, on 
each `next()` call, the current value of `modCount` gets compared with the initial value. If there’s a
mismatch, it throws `ConcurrentModificationException` which shuts down the entire operation.

Default iterators for Collections from `java.util` package such as `ArrayList`, `HashMap`, etc. are Fail-Fast.

Removing element using Iterator‘s `remove()` method is entirely safe and no exception is throws whereas if
Collection's `remove()` is used, an exception is thrown.
```java
public class Main {
  
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<Integer>();
        list.add(1);
        list.add(2);
        list.add(3);
 
        Iterator<Integer> iterator = list.iterator();
        while (iterator.hasNext()) {
            Integer integer = (Integer) it.next();
            if (iterator.next() == 2) {
              iterator.remove(); // this is safe
            }
            
            if (iterator.next() == 3) {
              numbers.remove(2); // throws ConcurrentModificationException
            }
            list.add(4); // throws ConcurrentModificationException
        }
    }
}
```

## Fail-safe
Fail-safe iterators on the other hand doesn't throw any exception if the collection is modified while
iterating over it. This is because fail-safe iterators work on the clone of the collection, so any structural
modification done on the original collection goes unnoticed.

However, this convenience does come with some drawbacks. Firstly, iterator isn’t guaranteed to return updated
data from the Collection as it’s working on the clone. Secondly, there's an overhead of creating a copy of
the Collection.

Iterators from `java.util.concurrent` package such as `ConcurrentHashMap`, `CopyOnWriteArrayList`, etc. are
fail-safe.
```java
public class Main {
    public static void main(String[] args) {
        ConcurrentHashMap<String, Integer> map = new ConcurrentHashMap<String, Integer>();
        map.put("key1", 1);
        map.put("key2", 2);
 
        Iterator<String> iterator = map.keySet().iterator();
        while (iterator.hasNext()) {
            String key = (String) iterator.next();
            map.put("key3", 3);// not be reflected in the Iterator
        }
    }
}
```
