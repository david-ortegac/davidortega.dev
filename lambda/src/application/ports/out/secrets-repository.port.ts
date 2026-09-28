export interface SecretsRepositoryPort {
  getSecret(name: string): Promise<string | null>;
  validateAuthToken(token?: string): boolean;
}
