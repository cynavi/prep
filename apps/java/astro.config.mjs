import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';
import netlify from '@astrojs/netlify/functions';
import {
  collectionsRoutes,
  coreMiscRoutes,
  jdbcRoutes,
  oopRoutes,
  securityRoutes,
  stringRoutes,
  threadRoutes
} from './src/routes';

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
        coreMiscRoutes,
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
