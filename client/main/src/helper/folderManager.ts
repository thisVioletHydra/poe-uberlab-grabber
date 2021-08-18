import { access, mkdir, mkdtemp, rm } from 'fs/promises';

import { resolve } from 'path';

export const mkDir = async (throwUrl: string = 'stash') => {
  const url = resolve(process.cwd(), 'main/src', throwUrl);

  try {
    await access(url);
    return url;
  } catch (error) {
    await mkdir(url, { recursive: true });
    return url;
  }
};

export const mkDirTmp = async (throwUrl: string = 'stash'): Promise<string> => {
  const url = resolve(process.cwd(), 'main/src', throwUrl, 'temp-');

  try {
    const tempFolder = await mkdtemp(url);
    return tempFolder;
  } catch (error) {
    console.log(`[LOG] error`, `<${typeof error}>`, error);
    return error;
  }
};

export const killDir = async (throwUrl: string = 'stash') => {
  const url = resolve(process.cwd(), 'main/src', throwUrl);

  try {
    await rm(url, { force: true, recursive: true });
  } catch (error) {
    console.log(`[LOG] error`, `<${typeof error}>`, error);
  }
};
