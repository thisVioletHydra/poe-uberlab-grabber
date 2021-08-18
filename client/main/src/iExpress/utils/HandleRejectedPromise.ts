import { _CONSOLE } from '@access';

export const HandleRejectedPromise = () => {
  const { log } = console;
  /**
   * A listener that stops code execution because of an unexpected error!
   */
  const handleException = (ex: Error) => {
    const obj = { Exception: ex.message, ex };
    log(_CONSOLE.reject(), '\n', obj);

    process.exit(1);
  };

  const handleRejectedPromise = (reason: { message: string }, promise: Promise<any>) => {
    const obj = { RejectedPromise: reason, ex: promise };
    log(_CONSOLE.reject(), reason.message, '\n', obj);

    process.exit(1);
  };

  process.on('uncaughtException', handleException);
  process.on('unhandledRejection', handleRejectedPromise);
};
