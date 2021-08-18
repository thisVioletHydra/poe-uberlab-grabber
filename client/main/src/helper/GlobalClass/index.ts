import { _CONSOLE } from '@access';
import * as I from './Types.d';

import * as Throw from './lib/Throw';
import * as IS from './lib/IS';
import * as NodeAnswer from './lib/NodeAnswer';
import * as DynamicRoute from './lib/DynamicRoute';
import * as Time from './lib/Time';
import * as StrReplace from './lib/StrReplace';
import * as Color from './lib/Color';
import * as FetchData from './lib/FetchData';

class Initialization {
  public init: object = {};

  private ctorName: string = this.constructor.name;

  public $$throwError: I.ThrowError = Throw.$$throwError;

  public $$throwType: I.ThrowType = Throw.$$throwType;

  public $$nodeError: I.INodeError = NodeAnswer.$$nodeError;

  public $$nodeSuccess: I.INodeError = NodeAnswer.$$nodeSuccess;

  public $$isEmpty: I.IsValidate = IS.$$isEmpty;

  public $$isObject: I.IsValidate = IS.$$isObject;

  public $$isArray: I.IsValidate = IS.$$isArray;

  public $$isFunction: I.IsValidate = IS.$$isFunction;

  public $$isBoolean: I.IsValidate = IS.$$isBoolean;

  public $$isNumber: I.IsValidate = IS.$$isNumber;

  public $$isString: I.IsValidate = IS.$$isString;

  public $$localTime: I.ILocalTime = Time.$$localTime;

  public $$setTimeout: I.TSetTimeout = Time.$$setTimeout;

  public $$trim: I.Trim = StrReplace.$$trim;

  public $$upperCase: I.UpperCase = StrReplace.$$upperCase;

  public $$disassemble: I.Disassemble = StrReplace.$$disassemble;

  public $$strToBoolean: I.StrToBoolean = StrReplace.$$strToBoolean;

  public $axios = FetchData.$axios;

  public $$dynamicRoute = DynamicRoute.$$dynamicRoute;

  public __console: I.DashConsole = (obj, str) => Color.__console(obj, str, this.ctorName);
}

export class GlobalClass extends Initialization {
  error?: string;

  // constructor() {
  //   super();
  // }

  $$goodAnswer(answer: object, code?: number, skip?: boolean) {
    try {
      if (!this.$$isObject(answer)) this.$$throwType(answer, 'object');
      const _skip = skip ?? false;

      const obj = {
        statusCode: Number(code ?? 200),
        statusMessage: 'OK',
        serverAnswer: answer ?? 'Oops!',
      };

      if (!_skip) this.__console(obj, 'success');
      return obj;
    } catch (error) {
      console.error(`❌ [ERROR] ${error}`);
      return {
        statusCode: 500,
        statusMessage: 'Internal Server Error',
        serverAnswer: String(error) ?? 'Unknown Error',
      };
    }
  }

  $$badAnswer(error: string) {
    const obj = this.$$disassemble(error);
    const { statusCode, statusMessage, serverAnswer } = obj;

    const result = {
      statusCode,
      statusMessage: statusMessage ?? 'Internal Server Error',
      serverAnswer: serverAnswer ?? 'Oops! Server catch error!',
    };
    return result;
  }

  $$lightAnswer(error: string) {
    this.error = error;
    throw this.error;
  }
}
