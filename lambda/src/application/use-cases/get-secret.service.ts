import { NotFoundError, UnauthorizedError } from '../../domain/errors/app.errors';
import { Secret } from '../../domain/models/secret.model';
import { GetSecretUseCase } from '../ports/in/get-secret.use-case';
import { SecretsRepositoryPort } from '../ports/out/secrets-repository.port';

export class GetSecretService implements GetSecretUseCase {
  constructor(private readonly secretsRepo: SecretsRepositoryPort) {}

  async execute(secretName: string, authToken?: string): Promise<Secret> {
    // 1. Validar autorización
    if (!this.secretsRepo.validateAuthToken(authToken)) {
      throw new UnauthorizedError('Unauthorized: Token no válido o ausente');
    }

    // 2. Obtener el valor del secreto
    const value = await this.secretsRepo.getSecret(secretName);
    if (value === null || value === undefined) {
      throw new NotFoundError(`Secreto '${secretName}' no encontrado`);
    }

    return {
      name: secretName,
      value,
    };
  }
}
