---
title: Bean Definition Inheritance
---

Child bean definitions in Spring allow you to create a new bean definition based on an existing parent bean
definition. This approach helps avoid duplication in configuration and provides a consistent way to manage
similar beans.
 
---

## 1. Parent and Child Bean Definitions
A child bean definition inherits configuration data from a parent definition. It can override specific values
or add new ones without redefining the entire bean.

### Key Features
- **Inheritance:** The child bean inherits property values, constructor arguments, and other settings from the parent bean.
- **Customizability:** Child beans can override specific properties or add new ones.

### Example (XML Configuration)
```xml
<bean id="parentBean" class="com.example.ParentBean">
<property name="commonProperty" value="Common Value" />
</bean>
 
<bean id="childBean" class="com.example.ChildBean" parent="parentBean">
<property name="childSpecificProperty" value="Child Value" />
</bean>
```
- The `parent` attribute references the parent bean.
- Child beans inherit the parent's scope, constructor arguments, and property values unless explicitly overridden.
- A parent bean cannot be instantiated on its own unless marked as abstract.

---

## 2. Abstract Parent Beans
Abstract beans act as templates and cannot be instantiated. They are useful for defining shared configurations.

### Example
```xml
<bean id="abstractParent" class="com.example.BaseBean" abstract="true">
<property name="baseProperty" value="Base Value" />
</bean>
 
<bean id="concreteBean" class="com.example.ConcreteBean" parent="abstractParent">
<property name="specificProperty" value="Specific Value" />
</bean>
```
- Abstract beans must include the `abstract="true"` attribute.
- They serve as blueprints for other beans but cannot be instantiated directly.

---

## 3. Annotation-Based Child Bean Configuration

While XML configuration is the traditional way to define parent-child relationships, annotations can also achieve
similar results using inheritance and configuration classes.

### Example
#### Parent Bean
```java
@Configuration
public class ParentConfig {
 
    @Bean
    public ParentBean parentBean() {
        ParentBean parent = new ParentBean();
        parent.setCommonProperty("Common Value");
        return parent;
    }
}
```

#### Child Bean
```java
@Configuration
public class ChildConfig extends ParentConfig {
 
    @Bean
    @Override
    public ParentBean parentBean() {
        ParentBean child = super.parentBean();
        child.setChildSpecificProperty("Child Value");
        return child;
    }
}
```

### When to Use
- When configurations share a significant overlap and inheritance can reduce redundancy.
- For large projects where multiple beans require similar base configurations.

---

## 4. Overriding Parent Bean Properties
Child beans can override specific properties of the parent.

### Example
```xml
<bean id="parentBean" class="com.example.ParentBean">
<property name="propertyA" value="Value A" />
<property name="propertyB" value="Value B" />
</bean>
 
<bean id="childBean" class="com.example.ChildBean" parent="parentBean">
<property name="propertyB" value="Overridden Value" />
<property name="propertyC" value="New Value" />
</bean>
```

### Important Notes
- Overridden properties in the child bean replace those in the parent.
- New properties in the child bean are added to the configuration.

---

## 5. Combining XML and Annotations
Spring allows a combination of XML and annotation-based configurations. For example, parent beans can be
defined in XML, and child beans can be configured using annotations.

### Example
#### XML Configuration for Parent
```xml
<bean id="xmlParent" class="com.example.BaseBean">
<property name="commonProperty" value="XML Defined Value" />
</bean>
```

#### Annotation-Based Child Bean
```java
@Configuration
public class AnnotationChildConfig {
 
    @Bean
    public BaseBean childBean(@Qualifier("xmlParent") BaseBean parentBean) {
        parentBean.setSpecificProperty("Annotation Defined Value");
        return parentBean;
    }
}
```

---

## 6. Best Practices
1. **Use Abstract Beans:** Define shared configurations in abstract beans to avoid duplication.
2. **Leverage Annotations:** Use Java configuration and annotations for better readability and maintainability.
3. **Keep Configurations Modular:** Separate parent and child configurations logically to enhance clarity.
4. **Override Intentionally:** Clearly document overridden properties to avoid confusion.

---
