import { Directive, ElementRef, Input, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Directive({
  selector: '[appLazyImage]'
})
export class LazyImageDirective implements OnInit {
  @Input('appLazyImage') src!: string;
  @Input() placeholder: string = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkNhcmdhbmRvLi4uPC90ZXh0Pjwvc3ZnPg==';
  
  private observer?: IntersectionObserver;

  constructor(
    private el: ElementRef<HTMLImageElement>,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.setupLazyLoading();
    } else {
      // En el servidor, cargar la imagen directamente
      this.loadImage();
    }
  }

  private setupLazyLoading(): void {
    const img = this.el.nativeElement;
    
    // Establecer placeholder inicial
    img.src = this.placeholder;
    img.classList.add('lazy-loading');
    
    // Configurar Intersection Observer
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.loadImage();
            this.observer?.unobserve(img);
          }
        });
      },
      {
        rootMargin: '50px 0px', // Cargar 50px antes de que sea visible
        threshold: 0.01
      }
    );

    this.observer.observe(img);
  }

  private loadImage(): void {
    const img = this.el.nativeElement;
    
    // Crear nueva imagen para precargar
    const imageLoader = new Image();
    
    imageLoader.onload = () => {
      img.src = this.src;
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-loaded');
      
      // Agregar atributos SEO importantes
      if (!img.alt) {
        img.alt = this.generateAltText(this.src);
      }
      
      // Agregar loading="lazy" nativo como respaldo
      img.loading = 'lazy';
    };
    
    imageLoader.onerror = () => {
      img.classList.remove('lazy-loading');
      img.classList.add('lazy-error');
      console.error('Error loading image:', this.src);
    };
    
    imageLoader.src = this.src;
  }

  private generateAltText(src: string): string {
    // Generar alt text básico basado en el nombre del archivo
    const fileName = src.split('/').pop()?.split('.')[0] || '';
    return fileName.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  }

  ngOnDestroy(): void {
    if (this.observer) {
      this.observer.disconnect();
    }
  }
}
