import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { ContactComponent } from '../contact/contact.component';
import { CtaComponent } from '../cta/cta.component';
import { FaqComponent } from '../faq/faq.component';
import { HeroComponent } from '../hero/hero.component';
import { PortfolioComponent } from '../portfolio/portfolio.component';
import { PricingComponent } from '../pricing/pricing.component';
import { ServicesComponent } from '../services/services.component';
import { StepsComponent } from '../steps/steps.component';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-index',
  imports: [HeroComponent, AboutComponent, ServicesComponent, StepsComponent, CtaComponent, PortfolioComponent, PricingComponent, FaqComponent, ContactComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IndexComponent implements OnInit {
  
  constructor(private seoService: SeoService) {}

  ngOnInit(): void {
    this.setupSEO();
    this.addStructuredData();
  }

  private setupSEO(): void {
    this.seoService.updateSEO({
      title: 'David Ortega - Desarrollador Full Stack | Angular, React, Node.js',
      description: 'Desarrollador Full Stack especializado en Angular, React, Node.js y MongoDB. Creación de aplicaciones web modernas, APIs REST y soluciones tecnológicas innovadoras.',
      keywords: 'David Ortega, Desarrollador Full Stack, Angular Developer, React Developer, Node.js, MongoDB, Express, JavaScript, TypeScript, Desarrollo Web, APIs REST, Frontend, Backend',
      ogTitle: 'David Ortega - Desarrollador Full Stack | Angular, React, Node.js',
      ogDescription: 'Desarrollador Full Stack especializado en tecnologías modernas. Creación de aplicaciones web, APIs y soluciones tecnológicas innovadoras.',
      ogImage: 'https://davidortega.dev/img/og-image.jpg',
      ogUrl: 'https://davidortega.dev',
      twitterTitle: 'David Ortega - Desarrollador Full Stack',
      twitterDescription: 'Desarrollador Full Stack especializado en Angular, React, Node.js y MongoDB.',
      twitterImage: 'https://davidortega.dev/img/og-image.jpg',
      canonical: 'https://davidortega.dev',
      robots: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'
    });
  }

  private addStructuredData(): void {
    // Limpiar datos estructurados previos
    this.seoService.clearStructuredData();

    // Datos estructurados para Person/Professional
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "David Ortega",
      "jobTitle": "Desarrollador Full Stack",
      "description": "Desarrollador Full Stack especializado en Angular, React, Node.js y MongoDB",
      "url": "https://davidortega.dev",
      "image": "https://davidortega.dev/img/david-ortega-profile.jpg",
      "sameAs": [
        "https://linkedin.com/in/davidortega-dev",
        "https://github.com/davidortega-dev",
        "https://twitter.com/davidortega_dev"
      ],
      "knowsAbout": [
        "JavaScript",
        "TypeScript",
        "Angular",
        "React",
        "Node.js",
        "MongoDB",
        "Express.js",
        "HTML5",
        "CSS3",
        "REST APIs",
        "Web Development",
        "Full Stack Development"
      ],
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "CO"
      }
    };

    // Datos estructurados para Professional Service
    const serviceSchema = {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "name": "DavidOrtega.Dev - Servicios de Desarrollo Web",
      "description": "Servicios profesionales de desarrollo web full stack, creación de aplicaciones modernas y APIs REST",
      "url": "https://davidortega.dev",
      "telephone": "+573003887576",
      "priceRange": "$$",
      "serviceType": "Web Development",
      "provider": {
        "@type": "Person",
        "name": "David Ortega"
      },
      "areaServed": {
        "@type": "Country",
        "name": "Colombia"
      },
      "hasOfferCatalog": {
        "@type": "OfferCatalog",
        "name": "Servicios de Desarrollo Web",
        "itemListElement": [
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo Frontend",
              "description": "Desarrollo de interfaces de usuario modernas con Angular y React"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo Backend",
              "description": "Desarrollo de APIs REST y servicios backend con Node.js"
            }
          },
          {
            "@type": "Offer",
            "itemOffered": {
              "@type": "Service",
              "name": "Desarrollo Full Stack",
              "description": "Desarrollo completo de aplicaciones web modernas"
            }
          }
        ]
      }
    };

    // Datos estructurados para Website
    const websiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "DavidOrtega.Dev",
      "url": "https://davidortega.dev",
      "description": "Portfolio profesional de David Ortega, Desarrollador Full Stack",
      "author": {
        "@type": "Person",
        "name": "David Ortega"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://davidortega.dev/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    };

    // Agregar los esquemas
    this.seoService.addStructuredData(personSchema);
    this.seoService.addStructuredData(serviceSchema);
    this.seoService.addStructuredData(websiteSchema);
  }
}
