import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { ANALYTICS_CONFIG } from '../config/analytics.config';

declare global {
  interface Window {
    adsbygoogle: any[];
  }
}

@Injectable({
  providedIn: 'root'
})
export class AdsenseService {
  private isScriptLoaded = false;
  private scriptLoadPromise: Promise<boolean> | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.initializeAdSense();
    }
  }

  private initializeAdSense(): void {
    // Inicializar el array de AdSense si no existe
    if (!window.adsbygoogle) {
      window.adsbygoogle = [];
    }

    // Verificar si el script ya está cargado
    this.checkScriptLoaded();
  }

  private checkScriptLoaded(): void {
    const scripts = document.querySelectorAll('script[src*="adsbygoogle.js"]');
    this.isScriptLoaded = scripts.length > 0;
  }

  // Cargar el script de AdSense dinámicamente si no está presente
  loadAdSenseScript(): Promise<boolean> {
    if (this.scriptLoadPromise) {
      return this.scriptLoadPromise;
    }

    if (!isPlatformBrowser(this.platformId)) {
      return Promise.resolve(false);
    }

    if (this.isScriptLoaded) {
      return Promise.resolve(true);
    }

    this.scriptLoadPromise = new Promise((resolve, reject) => {
      const script = document.createElement('script');
      script.async = true;
      script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ANALYTICS_CONFIG.adsenseClientId}`;
      script.crossOrigin = 'anonymous';
      
      script.onload = () => {
        this.isScriptLoaded = true;
        resolve(true);
      };
      
      script.onerror = () => {
        console.error('Failed to load AdSense script');
        reject(false);
      };
      
      document.head.appendChild(script);
    });

    return this.scriptLoadPromise;
  }

  // Empujar un nuevo anuncio al array de AdSense
  pushAd(adConfig?: any): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    try {
      (window.adsbygoogle = window.adsbygoogle || []).push(adConfig || {});
    } catch (error) {
      console.error('Error pushing AdSense ad:', error);
    }
  }

  // Verificar si AdSense está disponible
  isAdSenseAvailable(): boolean {
    return isPlatformBrowser(this.platformId) && 
           typeof window.adsbygoogle !== 'undefined' && 
           this.isScriptLoaded;
  }

  // Obtener configuración de anuncio por tipo
  getAdConfig(type: 'header' | 'sidebar' | 'footer' | 'inContent' | 'mobile') {
    const configs = {
      header: {
        slot: ANALYTICS_CONFIG.adsenseSlots.header,
        format: 'horizontal',
        style: { display: 'block', width: '728px', height: '90px' }
      },
      sidebar: {
        slot: ANALYTICS_CONFIG.adsenseSlots.sidebar,
        format: 'rectangle',
        style: { display: 'block', width: '300px', height: '250px' }
      },
      footer: {
        slot: ANALYTICS_CONFIG.adsenseSlots.footer,
        format: 'horizontal',
        style: { display: 'block', width: '728px', height: '90px' }
      },
      inContent: {
        slot: ANALYTICS_CONFIG.adsenseSlots.inContent,
        format: 'auto',
        style: { display: 'block' }
      },
      mobile: {
        slot: ANALYTICS_CONFIG.adsenseSlots.mobile,
        format: 'horizontal',
        style: { display: 'block', width: '320px', height: '50px' }
      }
    };

    return configs[type];
  }

  // Recargar todos los anuncios en la página
  refreshAds(): void {
    if (!this.isAdSenseAvailable()) {
      return;
    }

    // Buscar todos los elementos de anuncios y recargarlos
    const adElements = document.querySelectorAll('.adsbygoogle');
    adElements.forEach((element) => {
      // Limpiar el elemento
      element.innerHTML = '';
      // Empujar nuevamente al array
      this.pushAd();
    });
  }

  // Obtener estadísticas básicas de anuncios (para desarrollo)
  getAdStats() {
    const adElements = document.querySelectorAll('.adsbygoogle');
    return {
      totalAds: adElements.length,
      loadedAds: Array.from(adElements).filter(el => el.innerHTML.trim() !== '').length,
      isScriptLoaded: this.isScriptLoaded,
      isAvailable: this.isAdSenseAvailable()
    };
  }
}
