import http from 'node:http';
import { LambdaAdapter } from '../lambda/lambda.adapter';
import { buildDependencies } from '../../../config/dependencies';

export function startLocalServer(port = 3000): void {
  const deps = buildDependencies();
  const lambdaAdapter = new LambdaAdapter(deps);

  const server = http.createServer(async (req, res) => {
    const url = new URL(req.url || '/', `http://${req.headers.host || 'localhost'}`);

    const queryParams: Record<string, string> = {};
    url.searchParams.forEach((val, key) => {
      queryParams[key] = val;
    });

    const event = {
      httpMethod: req.method,
      rawPath: url.pathname,
      path: url.pathname,
      headers: req.headers as Record<string, string>,
      queryStringParameters: queryParams,
    };

    try {
      const response = await lambdaAdapter.handle(event);

      res.writeHead(response.statusCode, response.headers);
      res.end(response.body);
    } catch (err: any) {
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: err.message }));
    }
  });

  server.listen(port, () => {
    console.log(`\n🚀 [Servidor Local - Arquitectura Hexagonal] iniciado en: http://localhost:${port}`);
    console.log(`📡 Endpoints disponibles:`);
    console.log(`   - GET  http://localhost:${port}/api/v1/tutorials`);
    console.log(`   - GET  http://localhost:${port}/api/v1/secrets/api_key`);
    console.log(`   - GET  http://localhost:${port}/api/v1/secrets/channel_id`);
    console.log(`   - GET  http://localhost:${port}/health\n`);
  });
}
