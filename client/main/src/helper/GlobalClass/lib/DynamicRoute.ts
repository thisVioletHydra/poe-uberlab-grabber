import * as I from '../Types.d';

import { $$lowerCase } from './StrReplace';
import { $$isEmpty, $$isObject } from './IS';
import { $$throwError, $$throwType } from './Throw';

const _default = (_init: any): I.StatusCode => {
  return {
    statusCode: _init?.res.statusCode,
    statusMessage: _init?.res.statusMessage ?? 'OK',
    serverAnswer: { Health: _init.ctorName },
  };
};

interface IRunCallback {
  (_init: any, callback: string, switcher: string): Promise<I.StatusCode>;
}

const getRoute = (_route: string): string => {
  if ($$isEmpty(_route)) $$throwError(404, '|_route|');

  const lower = $$lowerCase(_route);
  console.log(`[LOG] lower`, `<${typeof lower}>`, lower);

  const [first] = String(lower).split('?');
  const str = first.split('/').pop();
  if ($$isEmpty(str)) $$throwError(404, '|getRoute first.split is empty|');

  const _case = String(str).replace(/-([a-z])/g, f => f[1].toLocaleUpperCase());

  return `${_case[0].toLocaleUpperCase()}${_case.substring(1)}`;
};

const _runCallback: IRunCallback = async (_init, callback, switcher) => {
  if (String(switcher) === '_default') return _default(_init);
  if (!$$isObject(_init)) $$throwType(_init, 'object');

  // eslint-disable-next-line no-return-await
  return await _init?.[callback](_init);
};

export const $$dynamicRoute: I.DynamicRoute = async _init => {
  const _route = _init.route;
  const switcher = _route === '/' ? '_default' : _route;
  const callback = getRoute(switcher);

  const result = await _runCallback(_init, callback, switcher);
  return result;
};
