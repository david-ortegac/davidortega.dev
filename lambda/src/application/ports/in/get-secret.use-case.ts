import { Secret } from '../../../domain/models/secret.model';

export interface GetSecretUseCase {
  execute(secretName: string, authToken?: string): Promise<Secret>;
}
