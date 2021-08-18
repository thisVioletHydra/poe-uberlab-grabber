import chalk from 'chalk';

const { log } = console;

type TEnv = any[];
type TColor = any[];

interface INodeEnv {
  [prop: string]: (...args: TEnv) => void;
}
interface IObject {
  prefix?: string | undefined;
  color: string;
}
interface IColor {
  (obj: IObject, ...args: TColor): void;
}

const _color: IColor = (obj, ...args) => {
  const { color, prefix } = obj;
  const _if = prefix ?? '';
  return log(chalk.hex(color)(_if, ...args));
};

export const consoleColor: INodeEnv = {
  ok: (...args) => _color({ color: '#FFCC66' }, ...args),
  color: (...args) => _color({ color: '#4AA0D5' }, ...args),
  nodejs: (...args) => _color({ color: '#689F63' }, ...args),
  nodeEnv: (...args) => _color({ prefix: '\n⚡ [NODE_ENV]:', color: '#689F63' }, ...args),
  express: (...args) => _color({ prefix: '\n⚡ [EXPRESS]:', color: '#689F63' }, ...args),
  mongodb: (...args) => _color({ prefix: '\n⚡ [MONGODB]:', color: '#689F63' }, ...args),

  info: f => chalk.hex('#4AA0D5')(f),
  dark: f => chalk.hex('#6d7480')(f),

  error: () => chalk.hex('#E74C3C').inverse(`\n⚡ [ERROR]:`),
  reject: () => chalk.hex('#FCE100').inverse(`\n☢️ [PROMISE]:`),
  success: () => chalk.hex('#9ED26A').inverse(`\n⚡ [DONE]:`),
  env: () => chalk.hex('#FC5185').inverse(`\n⚡ [ENV]:`),
  path: () => chalk.hex('#DEADED').inverse(`\n⚡ [PATH]:`),
  server: () => chalk.hex('#E4F9F5').inverse(`\n⚡ [SERVER]:`),
};
