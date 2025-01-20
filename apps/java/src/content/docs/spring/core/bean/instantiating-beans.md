---
title: Instantiating Beans
---

For XML-based configuration metadata, you specify the type (or class) of object that is to be instantiated
int the `class` attribute of the `<bean/>` element. You can use the `class` (which, internally, is
a `Class` property on a `BeanDefinition` instance) in one of two ways:

- Typically, to specify the bean class to be constructed in the case where the container itself directly
creates the bean by calling its constructor reflectively, somewhat equivalent to Java code with the `new`
operator.

- To specify the actual class containing the `static` factory method that is invoked to create the 
object, in the less common case where the container invokes a `static` factory method on a class to 
create the bean. The object type returned from the invocation of the `static` factory method may be the
same class or another class entirely.

## Instantiation with a Constructor
