import * as I from '../Types.d';

import { listCode } from './httpCodeError';
import { $$lowerCase, $$upperCase } from './StrReplace';
import { $$isNumber } from './IS';

export const $$throwError: I.ThrowError = (code, text) => {
  const codeError = { ...listCode };
  const listValue = (f => codeError[f] ?? 'Unknown status code!')(code);
  const customTextUpper = $$upperCase(text);

  if (!$$isNumber(code)) throw new Error('throwError |code| is not number type');
  throw new Error(`|| ${code < 200 ? 418 : code} • ${listValue} • ${customTextUpper}`);
};

export const $$throwType: I.ThrowType = (element, _type) => {
  const nameType = $$lowerCase(_type);
  const str = Array.isArray(element) ? String(element[0]) : String(element);
  const result = `|${str}| type [${typeof element}], need [${nameType}]`;
  return $$throwError(400, result);
};
