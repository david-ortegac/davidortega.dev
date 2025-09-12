import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable, switchMap } from 'rxjs';

import { ChannelVideo, YoutubeSearchItem, YoutubeSearchResponse, YoutubeVideosResponse } from '../models/YoutubeSearchItemSnippet';
import { BackService } from './back.service';

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly channelId: string = 'UClQ8npg3voyOWGWEO543GqA';
  private readonly maxResults: number = 12;


  fetchChannelVideosOldestFirst(apiKey: string): Observable<readonly ChannelVideo[]> {
    const searchParams: HttpParams = new HttpParams()
      .set('key', apiKey)
      .set('channelId', this.channelId)
      .set('part', 'snippet')
      .set('type', 'video')
      .set('order', 'date') // newest first
      .set('maxResults', String(this.maxResults));

    return this.http
      .get<YoutubeSearchResponse>('https://www.googleapis.com/youtube/v3/search', { params: searchParams })
      .pipe(
        map((res: YoutubeSearchResponse) => res.items.filter((i) => !!i.id.videoId)),
        map((items: YoutubeSearchItem[]) => items as YoutubeSearchItem[]),
        switchMap((items: YoutubeSearchItem[]) => {
          const videoIds: string = items.map((i) => i.id.videoId as string).join(',');
          const videosParams: HttpParams = new HttpParams()
            .set('key', apiKey)
            .set('id', videoIds)
            .set('part', 'snippet');
          return this.http.get<YoutubeVideosResponse>('https://www.googleapis.com/youtube/v3/videos', { params: videosParams });
        }),
        map((videos: YoutubeVideosResponse) =>
          videos.items
            .map((v): ChannelVideo => ({
              id: v.id,
              title: v.snippet.title,
              description: v.snippet.description,
              publishedAt: v.snippet.publishedAt,
              thumbnailUrl: v.snippet.thumbnails.medium?.url ?? v.snippet.thumbnails.high?.url ?? v.snippet.thumbnails.default?.url ?? '',
            }))
            .sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime())
        )
      );
  }
}


