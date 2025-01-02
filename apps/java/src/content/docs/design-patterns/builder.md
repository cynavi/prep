---
title: Builder
---

The **Builder Pattern** is a *creational design pattern* that separates the construction of a 
complex object from its representation. This allows the same construction process to create 
different representations of an object while ensuring readability, flexibility, and scalability.

---

### **Motivation**

Imagine developing software for a **cloud infrastructure deployment tool**. When provisioning a 
cloud server, you need to configure various attributes:

- **CPU Cores**
- **RAM Size**
- **Storage Type** (SSD, HDD)
- **Operating System**
- **Network Configuration**

At first glance, you might attempt to use a constructor with all these parameters:

```java
public class CloudServer {
    private final int cpuCores;
    private final int ramSize;
    private final String storageType;
    private final String operatingSystem;
    private final String networkConfig;

    public CloudServer(int cpuCores,
                       int ramSize,
                       String storageType,
                       String operatingSystem,
                       String networkConfig) {
        this.cpuCores = cpuCores;
        this.ramSize = ramSize;
        this.storageType = storageType;
        this.operatingSystem = operatingSystem;
        this.networkConfig = networkConfig;
    }
}
```

**Problems with this approach:**
1. **Readability:** It's not clear which argument corresponds to which field.
2. **Scalability:** Adding new parameters would require modifying the constructor.
3. **Flexibility:** You can't skip optional parameters without overloading constructors.

A **Builder Pattern** offers a cleaner and more scalable solution.

---

### **Solution with Builder Pattern**

The **Builder Pattern** separates the construction process from the representation, making it 
easier to manage complex object creation.

**Key Benefits:**
- Clear and expressive code when constructing objects.
- Flexibility to add or skip optional parameters.
- Separation of construction logic from representation.

---

### **Core Components of the Builder Pattern**

1. **Product:** The complex object being constructed.
2. **Builder Interface:** Defines the steps for building the product.
3. **Concrete Builder:** Implements the steps defined by the Builder Interface.
4. **Director:** Controls the construction process and ensures the correct sequence of steps.
5. **Client:** Initiates the building process.

---

### **Real-World Example: Cloud Server Provisioning**

Let's design a **Cloud Server** provisioning system using the Builder Pattern.

#### **Step 1: Define the Product**

```java
public class CloudServer {
    private int cpuCores;
    private int ramSize;
    private String storageType;
    private String operatingSystem;
    private String networkConfig;

    public void setCpuCores(int cpuCores) { 
      this.cpuCores = cpuCores;
    }
    
    public void setRamSize(int ramSize) {
      this.ramSize = ramSize; 
    }
    
    public void setStorageType(String storageType) { 
      this.storageType = storageType;
    }
    
    public void setOperatingSystem(String operatingSystem) { 
      this.operatingSystem = operatingSystem; 
    }
    
    public void setNetworkConfig(String networkConfig) {
      this.networkConfig = networkConfig;
    }

    @Override
    public String toString() {
        return "CloudServer [CPU Cores=" + cpuCores + ", RAM=" + ramSize + ", Storage=" 
          + storageType + ", OS=" + operatingSystem + ", Network=" + networkConfig + "]";
    }
}
```

#### **Step 2: Define the Builder Interface**

```java
interface CloudServerBuilder {
    void setCpuCores();
    void setRamSize();
    void setStorageType();
    void setOperatingSystem();
    void setNetworkConfig();
    CloudServer build();
}
```

#### **Step 3: Create Concrete Builders**

**a. Standard Server Builder:**
```java
class StandardServerBuilder implements CloudServerBuilder {
    private CloudServer server = new CloudServer();

    @Override
    public void setCpuCores() { 
      server.setCpuCores(4); 
    }
  
    @Override
    public void setRamSize() { 
      server.setRamSize(16);
    }
    
    @Override
    public void setStorageType() { 
      server.setStorageType("SSD");
    }
    
    @Override
    public void setOperatingSystem() { 
      server.setOperatingSystem("Ubuntu"); 
    }
    
    @Override
    public void setNetworkConfig() { 
      server.setNetworkConfig("VPC-Standard"); 
    }

    @Override
    public CloudServer build() { 
      return server; 
    }
}
```

**b. High-Performance Server Builder:**
```java
class HighPerformanceServerBuilder implements CloudServerBuilder {
    private CloudServer server = new CloudServer();

    @Override
    public void setCpuCores() { 
      server.setCpuCores(16);
    }
  
    @Override
    public void setRamSize() { 
      server.setRamSize(64);
    }
    
    @Override
    public void setStorageType() {
      server.setStorageType("NVMe SSD"); 
    }
    
    @Override
    public void setOperatingSystem() { 
      server.setOperatingSystem("RedHat Enterprise"); 
    }
    
    @Override
    public void setNetworkConfig() { 
      server.setNetworkConfig("VPC-Premium"); 
    }

    @Override
    public CloudServer build() { 
      return server; 
    }
}
```

#### **Step 4: Director Class**
```java
class CloudServerDirector {
    public CloudServer constructServer(CloudServerBuilder builder) {
        builder.setCpuCores();
        builder.setRamSize();
        builder.setStorageType();
        builder.setOperatingSystem();
        builder.setNetworkConfig();
        return builder.build();
    }
}
```

#### **Step 5: Client Code**
```java
public class Client {
    public static void main(String[] args) {
        CloudServerDirector director = new CloudServerDirector();

        CloudServerBuilder standardBuilder = new StandardServerBuilder();
        CloudServer standardServer = director.constructServer(standardBuilder);
        System.out.println(standardServer);

        CloudServerBuilder highPerformanceBuilder = new HighPerformanceServerBuilder();
        CloudServer highPerformanceServer = director.constructServer(highPerformanceBuilder);
        System.out.println(highPerformanceServer);
    }
}
```

**Output:**
```
CloudServer [CPU Cores=4, RAM=16, Storage=SSD, OS=Ubuntu, Network=VPC-Standard]
CloudServer [CPU Cores=16, RAM=64, Storage=NVMe SSD, OS=RedHat Enterprise, Network=VPC-Premium]
```

---

### **Advantages of the Builder Pattern**
1. **Improved Readability:** Each attribute is explicitly set.
2. **Scalability:** Adding new configurations doesn’t require changing the constructor.
3. **Flexibility:** Different builders can construct variations of the same product.

---

### **Limitations and Pitfalls**
1. **Boilerplate Code:** Requires multiple classes and interfaces.
2. **Incomplete Objects:** If construction steps are missed, the object may be inconsistent.

---

### **Real-World Use Cases**
- **Database Query Builders** (e.g., Hibernate Criteria API)
- **JSON Parsing Libraries** (e.g., Gson's `GsonBuilder`)
- **UI Component Libraries** (e.g., Fluent APIs for UI Layouts)

---
