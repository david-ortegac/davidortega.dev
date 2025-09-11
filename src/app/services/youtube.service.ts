import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';

export interface YoutubeSearchItemSnippet {
  publishedAt: string;
  title: string;
  description: string;
  thumbnails: {
    default?: { url: string; width?: number; height?: number };
    medium?: { url: string; width?: number; height?: number };
    high?: { url: string; width?: number; height?: number };
    standard?: { url: string; width?: number; height?: number };
    maxres?: { url: string; width?: number; height?: number };
  };
  channelTitle: string;
}

export interface YoutubeSearchItemId {
  videoId?: string;
}

export interface YoutubeSearchItem {
  id: YoutubeSearchItemId;
  snippet: YoutubeSearchItemSnippet;
}

export interface YoutubeSearchResponse {
  items: YoutubeSearchItem[];
  nextPageToken?: string;
}

export interface YoutubeVideoSnippet extends YoutubeSearchItemSnippet {}

export interface YoutubeVideoItem {
  id: string;
  snippet: YoutubeVideoSnippet;
}

export interface YoutubeVideosResponse {
  items: YoutubeVideoItem[];
}

export interface ChannelVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

@Injectable({ providedIn: 'root' })
export class YoutubeService {
  private readonly http: HttpClient = inject(HttpClient);
  private readonly apiKey: string = environment.youtube.apiKey;
  private readonly channelId: string = environment.youtube.channelId;
  private readonly maxResults: number = environment.youtube.maxResults ?? 12;

  fetchChannelVideosOldestFirst(): Observable<readonly ChannelVideo[]> {
    const searchParams: HttpParams = new HttpParams()
      .set('key', this.apiKey)
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
            .set('key', this.apiKey)
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


