---
title: Variable hiding
---

Scenario where local variable in a method or constructor has the same name as an instance variable or a class
variable is known as variable hiding (i.e. local variable hides the instance variable or class variable).
```java
public class Main {
  
  private String text = "outer variable";
  
  public Main() {
    String text = "constructor variable";
    System.out.println(text);
  }
  
  public void localVariable() {
    String text = "local variable";
    System.out.println(text);
  }
  
  public void instanceVariable() {
    String text = "instance variable";
    System.out.println(this.text);
  }
}
```
Local variables within the constructor and methods hide the instance variable instance text.
