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

export interface YoutubeVideoSnippet extends YoutubeSearchItemSnippet { }

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