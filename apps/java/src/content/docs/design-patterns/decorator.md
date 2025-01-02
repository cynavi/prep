---
title: Decorator
---

The decorator pattern is a powerful structural design pattern that allows you to add new
behaviors to objects dynamically without altering their structure. It's particularly useful
when you need to modify the functionality of individual objects at runtime, promoting 
flexibility and code reusability.

Imagine you're working on a text editing application. You want to provide users with the ability
to format their text in various ways, such as making it bold, italic, underlined, or adding 
strikethrough.

## Two Less-Than-Ideal Approaches

### 1. Inheritance Explosion

One approach might involve creating a separate subclass for every possible text formatting
combination. This leads to a class hierarchy that explodes exponentially as new formatting 
options are introduced. Maintaining such a hierarchy becomes cumbersome and inflexible.

```java
class Text {
  private String content;

  public Text(String content) {
    this.content = content;
  }

  public String getContent() {
    return content;
  }
}

class BoldText extends Text {
  @Override
  public String getContent() {
    return "<b>" + super.getContent() + "</b>";
  }
}

class ItalicText extends Text {
  @Override
  public String getContent() {
    return "<i>" + super.getContent() + "</i>";
  }
}
// ... and an explosion of classes for BoldItalicText, UnderlinedText, etc.
```

### 2. God Class
Another approach might involve creating a single class, FormattedText, responsible for storing
the text content and handling all formatting logic. This "god class" would become bloated with 
conditional statements to handle different formatting combinations, making it difficult to 
maintain and test.

```java
class FormattedText {
  private String content;
  private boolean bold;
  private boolean italic;
  private boolean underline;
  private boolean strikethrough;

  public FormattedText(String content) {
    this.content = content;
  }

  public void setBold(boolean bold) { this.bold = bold; }
  public void setItalic(boolean italic) { this.italic = italic; }
  public void setUnderline(boolean underline) { this.underline = underline; }
  public void setStrikethrough(boolean strikethrough) { this.strikethrough = strikethrough; }

  public String getContent() {
    StringBuilder sb = new StringBuilder();
    if (bold) sb.append("<b>");
    if (italic) sb.append("<i>");
    sb.append(content);
    if (italic) sb.append("</i>");
    if (bold) sb.append("</b>");
    if (underline) sb.append("<u>"); //Example for underline
    if (strikethrough) sb.append("<strike>"); //Example for strikethrough
    //Add closing tags for underline and strikethrough
    if (strikethrough) sb.append("</strike>");
    if (underline) sb.append("</u>");
    return sb.toString();
  }
}
```

## The Decorator Pattern Solution
The decorator pattern offers a more elegant and flexible solution. It allows you to create 
a base Text and separate decorator classes for each formatting option (Bold, Italic,
Underline, etc.). These decorators dynamically wrap the text component and add their specific 
formatting behavior.

```java
interface Text {
    String getContent();
}
```

```java
class TextImpl implements Text {
    private String content;

    public TextImpl(String content) {
        this.content = content;
    }

    @Override
    public String getContent() {
        return content;
    }
}
```

```java
abstract class TextDecorator implements Text {
    protected Text text;

    public TextDecorator(Text text) {
        this.text = text;
    }

    @Override
    public abstract String getContent();

    public Text getTextComponent() {
        return text;
    }
}
```

```java
class BoldDecorator extends TextDecorator {
    public BoldDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<b>" + getTextComponent().getContent() + "</b>";
    }
}
```

```java
class ItalicDecorator extends TextDecorator {
    public ItalicDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<i>" + getTextComponent().getContent() + "</i>";
    }
}
```

```java
class UnderlineDecorator extends TextDecorator {
    public UnderlineDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<u>" + getTextComponent().getContent() + "</u>";
    }
}
```

```java
class StrikethroughDecorator extends TextDecorator {
    public StrikethroughDecorator(Text text) {
        super(text);
    }

    @Override
    public String getContent() {
        return "<strike>" + getTextComponent().getContent() + "</strike>";
    }
}
```

```java
public class DecoratorExample {
    public static void main(String[] args) {
        Text myText = new Text("Hello, Decorator Pattern!");

        Text boldText = new BoldDecorator(myText);
        System.out.println(boldText.getContent()); // Output: <b>Hello, Decorator Pattern!</b>

        Text boldItalicText = new ItalicDecorator(boldText);
        System.out.println(boldItalicText.getContent()); // Output: <b><i>Hello, Decorator Pattern!</i></b>

        Text underlinedBoldItalicText = new UnderlineDecorator(boldItalicText);
        System.out.println(underlinedBoldItalicText.getContent()); // Output: <u><b><i>Hello, Decorator Pattern!</i></b></u>

        Text strikedUnderlinedBoldItalicText = new StrikethroughDecorator(underlinedBoldItalicText);
        System.out.println(strikedUnderlinedBoldItalicText.getContent()); // Output: <strike><u><b><i>Hello, Decorator Pattern!</i></b></u></strike>
    }
}
```

## Limitations and Pitfalls
- **Violation of Interface Segregation Principle (Potentially)**: If the Text interface
had many methods that some decorators didn't need, those decorators would still have to implement
them, violating the Interface Segregation Principle.

- **Increased Complexity**: The decorator pattern can introduce additional layers of abstraction,
making the code slightly more complex to understand, especially when many decorators are 
combined.

## Classic Use Cases
- **Text Formatting (as demonstrated)**: Applying various formatting options (bold, italic,
underline, etc.) to text dynamically.

- **GUI Components**: Adding borders, scrollbars, or other visual enhancements to GUI elements.

- **Input/Output Streams**: Compression, encryption, or buffering of data streams.

- **Middleware in Web Applications**: Adding functionalities like logging, authentication, or 
caching to requests and responses.

## Advantages
- **Open/Closed Principle**: You can add new formatting options (decorators) without modifying
the existing Text class or other decorators.

- **Composition over Inheritance**: The pattern favors composition, allowing for greater 
flexibility in combining different formatting options compared to inheritance.

- **Single Responsibility Principle**: Each decorator has a specific responsibility, promoting 
modularity and maintainability.

The decorator pattern is a valuable tool for adding responsibilities to objects dynamically,
promoting code reusability and flexibility. The diamond problem, mentioned in the original 
text, is a problem specific to inheritance hierarchies with multiple inheritance, and is not
relevant in this example using composition.
