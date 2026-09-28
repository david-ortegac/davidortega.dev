import { Video, VideoOrder, VideoQueryOptions } from '../../domain/models/video.model';
import { GetTutorialsUseCase } from '../ports/in/get-tutorials.use-case';
import { CachePort } from '../ports/out/cache.port';
import { VideoGatewayPort } from '../ports/out/video-gateway.port';

export class GetTutorialsService implements GetTutorialsUseCase {
  private static readonly CACHE_KEY = 'channel_tutorials_all';
  private static readonly DEFAULT_TTL_MS = 60 * 60 * 1000; // 1 hora

  constructor(
    private readonly videoGateway: VideoGatewayPort,
    private readonly cache: CachePort<Video[]>
  ) {}

  async execute(options?: VideoQueryOptions): Promise<Video[]> {
    const limit = options?.limit ?? 12;
    const order: VideoOrder = options?.order ?? 'newest';

    // 1. Verificar si está en caché
    let videos = this.cache.get(GetTutorialsService.CACHE_KEY);

    // 2. Si no está en caché, consultar al Gateway
    if (!videos || videos.length === 0) {
      videos = await this.videoGateway.fetchVideos(50);
      this.cache.set(GetTutorialsService.CACHE_KEY, videos, GetTutorialsService.DEFAULT_TTL_MS);
    }

    // 3. Ordenar según requerimiento de negocio
    const sorted = [...videos];
    if (order === 'oldest') {
      sorted.sort((a, b) => new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime());
    } else {
      sorted.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
    }

    // 4. Limitar cantidad
    return sorted.slice(0, limit);
  }
}
