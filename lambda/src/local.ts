import { startLocalServer } from './infrastructure/adapters/in/http/local-server.adapter';

const PORT = Number(process.env.PORT || 3000);
startLocalServer(PORT);
