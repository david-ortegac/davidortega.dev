import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const FUNCTION_NAME = process.env.AWS_LAMBDA_FUNCTION_NAME || 'davidortega-tutorials-service';
const REGION = process.env.AWS_REGION || process.env.AWS_DEFAULT_REGION || 'us-east-1';
const ZIP_PATH = path.resolve('dist/lambda.zip');

console.log(`\n🚀 [AWS Deploy] Iniciando despliegue de: ${FUNCTION_NAME} (${REGION})`);

// 1. Verificar si hay credenciales configuradas
try {
  const identity = execSync('aws sts get-caller-identity', { stdio: 'pipe' }).toString();
  const parsed = JSON.parse(identity);
  console.log(`🔑 Autenticado como cuenta: ${parsed.Account} (${parsed.Arn})`);
} catch {
  console.error('\n❌ Error: No se encontraron credenciales de AWS configuradas en tu máquina.');
  console.log('👉 Configúralas ejecutando en tu terminal:');
  console.log('   aws configure\n');
  process.exit(1);
}

// 2. Compilar el proyecto con arquitectura hexagonal
console.log('\n📦 Compilando y empaquetando con Bun...');
execSync('bun run build', { stdio: 'inherit' });

if (!fs.existsSync(ZIP_PATH)) {
  console.error(`❌ Error: No se encontró el archivo ${ZIP_PATH}`);
  process.exit(1);
}

// 3. Comprobar si la función existe en AWS
let functionExists = false;
try {
  execSync(`aws lambda get-function --function-name ${FUNCTION_NAME} --region ${REGION}`, { stdio: 'pipe' });
  functionExists = true;
} catch {
  functionExists = false;
}

if (functionExists) {
  console.log(`\n🔄 Actualizando código en AWS Lambda (${FUNCTION_NAME})...`);
  execSync(
    `aws lambda update-function-code --function-name ${FUNCTION_NAME} --zip-file fileb://${ZIP_PATH} --region ${REGION}`,
    { stdio: 'inherit' }
  );
  console.log('\n✅ ¡Código actualizado exitosamente!');

  // Obtener URL de la función si existe
  try {
    const urlOutput = execSync(
      `aws lambda get-function-url-config --function-name ${FUNCTION_NAME} --region ${REGION}`,
      { stdio: 'pipe' }
    ).toString();
    const urlConfig = JSON.parse(urlOutput);
    if (urlConfig.FunctionUrl) {
      console.log(`🌐 Tu Lambda Function URL activa es: ${urlConfig.FunctionUrl}`);
    }
  } catch {
    console.log('ℹ️ Para habilitar una Function URL pública ejecuta:');
    console.log(`   aws lambda create-function-url-config --function-name ${FUNCTION_NAME} --auth-type NONE --cors '{"AllowOrigins":["*"],"AllowMethods":["GET","OPTIONS"]}' --region ${REGION}`);
  }
} else {
  console.log(`\nℹ️ La función '${FUNCTION_NAME}' aún no existe en AWS.`);
  console.log('👉 Puedes crearla desde la consola de AWS subiendo dist/lambda.zip, o crearla con el CLI:');
  console.log(`
aws lambda create-function \\
  --function-name ${FUNCTION_NAME} \\
  --runtime nodejs20.x \\
  --architectures arm64 \\
  --role arn:aws:iam::<TU_ACCOUNT_ID>:role/<TU_ROLE_NAME> \\
  --handler index.handler \\
  --zip-file fileb://${ZIP_PATH} \\
  --region ${REGION}
  `);
}
