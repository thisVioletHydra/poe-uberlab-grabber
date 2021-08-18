import puppeteer from 'puppeteer';
import fs from 'fs';
import { resolve } from 'path';

const fsPromises = fs.promises;

const appPoe = async () => {
  try {
    type saveTo = {
      path: string;
      filename: string;
    };

    const config = {
      url: 'https://www.poelab.com/',
      target: '.su-row .su-column:first-child a',
      file: '.file a',
      diskPath: resolve(process.cwd(), 'download'),
      saveTo: ({ path, filename }: saveTo) => resolve(path, filename),
    };

    console.log('config.diskPath', config.diskPath);

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(config.url);
    console.log(`• перешел по ссылке`);

    await page.click(config.target);
    console.log(`• кликнул по кнопке`);

    await page.waitForSelector(config.file);
    console.log(`• жду страницу`);

    const getFile: string = await page.evaluate(_path => {
      const myFile: HTMLAnchorElement | null = document.querySelector(_path);
      const result = myFile?.href;
      console.log(`[LOG] result`, `<${typeof result}>`, result);
      console.log(`[LOG] myFile`, `<${typeof myFile}>`, myFile);

      if (!result) throw new Error('file is empty');
      return result;
    }, config.file);

    console.log(`• SUCCESS`);

    const openUrl = await page.goto(getFile);
    const saveToBuffer = await openUrl.buffer();

    if (!fs.existsSync(config.diskPath)) {
      console.log('создаю папку');
      fs.mkdirSync(config.diskPath);
    }
    console.log('• папка на месте, иду дальше... ');
    await fsPromises.writeFile(
      config.saveTo({
        path: config.diskPath,
        filename: 'uberLab.json',
      }),
      saveToBuffer
    );
    browser.close();
    console.log('• скачал и закрыл задачу');
    return { state: 200 };
  } catch (error) {
    console.log('error', error);
    return { state: 500 };
  }
};

export { appPoe };
