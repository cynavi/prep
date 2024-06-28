import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify/functions';

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
            { label: 'Never initialize String using constructor', link: '/core/never-initialize-string-using-constructor' },
            { label: 'Reference vs value comparison (== vs equals())', link: '/core/reference-vs-value-comparison' },
            { label: 'Java Sandbox', link: '/core/java-sandbox' }
          ]
        }
      ]
    })
  ]
});

