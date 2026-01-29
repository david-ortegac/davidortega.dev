import { SEOConfig } from "../models/SEOData";

export const SEO_CONFIG: SEOConfig = {
  siteName: 'DavidOrtega.Dev',
  siteUrl: 'https://davidortega.dev',
  defaultTitle: 'David Ortega - Desarrollador Full Stack | Angular, React, Node.js',
  defaultDescription: 'Desarrollador Full Stack especializado en Angular, React, Node.js y MongoDB. Creación de aplicaciones web modernas, APIs REST y soluciones tecnológicas innovadoras.',
  defaultKeywords: 'David Ortega, Desarrollador Full Stack, Angular Developer, React Developer, Node.js, MongoDB, Express, JavaScript, TypeScript, Desarrollo Web, APIs REST, Frontend, Backend',
  defaultImage: 'https://davidortega.dev/img/og-image.jpg',
  twitterHandle: '@davidortega_dev',
  googleSiteVerification: 'tu-codigo-de-verificacion-aqui',
  bingSiteVerification: 'tu-codigo-de-verificacion-bing-aqui',
  language: 'es',
  locale: 'es_ES',
  themeColor: '#0d6efd'
};

// Configuración de páginas específicas
export const PAGE_SEO_CONFIG = {
  home: {
    title: 'David Ortega - Desarrollador Full Stack | Inicio',
    description: 'Bienvenido al portfolio de David Ortega, desarrollador full stack especializado en tecnologías modernas.',
    keywords: 'portfolio, desarrollador web, servicios desarrollo'
  },
  about: {
    title: 'Sobre Mí - David Ortega | Desarrollador Full Stack',
    description: 'Conoce más sobre David Ortega, su experiencia y habilidades como desarrollador full stack.',
    keywords: 'sobre mi, experiencia, habilidades, desarrollador'
  },
  services: {
    title: 'Servicios de Desarrollo Web - David Ortega',
    description: 'Servicios profesionales de desarrollo web: Frontend, Backend, APIs REST y aplicaciones completas.',
    keywords: 'servicios desarrollo web, frontend, backend, apis rest'
  },
  portfolio: {
    title: 'Portfolio - Proyectos de David Ortega',
    description: 'Explora los proyectos y trabajos realizados por David Ortega como desarrollador full stack.',
    keywords: 'portfolio, proyectos, trabajos, aplicaciones web'
  },
  contact: {
    title: 'Contacto - David Ortega | Desarrollador Full Stack',
    description: 'Ponte en contacto con David Ortega para tu próximo proyecto de desarrollo web.',
    keywords: 'contacto, presupuesto, proyecto, desarrollo web'
  },
  tutorials: {
    title: 'Tutoriales de Programación - David Ortega',
    description: 'Tutoriales y guías de programación sobre Angular, React, Node.js y más tecnologías.',
    keywords: 'tutoriales, programación, angular, react, nodejs, guías'
  }
};

// Configuración de breadcrumbs para SEO
export const BREADCRUMB_CONFIG = {
  home: [
    { name: 'Inicio', url: '/' }
  ],
  about: [
    { name: 'Inicio', url: '/' },
    { name: 'Sobre Mí', url: '/#about' }
  ],
  services: [
    { name: 'Inicio', url: '/' },
    { name: 'Servicios', url: '/#services' }
  ],
  portfolio: [
    { name: 'Inicio', url: '/' },
    { name: 'Portfolio', url: '/#portfolio' }
  ],
  contact: [
    { name: 'Inicio', url: '/' },
    { name: 'Contacto', url: '/#contact' }
  ],
  tutorials: [
    { name: 'Inicio', url: '/' },
    { name: 'Tutoriales', url: '/tutorials' }
  ]
};