import { _NODE, _CONSOLE, _MONGODB } from '@access';

export const ColoredConsole = () => {
  const { host, port, api, env } = _NODE;
  const { log } = console;
  const _name = process.env.npm_package_name;
  // console.log(`[LOG] process.env`, `<${typeof process.env}>`, process.env);
  // console.log(`[LOG] _name`, `<${typeof _name}>`, _name);

  _CONSOLE.express('SERVER IS READY!');
  _CONSOLE.ok('─────────────────────────────────────');
  log('::', 'Project:', _name || 'name');
  log('::', 'Date:', new Date().toLocaleString());
  log('::', 'URL:', `${host}:${port}`);
  log('::', 'ENV:', `${env}`);
  log('::', 'NODE_PORT:', `${port}`);
  log('::', 'NODE_API:', `${api}`);
  _CONSOLE.ok('─────────────────────────────────────');
};
