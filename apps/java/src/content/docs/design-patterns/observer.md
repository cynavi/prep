---
title: Observer
---

The observer pattern is a behavioral design pattern that establishes a one-to-many dependency
between objects. When the state of one object (the subject) changes, all its dependents 
(observers) are notified automatically. This eliminates the need for constant polling and 
promotes loose coupling.

---
## Motivation: Stock Market Monitoring

Imagine a stock market application where various components (charts, portfolio trackers, news 
feeds) need to be updated whenever a stock's price changes. A naive approach would involve these
components constantly querying a central data source for updates—a process known as polling.

### Polling

In polling, the system maintains stock price data, and various components must repeatedly 
query the system for updates. While simple, this approach has several downsides:

*   **Inefficiency:** Constant polling increases server load and network traffic.
*   **Poor User Experience:** Components must actively check for updates, even when no changes occur, leading to delays in displaying real-time information.

Instead, an ideal solution should be loosely coupled, utilize Inversion of Control (IoC), and
adhere to the Single Responsibility Principle. This is where the Observer Pattern shines.

---

## The Solution: Observer Pattern

The observer pattern allows objects (observers) to subscribe to notifications from a subject
(publisher). When the subject's state changes, it automatically notifies all subscribed observers.

### Key Concepts:

*   **Subscription:** Components subscribe to notifications for specific stocks.
*   **Price Change:** Any change in a stock's price triggers notifications.
*   **Notification:** Subscribed components receive alerts about price updates.

This approach inverts control: instead of components checking manually, the system proactively
notifies them.

---

## Design and Implementation

The Observer Pattern has four main components:

1.  **Subject (Publisher):** Defines methods to register, remove, and notify observers.
    *   `registerObserver(Observer o)` - Add an observer.
    *   `removeObserver(Observer o)` - Remove an observer.
    *   `notifyObservers()` - Notify all observers about state changes.

2.  **Concrete Subject:** Implements the Subject interface, maintains the list of observers, 
and notifies them upon state changes.

3. **Observer:** Declares an `update()` method to handle notifications.

4.  **Concrete Observer:** Implements the Observer interface and processes updates.

### Push vs. Pull Models

*   **Push Model:** The subject directly sends the updated data to the observers. (Used in this example)
*   **Pull Model:** The subject only notifies observers of a change, and the observers must 
then request the updated data from the subject.

### Stock Market Example

```java
interface Subject {
    void registerObserver(Observer o);
    void removeObserver(Observer o);
    void notifyObservers();
}
```

```java
interface Observer {
    void update(double price);
}
```

```java
class Stock implements Subject {
    private List<Observer> observers = new ArrayList<>();
    private double price;

    @Override
    public void registerObserver(Observer o) {
        observers.add(o);
    }

    @Override
    public void removeObserver(Observer o) {
        observers.remove(o);
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(price);
        }
    }

    public void setPrice(double price) {
        this.price = price;
        notifyObservers();
    }

    public double getPrice() { return price; }
}
```

```java
class StockChart implements Observer {
    private double currentPrice;
    private Stock stock;
    public StockChart(Stock stock){
        this.stock = stock;
        stock.registerObserver(this);
    }

    @Override
    public void update(double price) {
        this.currentPrice = price;
        System.out.println("Stock Chart updated: New price is $" + currentPrice);
    }
}
```

```java
class PortfolioTracker implements Observer {
    private double currentPrice;
    private Stock stock;
    public PortfolioTracker(Stock stock){
        this.stock = stock;
        stock.registerObserver(this);
    }
    @Override
    public void update(double price) {
        this.currentPrice = price;
        System.out.println("Portfolio Tracker updated: New price is $" + currentPrice);
    }
}
```

```java
public class Main {
    public static void main(String[] args) {
        Stock googleStock = new Stock();
        StockChart chart = new StockChart(googleStock);
        PortfolioTracker tracker = new PortfolioTracker(googleStock);

        googleStock.setPrice(1500.00);
        googleStock.setPrice(1550.50);

        googleStock.removeObserver(tracker);
        googleStock.setPrice(1600.20);
    }
}
```

---

## Limitations and Pitfalls

1.  **Processing Overhead:** A large number of observers can lead to performance issues when
notifying them all.

2.  **Unintended Side Effects:** The order of notification is not guaranteed, which can lead 
to unexpected behavior if observers have dependencies on each other.

3.  **Debugging Complexity:** Tracing the flow of notifications and understanding the
interactions between many observers can be challenging.

---

## Use Cases

1.  **Graphical User Interfaces (GUIs):** Event handling in GUI frameworks (e.g., button clicks,
mouse movements).

2.  **Model-View-Controller (MVC) Architecture:** Updating views based on changes in the model.

3.  **Real-Time Data Monitoring:** Tracking stock prices, sensor readings, or other live data.

4.  **Event-Driven Systems:** Notifying components about events or state changes in other parts
of the system.

---

## Closing Notes
This pattern is particularly useful for event-driven systems and promotes cleaner, more modular
code structures.
The Observer Pattern achieves:

1.  **Loose Coupling:** Subjects and observers interact through interfaces, minimizing dependencies.

2.  **Inversion of Control:** The subject notifies observers, rather than observers polling the subject.

3.  **Scalability:** Adding new observers does not require modifying the subject.
---
