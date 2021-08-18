import * as I from '../Types.d';

export const $$trim: I.Trim = str => {
  return String(str).trim().replace(/\s\s+/g, ' ');
};

export const $$upperCase: I.UpperCase = str => {
  return String(str)
    .trim()
    .replace(/^\w/, c => c.toLocaleUpperCase());
};

export const $$lowerCase: I.UpperCase = str => {
  return String(str)
    .trim()
    .replace(/^\w/, c => c.toLocaleLowerCase());
};

export const $$disassemble: I.Disassemble = err => {
  const [code, mess, desc] = String(err).split('•');

  const trueNumber = (str: string) => {
    const num = Number(str.match(/\d+/) || 500);
    return num < 200 || num > 521 ? 500 : num;
  };

  return {
    statusCode: trueNumber(code),
    statusMessage: $$trim(mess),
    serverAnswer: $$upperCase(desc),
  };
};

export const $$strToBoolean: I.StrToBoolean = str => {
  let result = false;

  if (str === undefined) return result;
  const _str = $$lowerCase(str);

  if (_str === 'true' || _str === '1') result = true;
  if (_str === 'false' || _str === '0') result = false;
  return result;
};
