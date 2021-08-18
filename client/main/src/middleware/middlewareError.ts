import { Request, Response, NextFunction } from 'express';
import { HelperNodeAnswer } from '@helper/HelperNodeAnswer';

interface IExpress {
  (error: HelperNodeAnswer, req: Request, res: Response, next: NextFunction): void;
}

export const errorHandler: IExpress = (error, req, res, next) => {
  const statusCode = error.statusCode || 500;
  const statusMessage = error.message || `❌ [SERVER]: Internal Server Error!`;
  const serverAnswer = String(error.stack);

  const send = { name: 'errorHandler', statusCode, statusMessage, serverAnswer };
  res.status(statusCode).send(send);
  return next();
};
