import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify/functions';
import { oopRoutes, stringRoutes } from './src/routes';

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
          label: 'Java Core',
          items: [
            { label: 'JRE vs JVM vs JDK', link: '/core/jre-vs-jvm-vs-jdk' },
            { label: 'Avoid using wildcard import', link: '/core/avoid-using-wildcard-import' },
            { label: 'Deep copy vs shallow copy', link: '/core/deep-copy-vs-shallow-copy' },
            stringRoutes,
            { label: 'Errors vs exceptions', link: '/core/errors-vs-exceptions' },
            oopRoutes,
            { label: 'Java Sandbox', link: '/core/java-sandbox' }
          ]
        }
      ]
    })
  ]
});
