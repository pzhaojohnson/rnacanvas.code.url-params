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
  }
}

interface App {
  drawDotBracket(seq: string, dotBracket: string): void;
}
