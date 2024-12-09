import { isURL } from '@rnacanvas/utilities';

/**
 * A URL parameters handler for a target RNAcanvas app.
 */
export class URLParamsHandler<B> {
  #targetApp;

  constructor(targetApp: App<B>) {
    this.#targetApp = targetApp;
  }

  async handle(urlParams: URLSearchParams) {
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

interface App<B> {
  drawDotBracket(seq: string, dotBracket: string): void;

  drawSchema<S>(schema: S): void;

  drawing: {
    /**
     * Setting the padding of a drawing
     * ensures that it is big enough to encompass a drawn structure.
     */
    setPadding(padding: number): void;

    /**
     * All bases in the drawing.
     *
     * The ordering of bases in this iterable is the ordering of bases in the drawing.
     */
    readonly bases: Iterable<B>;

    /**
     * Numbers the specified base the specified number in the drawing.
     */
    number(b: B, n: number): void;
  }

  drawingView: {
    /**
     * Centers the user's view of the drawing on the drawn structure
     * and zooms out/in enough so that the user's view of the drawing closely fits the drawn structure.
     */
    fitToContent(): void;
  }
}
