import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify/functions';
import { collectionsRoutes, jdbcRoutes, oopRoutes, securityRoutes, stringRoutes, threadRoutes } from './src/routes';

// https://astro.build/config
export default defineConfig({
  adapter: netlify(),
  trailingSlash: 'never',
  integrations: [
    starlight({
      title: 'Java Preparation',

      social: {
        github: 'https://github.com/cynavi/prep'
      },
      sidebar: [
        {
          label: 'Core Misc',
          items: [
            { label: 'JRE vs JVM vs JDK', link: '/core/jre-vs-jvm-vs-jdk' },
            { label: 'Avoid using wildcard import', link: '/core/avoid-using-wildcard-import' },
            { label: 'main() method', link: '/core/main-method' },
            { label: 'Deep copy vs shallow copy', link: '/core/deep-copy-vs-shallow-copy' },
            { label: 'Errors vs exceptions', link: '/core/errors-vs-exceptions' },
            { label: 'Object creation without new operator', link: '/core/object-creation-without-new' },
            { label: 'Autoboxing and unboxing', link: '/core/autoboxing-and-unboxing'}
          ]
        },
        stringRoutes,
        collectionsRoutes,
        threadRoutes,
        oopRoutes,
        jdbcRoutes,
        securityRoutes
      ]
    })
  ]
});
