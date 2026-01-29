import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SEOData } from '../models/SEOData';

@Injectable({
  providedIn: 'root'
})
export class SeoService {

  constructor(
    private meta: Meta,
    private title: Title,
    @Inject(DOCUMENT) private document: Document
  ) { }

  updateSEO(data: SEOData): void {
    // Update title
    if (data.title) {
      this.title.setTitle(data.title);
    }

    // Update meta tags
    if (data.description) {
      this.meta.updateTag({ name: 'description', content: data.description });
    }

    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    if (data.robots) {
      this.meta.updateTag({ name: 'robots', content: data.robots });
    }

    // Update Open Graph tags
    if (data.ogTitle) {
      this.meta.updateTag({ property: 'og:title', content: data.ogTitle });
    }

    if (data.ogDescription) {
      this.meta.updateTag({ property: 'og:description', content: data.ogDescription });
    }

    if (data.ogImage) {
      this.meta.updateTag({ property: 'og:image', content: data.ogImage });
    }

    if (data.ogUrl) {
      this.meta.updateTag({ property: 'og:url', content: data.ogUrl });
    }

    // Update Twitter Card tags
    if (data.twitterTitle) {
      this.meta.updateTag({ name: 'twitter:title', content: data.twitterTitle });
    }

    if (data.twitterDescription) {
      this.meta.updateTag({ name: 'twitter:description', content: data.twitterDescription });
    }

    if (data.twitterImage) {
      this.meta.updateTag({ name: 'twitter:image', content: data.twitterImage });
    }

    // Update canonical URL
    if (data.canonical) {
      this.updateCanonicalUrl(data.canonical);
    }
  }

  private updateCanonicalUrl(url: string): void {
    let link: HTMLLinkElement | null = this.document.querySelector('link[rel="canonical"]');
    
    if (!link) {
      link = this.document.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.document.head.appendChild(link);
    }
    
    link.setAttribute('href', url);
  }

  // Método para generar datos estructurados JSON-LD
  addStructuredData(data: any): void {
    const script = this.document.createElement('script');
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.document.head.appendChild(script);
  }

  // Método para limpiar datos estructurados previos
  clearStructuredData(): void {
    const scripts = this.document.querySelectorAll('script[type="application/ld+json"]');
    scripts.forEach(script => script.remove());
  }
}
