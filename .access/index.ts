import { consoleColor } from './consoleColor';
import { global } from './global';

export const _CONSOLE = consoleColor;

export const _NODE = {
  secret: process.env.SECRET,
  superkey: process.env.SUPER_KEY,
  env: process.env.NODE_ENV || 'development',
  host: process.env.NODE_HOST || '127.0.0.1',
  port: Number(process.env.NODE_PORT) || 8080,
  api: process.env.NODE_API || 8081,
  url: {
    self: `http://${process.env.NODE_HOST}:${process.env.NODE_PORT}` || undefined,
    api: `http://${process.env.NODE_HOST}:${process.env.NODE_API}` || undefined,
  },
};

export const _MONGODB = {
  connect: '@cluster0-test-db-l0071.mongodb.net',
  dbname: 'owaspDB',
  collection: 'OwaspSites',
  login: 'dummyUser',
  pass: String(process.env.MONGO_PASS) || '',
};

export default { ...global };
