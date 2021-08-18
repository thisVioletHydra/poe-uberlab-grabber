import * as I from '../Types.d';
import { $$isNumber } from './IS';
import { $$throwType } from './Throw';

export const $$localTime: I.ILocalTime = (d = Date()) => new Date(d).toLocaleString();
export const $$setTimeout: I.TSetTimeout = ms => {
  if (!$$isNumber(ms)) $$throwType(ms, 'number');
  // eslint-disable-next-line promise/avoid-new
  return new Promise(resolve => setTimeout(resolve, Number(ms)));
};
