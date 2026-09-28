import { ConfigurationError } from '../../../../domain/errors/app.errors';
import { Video } from '../../../../domain/models/video.model';
import { VideoGatewayPort } from '../../../../application/ports/out/video-gateway.port';

interface YoutubePlaylistItem {
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
    resourceId?: {
      videoId?: string;
    };
  };
}

interface YoutubePlaylistResponse {
  items?: YoutubePlaylistItem[];
}

interface YoutubeSearchItem {
  id: { videoId?: string };
  snippet: {
    publishedAt: string;
    title: string;
    description: string;
    thumbnails: {
      default?: { url: string };
      medium?: { url: string };
      high?: { url: string };
    };
  };
}

interface YoutubeSearchResponse {
  items?: YoutubeSearchItem[];
}

export class YoutubeApiAdapter implements VideoGatewayPort {
  private readonly apiKey: string;
  private readonly channelId: string;

  constructor(apiKey?: string, channelId?: string) {
    this.apiKey = apiKey || process.env.YOUTUBE_API_KEY || process.env.API_KEY || '';
    this.channelId =
      channelId ||
      process.env.YOUTUBE_CHANNEL_ID ||
      process.env.CHANNEL_ID ||
      'UClQ8npg3voyOWGWEO543GqA';
  }

  async fetchVideos(limit = 12): Promise<Video[]> {
    if (!this.apiKey) {
      throw new ConfigurationError('YOUTUBE_API_KEY no está configurada.');
    }

    try {
      // Estrategia 1: Playlist de Uploads (Ahorra 100x cuota de YouTube Data API)
      return await this.fetchFromUploadsPlaylist(limit);
    } catch (err) {
      console.warn('[YoutubeApiAdapter] Fallo con Uploads playlist, recurriendo a search.list:', err);
      // Estrategia 2: Fallback con search.list
      return await this.fetchFromSearch(limit);
    }
  }

  private async fetchFromUploadsPlaylist(limit: number): Promise<Video[]> {
    const uploadsPlaylistId = this.channelId.startsWith('UC')
      ? 'UU' + this.channelId.substring(2)
      : this.channelId;

    const url = new URL('https://www.googleapis.com/youtube/v3/playlistItems');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('playlistId', uploadsPlaylistId);
    url.searchParams.set('maxResults', String(Math.min(limit, 50)));
    url.searchParams.set('key', this.apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube API PlaylistItems error (${res.status}): ${errText}`);
    }

    const data = (await res.json()) as YoutubePlaylistResponse;
    if (!data.items) return [];

    return data.items
      .filter((item) => !!item.snippet.resourceId?.videoId && item.snippet.title !== 'Private video')
      .map((item) => ({
        id: item.snippet.resourceId!.videoId!,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          '',
      }));
  }

  private async fetchFromSearch(limit: number): Promise<Video[]> {
    const url = new URL('https://www.googleapis.com/youtube/v3/search');
    url.searchParams.set('part', 'snippet');
    url.searchParams.set('channelId', this.channelId);
    url.searchParams.set('type', 'video');
    url.searchParams.set('order', 'date');
    url.searchParams.set('maxResults', String(Math.min(limit, 50)));
    url.searchParams.set('key', this.apiKey);

    const res = await fetch(url.toString());
    if (!res.ok) {
      const errText = await res.text();
      throw new Error(`YouTube API Search error (${res.status}): ${errText}`);
    }

    const data = (await res.json()) as YoutubeSearchResponse;
    if (!data.items) return [];

    return data.items
      .filter((item) => !!item.id.videoId)
      .map((item) => ({
        id: item.id.videoId!,
        title: item.snippet.title,
        description: item.snippet.description,
        publishedAt: item.snippet.publishedAt,
        thumbnailUrl:
          item.snippet.thumbnails.high?.url ||
          item.snippet.thumbnails.medium?.url ||
          item.snippet.thumbnails.default?.url ||
          '',
      }));
  }
}
