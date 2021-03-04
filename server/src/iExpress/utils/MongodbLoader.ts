import mongoose from 'mongoose';
import { _CONSOLE, _MONGODB } from '@access';
import mongoURL from '@access/mongoSetup';

export const MongodbLoader = async () => {
  const isDev = process.env.NODE_ENV !== 'production';
  const { dark, mongodb } = _CONSOLE;
  const { log, error } = console;

  const mongoINI = {
    noDelay: true,
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  };

  try {
    const connect = await mongoose
      .connect(mongoURL, mongoINI)
      .catch((_error: Error) => log(`[mongooseError]:: ${_error}`));

    if (!!connect) mongodb('Connected!', Boolean(connect));
    else mongodb('Fails connect!', Boolean(connect));

    log('::', 'Connect:', dark(_MONGODB.connect));
    log('::', 'Url:', isDev ? dark(mongoURL) : dark('• Hidden'));
  } catch (_error) {
    error(`⚡ [Mongodb]: ${_error}`);
  }
};
