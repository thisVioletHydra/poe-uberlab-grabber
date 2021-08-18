import axios, { AxiosResponse } from 'axios';

import { $$isArray, $$isFunction } from './IS';
import { $$throwType } from './Throw';

export interface axiosRequestError<T = string> {
  errno?: number;
  code: T;
  message?: T;
  stack: T;
}
export interface TypeAxios extends AxiosResponse, axiosRequestError {}

export const $axios = async (param: object) => {
  // eslint-disable-next-line no-return-await
  return await axios({ ...param, validateStatus: null });
};

type TAsyncReduce = (arr: never[] | undefined, callback: CallableFunction) => Promise<any[]>;

export const $$asyncReduce: TAsyncReduce = (arr = [], callback) => {
  if (!$$isArray(arr)) $$throwType(arr, 'array');
  if (!$$isFunction(callback)) $$throwType(callback, 'function');

  const next = async (acc: any, f: any) => [...(await acc), await callback(f)];
  return [...arr].reduce(next, Promise.resolve([]));
};
