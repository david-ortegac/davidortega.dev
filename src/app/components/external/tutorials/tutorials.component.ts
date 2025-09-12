import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, OnInit, signal } from '@angular/core';

import { Response } from '../../../models/Response';
import { ChannelVideo } from '../../../models/YoutubeSearchItemSnippet';
import { BackService } from '../../../services/back.service';
import { YoutubeService } from '../../../services/youtube.service';

@Component({
  selector: 'app-tutorials',
  imports: [DatePipe],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsComponent implements OnInit {
  private readonly youtubeService = inject(YoutubeService);
  private readonly backService = inject(BackService);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);
  readonly videos = signal<readonly ChannelVideo[]>([]);
  private responses: Response = { name: '', value: '' };

  ngOnInit() {
    this.initializeService().then((data) => {
      this.validateService(data.value);
    });
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
