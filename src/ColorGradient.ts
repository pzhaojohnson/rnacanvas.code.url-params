import { Color } from '@svgdotjs/svg.js';

export class ColorGradient {
  #descriptor;

  #options?;

  constructor(descriptor?: 'red' | 'RNAfold', options?: Options) {
    this.#descriptor = descriptor ?? 'red';

    this.#options = { ...options };
  }

  /**
   * Calculates the color at the place along the color gradient in the range of 0.0 to 1.0
   * (with 0.0 corresponding to the beginning of the color gradient
   * and 1.0 corresponding to the end of the color gradient).
   *
   * Setting the `reverse` option to true causes 1.0 to correspond to the beginning of the color gradient,
   * and vice versa.
   *
   * Returns the calculated color as an RGB string
   * that can be directly used as an SVG attribute value.
   */
  at(place: number): string {
    if (place < 0) {
      place = 0;
    } else if (place > 1) {
      place = 1;
    }

    let degree = 0;

    if (this.#descriptor === 'RNAfold') {
      if (this.#options?.reverse) {
        degree = 240 - (240 * place);
      } else {
        degree = 240 * place;
      }
    }

    if (this.#descriptor === 'red') {
      degree = 0;
    }

    let saturation = 100;

    let luminance = 50;

    if (this.#descriptor === 'RNAfold') {
      luminance = 50;
    }

    if (this.#descriptor === 'red') {
      if (this.#options?.reverse) {
        luminance = 50 + (50 * place);
      } else {
        luminance = 100 - (50 * place);
      }
    }

    let color = new Color(degree, saturation, luminance, 'hsl');

    // don't return in HSL format (InkScape can't handle HSL colors, for instance)
    return color.toRgb();
  }
}

type Options = {
  reverse?: boolean;
};
