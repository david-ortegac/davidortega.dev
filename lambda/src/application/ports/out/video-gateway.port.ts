import { Video } from '../../../domain/models/video.model';

export interface VideoGatewayPort {
  fetchVideos(limit: number): Promise<Video[]>;
}
