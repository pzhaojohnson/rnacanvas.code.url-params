import type { App } from './App';

import { isURL } from '@rnacanvas/utilities';

import { DataHandler } from './DataHandler';

import { ThemeHandler } from './ThemeHandler';

export class CTHandler<Schema> {
  #targetApp;

  #dataHandler;

  #themeHandler;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;

    this.#dataHandler = new DataHandler(targetApp);

    this.#themeHandler = new ThemeHandler(targetApp);
  }

  async handle(urlParams: URLSearchParams) {
    let ct = urlParams.get('ct');

    if (!ct) {
      return;
    } else if (!isURL(ct)) {
      console.error('URL parameter `ct` must be the URL of a CT file.');
      return;
    }

    try {
      let response = await fetch(ct);
      let ctString = await response.text();

      this.#targetApp.drawCT(ctString);

      // color according to data after drawing the structure
      this.#dataHandler.handle(urlParams);

      // apply any themes after drawing the structure
      this.#themeHandler.handle(urlParams);

      this.#targetApp.drawing.setPadding(1000);
      this.#targetApp.drawingView.fitToContent();
    } catch (error) {
      console.error(error);
      console.error('Unable to draw CT file.');
    }
  }
}
