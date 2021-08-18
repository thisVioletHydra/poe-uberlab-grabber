import { Request, Response, NextFunction } from 'express';

/**
 * * Ответ сервера с пост кодом
 *
 * @export
 * @interface ServerCode
 */
export interface ServerCode {
  method?: string;
  action?: { timestamp: Date; method: string };
  statusCode: number;
  statusMessage?: string;
  serverAnswer?: {};
  serverExtra?: {};
}

export interface SendCatch {
  error: ServerCode & {
    extra?: [];
  };
  method: string;
}

export interface ReqValidateSubid {
  <T extends string, U>(str: T, query: { access: T; apikey: T; subid: T; addr?: T }): Promise<U>;
}

export interface StatusCode {
  statusCode: number;
  statusMessage: string;
  serverAnswer: {} | string;
}

export interface DynamicRoute {
  (_init: any & { route: string }): Promise<StatusCode>;
}

export interface StrToBoolean {
  (str: string): boolean;
}

export type TSetTimeout = <T>(ms: T) => Promise<T>;

export interface Disassemble {
  (str: string): {
    statusCode: number;
    statusMessage: string;
    serverAnswer: string | {};
  };
}

export interface DashConsole {
  (obj: {}, str?: string, ctorName?: string): void;
}

export interface ColoredConsole {
  (obj: {}, str?: string, ctorName?: string): never;
}

/**
 * * Конверт строки в Uppercase
 *
 * @export
 * @interface UpperCase
 */
export interface UpperCase {
  (str: string): string;
}

/**
 *  * очищение строки от пробелов
 *
 * @export
 * @interface Trim
 */
export interface Trim {
  (str: string): string;
}

/**
 ** Текущая локальная дата|время
 *
 * @export
 * @interface ILocalTime
 */
export interface ILocalTime {
  (date?: string): string;
}

type TReqRes = {
  req: Request;
  res: Response;
};

export type TStatusCode = {
  statusCode: number;
  statusMessage: string;
  serverAnswer: string | {};
};

/**
 ** Кастомный ответ с пробросом Express объектов
 *
 * @export
 * @interface INodeError
 */
export interface INodeError {
  <T extends TStatusCode>(error: T, init: any): void;
}

/**
 ** Все свойства объектов от Express
 *
 * @export
 * @interface IExpress
 */
export interface IExpress {
  (error: TStatusCode, request: Request, response: Response, next?: NextFunction): void;
}

type TIsValidate = string[] | number[] | Array<any> | object[] | boolean[];
/**
 * validate.js
 ** Validate.js provides a declarative way of validating javascript objects.
 * https://github.com/ansman/validate.js
 *
 * @export
 * @interface IsValidate
 */
export interface IsValidate {
  (...arg: TIsValidate): boolean;
}

export type TNodeAnswer = {
  action?: { timestamp: Date; method: string };
  statusCode: number;
  statusMessage?: string;
  serverAnswer?: {};
  serverExtra?: {};
};
/**
 ** Ответ сервера с http post code 200 | 500 и так далее...
 *
 * @export
 * @interface NodeAnswer
 */
export interface NodeAnswer {
  (result: TNodeAnswer): {};
}

/**
 ** сокращенный вброс ошибок
 *
 * @export
 * @interface ThrowError
 */
export interface ThrowError {
  (code: number, text: string): never;
}
/**
 ** проверка на тип, первая что проверяем, второе какой тип ждем
 *
 * @export
 * @interface ThrowType
 */
export interface ThrowType {
  (element: {} | string[], _type: string): never;
}
