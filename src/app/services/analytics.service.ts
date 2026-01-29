import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ANALYTICS_CONFIG } from '../config/analytics.config';

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeGoogleAnalytics();
    }
  }

  private initializeGoogleAnalytics(): void {
    // Inicializar dataLayer si no existe
    if (!window.dataLayer) {
      window.dataLayer = [];
    }

    // Función gtag
    window.gtag = function() {
      window.dataLayer.push(arguments);
    };

    // Configuración inicial
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
      page_title: document.title,
      page_location: window.location.href
    });
  }

  // Rastrear eventos personalizados
  trackEvent(action: string, category: string, label?: string, value?: number): void {
    if (isPlatformBrowser(this.platformId) && window.gtag) {
      window.gtag('event', action, {
        event_category: category,
        event_label: label,
        value: value
      });
    }
  }

  // Rastrear páginas vistas
  trackPageView(url: string, title?: string): void {
    if (isPlatformBrowser(this.platformId) && window.gtag) {
      window.gtag('config', ANALYTICS_CONFIG.googleAnalyticsId, {
        page_path: url,
        page_title: title
      });
    }
  }

  // Rastrear conversiones
  trackConversion(conversionId: string, value?: number, currency: string = 'USD'): void {
    if (isPlatformBrowser(this.platformId) && window.gtag) {
      window.gtag('event', 'conversion', {
        send_to: conversionId,
        value: value,
        currency: currency
      });
    }
  }

  // Rastrear clics en anuncios (para AdSense)
  trackAdClick(adSlot: string, adFormat: string): void {
    this.trackEvent('ad_click', 'adsense', `${adSlot}_${adFormat}`);
  }

  // Rastrear formularios de contacto
  trackContactForm(method: string): void {
    this.trackEvent('contact', 'form_submission', method);
  }

  // Rastrear descargas
  trackDownload(fileName: string): void {
    this.trackEvent('download', 'file', fileName);
  }

  // Rastrear clics externos
  trackExternalLink(url: string): void {
    this.trackEvent('click', 'external_link', url);
  }

  // Rastrear tiempo en página (útil para AdSense)
  trackTimeOnPage(seconds: number): void {
    if (seconds > 30) { // Solo rastrear si el usuario estuvo más de 30 segundos
      this.trackEvent('engagement', 'time_on_page', 'over_30_seconds', seconds);
    }
  }

  // Rastrear scroll profundo (importante para AdSense)
  trackScrollDepth(percentage: number): void {
    if (percentage >= 75) {
      this.trackEvent('engagement', 'scroll_depth', '75_percent');
    } else if (percentage >= 50) {
      this.trackEvent('engagement', 'scroll_depth', '50_percent');
    } else if (percentage >= 25) {
      this.trackEvent('engagement', 'scroll_depth', '25_percent');
    }
  }
}
