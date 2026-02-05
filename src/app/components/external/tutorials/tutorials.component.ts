import { DatePipe, NgOptimizedImage } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { Response } from '../../../models/Response';
import { ChannelVideo } from '../../../models/YoutubeSearchItemSnippet';
import { BackService } from '../../../services/back.service';
import { YoutubeService } from '../../../services/youtube.service';
import { SeoService } from '../../../services/seo.service';

@Component({
  selector: 'app-tutorials',
  imports: [DatePipe, NgOptimizedImage],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsComponent implements OnInit {
  private readonly youtubeService = inject(YoutubeService);
  private readonly backService = inject(BackService);
  private readonly seoService = inject(SeoService);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);
  readonly videos = signal<readonly ChannelVideo[]>([]);
  private responses: Response = { name: '', value: '' };

  ngOnInit() {
    this.setupSEO();
    this.initializeService().then((data) => {
      this.validateService(data.value);
    });
  }

  private setupSEO(): void {
    this.seoService.updateSEO({
      title: 'Tutoriales de Programación - David Ortega | Java, Angular, Laravel',
      description: 'Aprende sobre desarrollo de software con estos tutoriales gratuitos. Java Spring Boot, Angular, Laravel y más tecnologías modernas.',
      keywords: 'tutoriales programación, java spring boot, angular, laravel, desarrollo web, david ortega',
      ogTitle: 'Tutoriales de Programación - David Ortega',
      ogDescription: 'Aprende sobre desarrollo de software con estos tutoriales gratuitos.',
      ogImage: 'https://davidortega.dev/img/og-image.jpg',
      ogUrl: 'https://davidortega.dev/tutorials',
      twitterTitle: 'Tutoriales de Programación - David Ortega',
      twitterDescription: 'Aprende sobre desarrollo de software con estos tutoriales gratuitos.',
      twitterImage: 'https://davidortega.dev/img/og-image.jpg',
      canonical: 'https://davidortega.dev/tutorials',
      robots: 'index, follow'
    });

    this.seoService.clearStructuredData();
    
    const itemListSchema = {
      "@context": "https://schema.org",
      "@type": "ItemList",
      "name": "Tutoriales de Programación",
      "description": "Lista de video tutoriales sobre desarrollo de software",
      "itemListElement": [] // Se podría poblar dinámicamente si los videos fueran estáticos
    };
    
    this.seoService.addStructuredData(itemListSchema);
  }

  /**
   * Inicializa el servicio recuperando datos y devolviendo la respuesta como un array.
   * @returns Promise<Response[]>
   */
  async initializeService(): Promise<Response> {
    return new Promise<Response>((resolve, reject) => {
      this.backService.getData().subscribe({
        next: data => {
          this.responses = data;
          resolve(this.responses);
        },
        error: (error: unknown) => {
          this.hasError.set(true);
          reject(error);
        }
      });
    });
  }

  validateService(apiKey: string): void {
    this.youtubeService.fetchChannelVideosOldestFirst(apiKey).subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}
