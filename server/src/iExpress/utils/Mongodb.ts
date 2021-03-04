import { MongodbLoader } from './MongodbLoader';

export const Mongodb = async () => {
  const { log, error } = console;

  try {
    const data = await MongodbLoader();
    log('::', 'MongoLoader:', !Boolean(data));
  } catch (_error) {
    error(`⚡ [NODE]: ${_error}, ${_error.stack}`);
    throw new Error(`⚡ [NODE]: ${_error}`);
  }
};
