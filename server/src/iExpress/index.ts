/**
 * ⭐⭐⭐ SERVER CONFIG ⭐⭐⭐
 *
 * Example Node (Express + Mongoose) codebase containing real world examples
 * [https://github.com/gothinkster/node-express-realworld-example-app]
 */

/**
 * Required External Modules
 */
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

import { errorHandler } from '@middleware/middlewareError';
import { _CONSOLE } from '@access';

// import routes from '@routes';
import { RunApp } from './RunApp';

class Initialization {
  public env: string = '';
}

export class Server extends Initialization {
  constructor() {
    super();

    const { nodeEnv } = _CONSOLE;
    this.env = process.env.NODE_ENV ?? '';

    console.log(`[LOG] this.env`, `<${typeof this.env}>`, this.env);
    console.log(`[LOG] process.env`, `<${typeof process.env}>`, process.env);

    /**
     * Required config
     */
    nodeEnv(this.env);
    console.log(':: State: express loading...');

    // WARNING!!! Disable SSL Certificate
    console.log(' NODE_TLS_REJECT_UNAUTHORIZED', process.env.NODE_TLS_REJECT_UNAUTHORIZED);
    // if (_ENV !== 'production') process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

    const app = express();

    /**
     *  App Configuration
     */
    app.use(helmet());
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    // app.use(routes);
    app.use(errorHandler);

    /**
     *  Run server
     */
    process.on('exit', code => {
      console.log(`About to exit with code: ${code}`);
    });
    RunApp(app);
  }
}
