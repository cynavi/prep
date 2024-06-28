---
title: Avoid using wildcard (*) import statement
---

## Rephrase

- Why import on demand is evil?


## tldr

- Avoiding wildcard helps to avoid potential class collision. E.g.
```text
java.lang.reflect.Array
java.sql.Array

VS

java.lang.reflect.*
java.sql.*
```
If you import `java.lang.reflect.*` and `java.sql.*` you'll have a collision on the `Array` type.
- Avoiding wildcard makes dependencies explicit, so that anyone who has to read your code later knows what you meant to import and what you didn't mean to import.
- Avoiding wildcard makes some compilation faster because the compiler doesn't have to search the whole package to identify dependencies, though this is usually not a huge deal with modern compilers.

## Compiling with wildcard vs without
```java
import java.util.*;
import java.util.Arraylist;
```
The import directive is a compiler directive, i.e this statement is executed while compiling the code. 
The compiler checks for Arraylist in the same package as the class at first. If it is unable to detect a class for the
same then the import directive comes into play. Now, this directive asks the compiler to search for the unidentified object in
the classes which have been imported. In the first case, Arraylist will be searched in the whole util class while in the latter 
it can directly go and put the reference of java.util.Arraylist in the .class file. Without the wildcard(*), the directive tells 
the compiler to look for one specific file in the classpath. Thus, it is suffice to say that the import directive may influence 
the compile time but it does not affect the runtime of the program.

### Further Scenario
Suppose your code is something like-

```java
import a.*;
import b.*;

Foo f;
```

and class `Foo` exists in package `a`. Now you check in your perfectly compiling code, and six months later, someone adds class
`Foo` to package `b`. (Perhaps it’s a third party lib that added classes in the latest version).

Poof! Now your code refuses to compile.

## The Big Bang
This is language design at its worst, and Sun made this blow up in everyone’s face between JDK 1.1 and 1.2. In 1.1, there existed java.awt.List. Tons of folks wrote code that included

```java
import java.util.*;
import java.awt.*;
```
If you used List in your class, like

`List choices = new List();`

Your code compiled fine in 1.1, but a runtime lib upgrade to Java 1.2 breaks your code!

BTW: Sun knew and announced this would happen. They should have created `java.util.collections.List` instead of `java.util.List` to prevent it.
It forced lots of people to change existing code for no gain.

Explicit imports make this all go away.

The inconvenient aspects of explicit imports are minimized with modern IDEs. Most IDEs allow you to collapse the import section so it's not in the way, automatically populate imports when needed, and automatically identify unused imports to help clean them up.
