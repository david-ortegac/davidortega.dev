export interface Video {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnailUrl: string;
}

export type VideoOrder = 'oldest' | 'newest';

export interface VideoQueryOptions {
  limit?: number;
  order?: VideoOrder;
}
