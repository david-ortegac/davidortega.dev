import { Video } from '../../domain/models/video.model';
import { GetSecretUseCase } from '../../application/ports/in/get-secret.use-case';
import { GetTutorialsUseCase } from '../../application/ports/in/get-tutorials.use-case';
import { GetSecretService } from '../../application/use-cases/get-secret.service';
import { GetTutorialsService } from '../../application/use-cases/get-tutorials.service';
import { MemoryCacheAdapter } from '../adapters/out/cache/memory-cache.adapter';
import { EnvSecretsAdapter } from '../adapters/out/secrets/env-secrets.adapter';
import { YoutubeApiAdapter } from '../adapters/out/youtube/youtube-api.adapter';

export interface AppDependencies {
  getTutorialsUseCase: GetTutorialsUseCase;
  getSecretUseCase: GetSecretUseCase;
}

let instance: AppDependencies | null = null;

export function buildDependencies(): AppDependencies {
  if (!instance) {
    const cacheAdapter = new MemoryCacheAdapter<Video[]>();
    const youtubeAdapter = new YoutubeApiAdapter();
    const secretsAdapter = new EnvSecretsAdapter();

    const getTutorialsUseCase = new GetTutorialsService(youtubeAdapter, cacheAdapter);
    const getSecretUseCase = new GetSecretService(secretsAdapter);

    instance = {
      getTutorialsUseCase,
      getSecretUseCase,
    };
  }

  return instance;
}
