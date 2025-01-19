import type { App } from './App';

import { BasePair } from '@rnacanvas/draw.bases';

/**
 * Handles the `theme` URL parameter.
 */
export class ThemeHandler<Schema> {
  #targetApp;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;
  }

  /**
   * Stylizes the drawing of the target app to match any theme that is specified.
   *
   * Note that this method must be called after a structure has already been drawn,
   * since this method will synchronously stylize the drawing of the target app immediately.
   */
  handle(params: URLSearchParams): void {
    let theme = params.get('theme');

    theme = theme?.toLowerCase() ?? null;

    if (theme === 'unafold' || theme === 'mfold') {
      for (let sb of this.#targetApp.drawing.secondaryBonds) {
        let bp = new BasePair(sb.base1, sb.base2);

        if (bp.isAU() || bp.isAT()) {
          sb.setAttribute('stroke', 'blue');
        } else if (bp.isGC()) {
          sb.setAttribute('stroke', 'red');
        } else if (bp.isGU() || bp.isGT()) {
          sb.setAttribute('stroke', 'green');
        } else {
          sb.setAttribute('stroke', 'black');
        }
      }
    }
  }
}
