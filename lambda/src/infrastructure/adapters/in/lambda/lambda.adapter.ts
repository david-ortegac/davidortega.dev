import {
  ConfigurationError,
  NotFoundError,
  UnauthorizedError,
} from '../../../../domain/errors/app.errors';
import { ValidationError } from '../../../../domain/errors/validation.error';
import { AppDependencies } from '../../../config/dependencies';

export interface LambdaHttpEvent {
  httpMethod?: string; // API Gateway REST (v1)
  path?: string; // API Gateway REST (v1)
  rawPath?: string; // API Gateway HTTP (v2) y Function URLs
  resource?: string;
  pathParameters?: Record<string, string | undefined>;
  requestContext?: {
    stage?: string;
    resourcePath?: string;
    http?: {
      method?: string; // v2 y Function URLs
      path?: string;
    };
  };
  headers?: Record<string, string | undefined>;
  queryStringParameters?: Record<string, string | undefined>;
  body?: string | null;
  isBase64Encoded?: boolean;
}

export interface LambdaHttpResponse {
  statusCode: number;
  headers: Record<string, string>;
  body: string;
}

const CORS_HEADERS: Record<string, string> = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  'Access-Control-Max-Age': '86400',
};

export class LambdaAdapter {
  constructor(private readonly deps: AppDependencies) {}

  async handle(event: LambdaHttpEvent): Promise<LambdaHttpResponse> {
    const method = (
      event.httpMethod ||
      event.requestContext?.http?.method ||
      'GET'
    ).toUpperCase();

    // Manejo de preflight CORS (OPTIONS)
    if (method === 'OPTIONS') {
      return {
        statusCode: 204,
        headers: CORS_HEADERS,
        body: '',
      };
    }

    // Normalizar ruta: si API Gateway usa /{proxy+}, extraer el parámetro directamente
    let raw = '';
    if (event.pathParameters?.proxy) {
      raw = '/' + event.pathParameters.proxy.replace(/^\/+/, '');
    } else {
      raw = event.rawPath || event.path || event.requestContext?.http?.path || '/';
    }

    // Remover stage si viene en requestContext (ej: stage = 'ms_tutorials_davidortegadev')
    const stage = event.requestContext?.stage;
    if (stage && stage !== '$default' && raw.startsWith(`/${stage}`)) {
      raw = raw.slice(stage.length + 1) || '/';
    }

    // Fallback defensivo para el stage específico
    if (raw.startsWith('/ms_tutorials_davidortegadev')) {
      raw = raw.replace(/^\/ms_tutorials_davidortegadev/, '') || '/';
    }

    const cleanPath = raw.replace(/\/+$/, '') || '/';

    console.log(`[LambdaAdapter] Inbound request: ${method} ${cleanPath} (raw: ${event.rawPath || event.path})`);

    try {
      // ── GET Routes ───────────────────────────────────────────────

      if (method !== 'GET') {
        return this.formatResponse(405, { error: 'Method Not Allowed' });
      }

      // 2. Endpoint principal: Obtener tutoriales
      if (cleanPath === '/api/v1/tutorials' || cleanPath === '/tutorials' || cleanPath === '/') {
        const limit = Number(event.queryStringParameters?.limit || 12);
        const order = (event.queryStringParameters?.order as 'oldest' | 'newest') || 'newest';

        const tutorials = await this.deps.getTutorialsUseCase.execute({ limit, order });
        return this.formatResponse(200, tutorials, {
          'Cache-Control': 'public, max-age=3600, s-maxage=3600',
        });
      }

      // 3. Endpoint de secreto: api_key
      if (cleanPath === '/api/v1/secrets/api_key') {
        const token = this.extractAuthToken(event.headers);
        const secret = await this.deps.getSecretUseCase.execute('api_key', token);
        return this.formatResponse(200, secret);
      }

      // 4. Endpoint de secreto: channel_id
      if (cleanPath === '/api/v1/secrets/channel_id') {
        const token = this.extractAuthToken(event.headers);
        const secret = await this.deps.getSecretUseCase.execute('channel_id', token);
        return this.formatResponse(200, secret);
      }

      // 5. Healthcheck
      if (cleanPath === '/health') {
        return this.formatResponse(200, {
          status: 'ok',
          architecture: 'hexagonal',
          timestamp: new Date().toISOString(),
        });
      }

      return this.formatResponse(404, { error: `Not Found: ${cleanPath}` });
    } catch (error: any) {
      return this.handleError(error);
    }
  }


  private extractAuthToken(headers?: Record<string, string | undefined>): string | undefined {
    if (!headers) return undefined;
    return headers['authorization'] || headers['Authorization'] || headers['AUTHORIZATION'];
  }

  private handleError(error: any): LambdaHttpResponse {
    console.error('[LambdaAdapter] Error caught:', error);

    if (error instanceof ValidationError) {
      return this.formatResponse(422, { error: error.message });
    }

    if (error instanceof UnauthorizedError) {
      return this.formatResponse(401, { error: error.message });
    }

    if (error instanceof NotFoundError) {
      return this.formatResponse(404, { error: error.message });
    }

    if (error instanceof ConfigurationError) {
      return this.formatResponse(500, {
        error: 'Configuration Error',
        message: error.message,
      });
    }

    return this.formatResponse(500, {
      error: 'Internal Server Error',
      message: error?.message || 'Error desconocido',
    });
  }

  private formatResponse(
    statusCode: number,
    data: unknown,
    extraHeaders: Record<string, string> = {}
  ): LambdaHttpResponse {
    return {
      statusCode,
      headers: {
        ...CORS_HEADERS,
        'Content-Type': 'application/json',
        ...extraHeaders,
      },
      body: JSON.stringify(data),
    };
  }
}
