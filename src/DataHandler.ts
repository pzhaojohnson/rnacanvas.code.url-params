import type { App } from './App';

import type { Nucleobase } from './Nucleobase';

import { parseData } from './parseData';

import { ColorGradient } from './ColorGradient';

import { min, max } from '@rnacanvas/math';

export class DataHandler<Schema> {
  #targetApp;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;
  }

  handle(params: URLSearchParams) {
    let dataParam = params.get('data');

    if (!dataParam) {
      return;
    }

    let data = parseData(dataParam);

    let minDatum = min(data);
    let maxDatum = max(data);

    let colorGradient = new ColorGradient(
      params.get('color_gradient')?.toLowerCase() === 'rnafold' ? 'RNAfold' : 'red',
      {
        reverse: params.get('color_gradient_direction')?.toLowerCase() === 'reverse',
      },
    );

    let allBases = [...this.#targetApp.drawing.bases];

    data.forEach((datum, i) => {
      let color = colorGradient.at((datum - minDatum) / (maxDatum - minDatum));

      let b: Nucleobase | undefined = allBases[i];

      if (b) {
        let o = this.#targetApp.drawing.outline(b);
        o.domNode.setAttribute('fill', color);
      }
    });
  }
}
