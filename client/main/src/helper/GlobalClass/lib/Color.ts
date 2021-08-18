import { _CONSOLE, _DEBUG } from '@access';
import * as I from '../Types.d';
import { $$isObject } from './IS';
import { $$localTime } from './Time';

type TErr = string | {};

interface ICtor {
  arg0: TErr;
  str?: string;
  ctorName?: string;
}

class Initialization {
  time: string = $$localTime();

  name: string | undefined = undefined;

  rule: boolean = false;

  arg0: TErr = '';

  str: string = '';
}

class $$coloredConsole extends Initialization {
  constructor({ arg0, str, ctorName }: ICtor) {
    super();

    this.arg0 = arg0;
    this.str = str ?? 'error';
    this.name = ctorName ?? '';
  }

  prefix() {
    return _CONSOLE?.[this.str]();
  }

  className() {
    return _CONSOLE.info(`${this.time} [${this.name}] ::`);
  }

  classError() {
    if (_DEBUG.log) {
      return $$isObject(this.arg0) ? this.arg0 : `\n ${this.arg0 ?? ''}`;
    }
    return String(this.arg0);
  }

  classSuccess() {
    return $$isObject(this.arg0) ? this.arg0 : `\n ${this.arg0 ?? ''}`;
  }

  run() {
    const yes = () => console.info(this.prefix(), this.className(), this.classSuccess());
    const no = () => console.error(this.prefix(), this.className(), this.classError());
    return this.str !== 'error' ? yes() : no();
  }
}

export const __console: I.DashConsole = (arg0, str, ctorName) => {
  return new $$coloredConsole({
    arg0,
    str,
    ctorName,
  }).run();
};
