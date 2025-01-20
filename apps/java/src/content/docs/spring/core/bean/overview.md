---
title: Bean Overview
---

A Spring IoC container manages one or more beans. These beans are created with the configuration
metadata that you supply to the container (for example, in the form of XML <bean/> definitions).

Within the container itself, these bean definitions are represented as BeanDefinition objects, which
contain (among other information) the following metadata:

- **A package-qualified class name**: typically, the actual implementation class of the bean being defined. 
- **Bean behavioral configuration elements**, which state how the bean should behave in the
container (scope, lifecycle callbacks, and so forth).
- **References to other beans** that are needed for the bean to do its work. These references are also
called collaborators or dependencies.
- Other configuration settings to set in the newly created object — for example, the size limit of
the pool or the number of connections to use in a bean that manages a connection pool.

In addition to bean definitions that contain information on how to create a specific bean, the
`ApplicationContext` implementations also permit the registration of existing objects that are created
outside the container (by users). This is done by accessing the ApplicationContext’s BeanFactory
through the `getBeanFactory()` method, which returns the `DefaultListableBeanFactory`
implementation. `DefaultListableBeanFactory` supports this registration through the
`registerSingleton(..)` and `registerBeanDefinition(..)` methods. However, typical applications
work solely with beans defined through regular bean definition metadata.

