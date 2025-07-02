import type { App } from './App';

import { CTHandler } from './CTHandler';

import { isURL } from '@rnacanvas/utilities';

import { DataHandler } from './DataHandler';

import { ThemeHandler } from './ThemeHandler';

/**
 * A URL parameters handler for a target RNAcanvas app.
 */
export class URLParamsHandler<Schema> {
  #targetApp;

  #ctHandler;

  #dataHandler;

  #themeHandler;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;

    this.#ctHandler = new CTHandler(targetApp);

    this.#dataHandler = new DataHandler(targetApp);

    this.#themeHandler = new ThemeHandler(targetApp);
  }

  async handle(urlParams: URLSearchParams) {
    this.#ctHandler.handle(urlParams);

    let sequence = urlParams.get('sequence');
    let dotBracket = urlParams.get('dot_bracket');

    if (sequence) {
      this.#targetApp.drawDotBracket(sequence, dotBracket ?? '');

      let bases = [...this.#targetApp.drawing.bases];

      bases.slice(0, bases.length - 20).forEach((b, i) => {
        let p = i + 1;
        p % 20 == 0 ? this.#targetApp.drawing.number(b, p) : {}
      });

      if (bases.length > 0) {
        this.#targetApp.drawing.number(bases[0], 1);
      }

      if (bases.length >= 4) {
        this.#targetApp.drawing.number(bases[bases.length - 1], bases.length);
      };

      // color according to data after drawing the structure
      this.#dataHandler.handle(urlParams);

      this.#themeHandler.handle(urlParams);

      this.#targetApp.drawing.setPadding(1000);
      this.#targetApp.drawingView.fitToContent();
    }

    let schema = urlParams.get('schema');

    if (schema) {
      if (!isURL(schema)) {
        console.warn('Schema URL parameter must be a valid URL.');
      } else {
        try {
          let response = await fetch(schema);
          let text = await response.text();
          this.#targetApp.drawSchema(JSON.parse(text) as any);
          this.#targetApp.drawing.setPadding(1000);
          this.#targetApp.drawingView.fitToContent();
        } catch (error) {
          console.warn(error);
          console.warn('Unable to draw schema.');
        }
      }
    }
  }
}
