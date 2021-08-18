import * as I from '../Types.d';

import { $$isEmpty, $$isObject } from './IS';
import { $$throwError, $$throwType } from './Throw';
import { $$localTime } from './Time';

const $$sendCatch = ({ error, method }: I.SendCatch) => {
  if ($$isEmpty(error)) $$throwError(404, '$$sendCatch is empty');
  const extra = error?.extra || [];

  const obj = {
    action: { timestamp: $$localTime(), method },
    statusCode: Number(error.statusCode) ?? 500,
    statusMessage: `⚡ [NODE] ${error.statusMessage ?? 'unknown error'}`,
    serverAnswer: error.serverAnswer ?? 'Oops, Server cannot send response',
  };

  const objExtra = {
    ...obj,
    serverExtra: extra,
  };

  return !$$isEmpty(extra) ? objExtra : obj;
};

export const $$sendSuccess = (obj: I.ServerCode, method: string) => {
  if (!$$isObject(obj)) $$throwError(400, $$throwType(obj, 'object'));

  return {
    action: { timestamp: $$localTime(), method },
    statusCode: Number(obj?.statusCode) || 'unknown',
    statusMessage: `⚡ [NODE] ${obj.statusMessage || 'unknown error'}`,
    serverAnswer: { ...obj.serverAnswer } || 'Oops, Server cannot send response',
  };
};

export const $$nodeSuccess: I.INodeError = (obj, init) => {
  const { req, res } = init;
  const { method } = req;

  return res.status(obj.statusCode).send($$sendSuccess(obj, method));
};

export const $$nodeError: I.INodeError = (error, init) => {
  const { req, res } = init;
  const { method } = req;
  const message = 'nodeError: Server cached a critical error, need to fix!';

  if (!error.statusCode) res.status(403).end(message);

  return res.status(error.statusCode).send($$sendCatch({ error, method }));
};
