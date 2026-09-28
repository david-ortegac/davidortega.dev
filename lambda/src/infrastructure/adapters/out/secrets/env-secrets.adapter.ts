import { SecretsRepositoryPort } from '../../../../application/ports/out/secrets-repository.port';

export class EnvSecretsAdapter implements SecretsRepositoryPort {
  private readonly expectedAuthToken: string;

  constructor() {
    this.expectedAuthToken = process.env.AUTH_TOKEN || 's3cure_cpanel_consumer_token';
  }

  async getSecret(name: string): Promise<string | null> {
    const normalizedName = name.toLowerCase().trim();

    if (normalizedName === 'api_key') {
      return process.env.YOUTUBE_API_KEY || process.env.API_KEY || null;
    }

    if (normalizedName === 'channel_id') {
      return (
        process.env.YOUTUBE_CHANNEL_ID ||
        process.env.CHANNEL_ID ||
        'UClQ8npg3voyOWGWEO543GqA'
      );
    }

    // Soporte para cualquier otra variable de entorno
    return process.env[name.toUpperCase()] || null;
  }

  validateAuthToken(token?: string): boolean {
    if (!this.expectedAuthToken) return true;
    if (!token) return false;

    const cleanedToken = token.replace(/^Bearer\s+/i, '').trim();
    return cleanedToken === this.expectedAuthToken;
  }
}
