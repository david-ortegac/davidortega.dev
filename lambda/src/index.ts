import {
  LambdaAdapter,
  LambdaHttpEvent,
  LambdaHttpResponse,
} from './infrastructure/adapters/in/lambda/lambda.adapter';
import { buildDependencies } from './infrastructure/config/dependencies';

// Inyección de dependencias (Composition Root)
const dependencies = buildDependencies();
const lambdaAdapter = new LambdaAdapter(dependencies);

/**
 * Handler principal para AWS Lambda (Hexagonal Architecture)
 */
export const handler = async (event: LambdaHttpEvent): Promise<LambdaHttpResponse> => {
  return lambdaAdapter.handle(event);
};
