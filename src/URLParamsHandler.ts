import { isURL } from '@rnacanvas/utilities';

/**
 * A URL parameters handler for a target RNAcanvas app.
 */
export class URLParamsHandlers {
  #targetApp;

  constructor(targetApp: App) {
    this.#targetApp = targetApp;
  }

  async handle(urlParams: URLSearchParams) {
    let sequence = urlParams.get('sequence');
    let dotBracket = urlParams.get('dot_bracket');

    if (sequence) {
      this.#targetApp.drawDotBracket(sequence, dotBracket ?? '');
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
        } catch (error) {
          console.warn(error);
          console.warn('Unable to draw schema.');
        }
      }
    }
  }
}

interface App {
  drawDotBracket(seq: string, dotBracket: string): void;

  drawSchema<S>(schema: S): void;
}
