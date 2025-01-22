export const coreMiscRoutes = {
  label: 'Core Misc',
  items: [
    { label: 'JRE vs JVM vs JDK', link: '/core/jre-vs-jvm-vs-jdk' },
    { label: 'Avoid using wildcard import', link: '/core/avoid-using-wildcard-import' },
    { label: 'main() method', link: '/core/main-method' },
    { label: 'Integer caching', link: '/core/integer-caching' },
    { label: 'Variable hiding', link: '/core/variable-hiding' },
    { label: 'Deep copy vs shallow copy', link: '/core/deep-copy-vs-shallow-copy' },
    { label: 'Errors vs exceptions', link: '/core/errors-vs-exceptions' },
    { label: 'Object creation without new operator', link: '/core/object-creation-without-new' },
    { label: 'Autoboxing and unboxing', link: '/core/autoboxing-and-unboxing' }
  ],
  collapsed: true
} as const;

export const stringRoutes = {
  label: 'String',
  items: [
    {
      label: 'Never initialize String using constructor',
      link: '/core/string/never-initialize-string-using-constructor'
    },
    {
      label: 'Reference vs value comparison (== vs equals())',
      link: '/core/string/reference-vs-value-comparison'
    }],
  collapsed: true
} as const;

export const oopRoutes = {
  label: 'OOP',
  items: [
    { label: 'Multiple inheritance', link: '/core/oop/multiple-inheritance' }
  ],
  collapsed: true
} as const;

export const collectionsRoutes = {
  label: 'Collections',
  items: [
    { label: 'HashSet internal working', link: '/core/collections/hashset-internal-working' },
    { label: 'Fail-fast vs fail-safe', link: '/core/collections/fail-fast-vs-fail-safe' }
  ],
  collapsed: true
} as const;

export const threadRoutes = {
  label: 'Thread',
  items: [
    { label: 'Creating thread', link: '/core/thread/creating-thread' }
  ],
  collapsed: true
} as const;

export const securityRoutes = {
  label: 'Security',
  items: [
    { label: 'Java Sandbox', link: '/core/java-sandbox' }
  ],
  collapsed: true
} as const;

export const jdbcRoutes = {
  label: 'JDBC',
  items: [
    {
      label: 'execute() vs executeQuery() vs executeUpdate()',
      link: '/jdbc/execute-vs-execute-query-vs-execute-update'
    },
    {
      label: 'Statement vs PreparedStatement vs CallableStatement',
      link: '/jdbc/statement-vs-prepared-statement-vs-callable-statement'
    }
  ],
  collapsed: true
} as const;

export const genericsRoutes = {
  label: 'Generics',
  items: [
    { label: 'Why use generics?', link: '/core/generics/why-use-generics' },
    { label: 'Generic subtypes', link: '/core/generics/generic-subtypes' },
    { label: 'Bounded type parameters', link: '/core/generics/bounded-type-parameters' },
    { label: 'Wildcards', link: '/core/generics/wildcards' },
    { label: 'Type erasure', link: '/core/generics/type-erasure' }
  ],
  collapsed: true
} as const;

export const jvmRoutes = {
  label: 'JVM',
  items: [
    { label: 'JVM life cycle', link: '/core/jvm/jvm-life-cycle' },
    { label: 'How JVM executes Java code', link: '/core/jvm/how-jvm-executes-java-code' },
    { label: 'Heap dump vs thread dump vs core dump', link: '/core/jvm/heap-dump-vs-thread-dump-vs-core-dump' }
  ],
  collapsed: true
} as const;

export const designPatternsRoute = {
  label: 'Design Patterns', items: [
    { label: 'tldr', link: '/design-patterns/tldr' },
    {
      label: 'Creational Patterns',
      items: [
        { label: 'Singleton', link: '/design-patterns/singleton' },
        { label: 'Factory Method', link: '/design-patterns/factory-method' },
        { label: 'Builder', link: '/design-patterns/builder' }
      ],
      collapsed: true
    },
    {
      label: 'Structural Patterns',
      items: [
        { label: 'Adapter', link: '/design-patterns/adapter' },
        { label: 'Decorator', link: '/design-patterns/decorator' },
        { label: 'Facade', link: '/design-patterns/facade' }
      ],
      collapsed: true
    },
    {
      label: 'Behavioural Patterns',
      items: [
        { label: 'Strategy', link: '/design-patterns/strategy' },
        { label: 'Observer', link: '/design-patterns/observer' }
      ],
      collapsed: true
    }
  ],
  collapsed: true
} as const;

export const springRoutes = {
  label: 'Spring',
  items: [
    {label: 'Spring Principles', link: '/spring/core/spring-principles'},
    {
      label: 'IoC Container',
      items: [
        { label: 'IoC and DI', link: '/spring/core/ioc-container/ioc-and-di' },
        { label: 'IoC Container', link: '/spring/core/ioc-container/spring-ioc-container' },
        { label: 'Bean Overview', link: '/spring/core/ioc-container/bean-overview' },
        { label: 'Naming Beans', link: '/spring/core/ioc-container/naming-beans' },
        { label: 'Instantiating Beans', link: '/spring/core/ioc-container/instantiating-beans' },
        { label: 'Dependency Injection', link: '/spring/core/ioc-container/dependency-injection' },
        { label: 'Using depends-on', link: '/spring/core/ioc-container/depends-on' },
        { label: 'Lazily Initializing Beans', link: '/spring/core/ioc-container/lazily-initializing-beans' },
        { label: 'Method Injection', link: '/spring/core/ioc-container/method-injection' },
        { label: 'Bean Scopes', link: '/spring/core/ioc-container/bean-scopes' },
        { label: 'Customizing Beans', link: '/spring/core/ioc-container/customizing-beans' },
        { label: 'Inheriting Bean Definition', link: '/spring/core/ioc-container/bean-definition-inheritance' },
      ],
      collapsed: true
    }
  ],
  collapsed: true
} as const;
