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

