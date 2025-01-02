---
title: Singleton Pattern
---

The **Singleton Pattern** is a *creational design pattern* that ensures a class has at most **one instance** and provides
a **global point of access** to this instance.

---

### Motivation
Imagine developing software for an **application configuration manager**. In a large enterprise application, configuration
settings such as **database credentials**, **API keys**, and **feature flags** need to be consistent across the system. These
configurations should:

1. **Centralized Access:** Ensure all components access the same configuration source.
2. **Consistent State:** Any update to a configuration (e.g., changing a database connection string) should immediately 
reflect across all modules.
3. **Global Access:** Different modules and services should access the same configuration instance.

If multiple configuration manager instances exist, discrepancies may occur, leading to inconsistent system behavior.

**Problem:** How do we ensure only one instance of the configuration manager exists while maintaining a global point of access?

**Solution:** Enter the **Singleton Pattern**.

---

### The Problem with Multiple Instances
Suppose we designed a **ConfigManager** class without Singleton enforcement:

```java
public class ConfigManager {
    private Map<String, String> settings = new HashMap<>();

    public void setProperty(String key, String value) {
        settings.put(key, value);
    }

    public String getProperty(String key) {
        return settings.get(key);
    }
}
```

Here, every module might create its own `ConfigManager` instance. If **Service A** updates the database URL, **Service B**
might still use the old URL.

The inconsistency arises because there’s no **single source of truth**.

### The Singleton Solution
Using the **Singleton Pattern**, we ensure that:
- Only one `ConfigManager` instance exists.
- All services share the same configuration state.
- Changes by one module are immediately visible to others.

Singleton ensures **centralized control** and a **single access point**.

---

### Key Singleton Concepts

1. **Private Static Variable:** Holds the single instance.
2. **Private Constructor:** Prevents external instantiation.
3. **Public Static Method (getInstance):** Provides controlled access to the single instance.
4. **Lazy Initialization:** Creates the instance only when required.

**Implementation Example:**

```java
public class ConfigManager {
    private static volatile ConfigManager uniqueInstance = null;
    private Map<String, String> settings;

    private ConfigManager() {
        settings = new HashMap<>();
        settings.put("db_url", "jdbc:mysql://localhost:3306/app");
    }

    public static ConfigManager getInstance() {
        if (uniqueInstance == null) {
            synchronized (ConfigManager.class) {
                if (uniqueInstance == null) {
                    uniqueInstance = new ConfigManager();
                }
            }
        }
        return uniqueInstance;
    }

    public String getProperty(String key) {
        return settings.get(key);
    }

    public void setProperty(String key, String value) {
        settings.put(key, value);
        System.out.println(key + " updated to " + value);
    }
}
```

**Client Code Example:**

```java
public class Client {
    public static void main(String[] args) {
        ConfigManager config1 = ConfigManager.getInstance();
        ConfigManager config2 = ConfigManager.getInstance();

        config1.setProperty("api_key", "12345");
        System.out.println(config2.getProperty("api_key")); // 12345
    }
}
```

Here, both `config1` and `config2` reference the **same Singleton instance**, ensuring consistent states.

---

### Thread Safety and Double-Checked Locking
The above implementation uses **Double-Checked Locking** to ensure thread safety while minimizing synchronization overhead.

- **volatile** prevents memory inconsistencies.
- **synchronized block** ensures only one instance is created in a multi-threaded environment.

**Alternative: Enum Singleton**

```java
public enum ConfigManager {
    INSTANCE;
    private Map<String, String> settings;

    ConfigManager() {
        settings = new HashMap<>();
        settings.put("db_url", "jdbc:mysql://localhost:3306/app");
    }

    public String getProperty(String key) {
        return settings.get(key);
    }

    public void setProperty(String key, String value) {
        settings.put(key, value);
    }
}
```

**Advantages of Enum Singleton:**
- Simplified implementation.
- Protection against serialization and reflection attacks.

---

### Limitations and Pitfalls

1. **Single Responsibility Principle Violation**

The class manages both its core functionality and its instantiation.

2. **Unit Testing Challenges**

Singleton's global state can persist across tests, causing side effects.

**Solution:** Use dependency injection or reset the singleton in test cases.

3. **Global State Management**

State can be modified from anywhere, making debugging challenging.

While global state management is often considered a limitation of the Singleton Pattern, it becomes an advantage in 
frameworks like Redux.

**Why Redux Makes Global State Effective**

- **Controlled State Changes**: State can only be updated through actions and reducers, ensuring predictable changes.

- **Immutability**: Redux enforces immutable state updates, avoiding unpredictable mutations.

- **Debugging Tools**: Redux DevTools provide visibility into every state transition.

- **State Isolation**: State slices can be scoped to specific components, improving efficiency.

In contrast, Singleton global state often lacks these safeguards, leading to tight coupling and debugging challenges. Redux's 
design addresses these pitfalls effectively. While global state can be a drawback in poorly managed Singletons, in structured
frameworks like Redux, it becomes a powerful feature for predictable state management.

4. **Anti-Pattern Argument**

Excessive reliance on Singleton can lead to tight coupling.

---

### Classic Use Cases of Singleton

1. **Configuration Manager:** Centralized access to application settings.
2. **Connection Pool:** Manage expensive resources like database connections.
3. **Logging Service:** Ensure consistent log formats and outputs.
4. **Hardware Interface Access:** Prevent conflicting commands to shared devices.
5. **Cache Manager:** Manage application-level caches efficiently.

---

### Comparison: Lazy vs Eager Initialization

| **Aspect**       | **Lazy Initialization** | **Eager Initialization** |
|-------------------|--------------------------|---------------------------|
| **When Created** | On first access         | During class loading      |
| **Resource Use** | Efficient               | May waste memory          |
| **Thread Safety**| Requires handling       | Guaranteed by JVM         |

---
