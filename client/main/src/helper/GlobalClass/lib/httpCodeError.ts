interface IKey {
  [propName: number]: string;
}

export const listCode: IKey = {
  200: 'OK',
  201: 'Created',

  301: 'Moved Permanently',
  302: 'Found',
  304: 'Not Modified',

  400: 'Bad Request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not Found',
  405: 'Method Not Allowed',
  406: 'Not Acceptable',
  408: 'Request Timeout',
  409: 'Conflict',
  410: 'Gone',
  418: 'I`m a teapot',
  429: 'Too Many Requests',
  441: 'Invalid token',
  499: 'Client closed request',

  500: 'Internal Server Error',
  501: 'Not Implemented',
  502: 'Bad Gateway',
  503: 'Service Unavailable',
  504: 'Gateway Timeout',
  521: 'Web server is down',
};
