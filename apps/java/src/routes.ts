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
    { label: 'Autoboxing and unboxing', link: '/core/autoboxing-and-unboxing'}
  ]
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
    { label: 'HashSet internal working', link: '/core/collections/hashset-internal-working'},
    { label: 'Fail-fast vs fail-safe', link: '/core/collections/fail-fast-vs-fail-safe'}
  ],
  collapsed: true
} as const;

export const threadRoutes = {
  label: 'Thread',
  items: [
    { label: 'Creating thread', link: '/core/thread/creating-thread'}
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
    { label: 'execute() vs executeQuery() vs executeUpdate()', link: '/jdbc/execute-vs-execute-query-vs-execute-update'},
    { label: 'Statement vs PreparedStatement vs CallableStatement', link: '/jdbc/statement-vs-prepared-statement-vs-callable-statement'}
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
