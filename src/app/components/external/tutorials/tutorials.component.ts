import { ChangeDetectionStrategy, Component, OnInit, inject, signal } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { YoutubeService, ChannelVideo } from '../../../services/youtube.service';

@Component({
  selector: 'app-tutorials',
  imports: [NgIf, NgFor, DatePipe],
  templateUrl: './tutorials.component.html',
  styleUrl: './tutorials.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TutorialsComponent implements OnInit {
  private readonly youtubeService = inject(YoutubeService);
  readonly isLoading = signal<boolean>(true);
  readonly hasError = signal<boolean>(false);
  readonly videos = signal<readonly ChannelVideo[]>([]);

  ngOnInit(): void {
    this.youtubeService.fetchChannelVideosOldestFirst().subscribe({
      next: (videos) => {
        this.videos.set(videos);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      },
    });
  }
}
