import { _NODE } from '@access';

import { HandleRejectedPromise } from './utils/HandleRejectedPromise';
// import { Mongodb } from './utils/Mongodb';
import { ColoredConsole } from './utils/ColoredConsole';
import { appPoe } from '@app/index';

export const RunApp = async (app: any) => {
  try {
    const { host, port } = _NODE;

    HandleRejectedPromise();
    const server = app.listen(port, host, ColoredConsole);

    const { state } = await appPoe();
    // console.log(`[LOG] state`, `<${typeof state}>`, state);

    if (state === 200) {
      console.log('выключаюсь');
      return process.exit(0);
    }

    return console.log('OK');
  } catch (error) {
    console.error(`⚡ RunApp [NODE]: ${error}`);
    process.exit(1);
  }
};
