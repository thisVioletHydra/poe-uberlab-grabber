import V from 'validate.js';
import * as I from '../Types.d';

export const $$isEmpty: I.IsValidate = (...arg) => arg.some(f => V.isEmpty(f));
export const $$isObject: I.IsValidate = (...arg) => arg.some(f => V.isObject(f));
export const $$isArray: I.IsValidate = (...arg) => arg.some(f => V.isArray(f));
export const $$isFunction: I.IsValidate = (...arg) => arg.some(f => V.isFunction(f));
export const $$isBoolean: I.IsValidate = (...arg) => arg.some(f => V.isBoolean(f));
export const $$isNumber: I.IsValidate = (...arg) => arg.some(f => V.isNumber(f));
export const $$isString: I.IsValidate = (...arg) => arg.some(f => V.isString(f));
