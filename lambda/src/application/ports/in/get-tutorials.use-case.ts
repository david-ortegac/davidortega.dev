import { Video, VideoQueryOptions } from '../../../domain/models/video.model';

export interface GetTutorialsUseCase {
  execute(options?: VideoQueryOptions): Promise<Video[]>;
}
