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

    let dataMin = params.has('data_min') ? Number.parseFloat(params.get('data_min') ?? '') : min(data);
    let dataMax = params.has('data_max') ? Number.parseFloat(params.get('data_max') ?? '') : max(data);

    let colorGradient = new ColorGradient(
      params.get('color_gradient')?.toLowerCase() === 'rnafold' ? 'RNAfold' : 'red',
      {
        reverse: params.get('color_gradient_direction')?.toLowerCase() === 'reverse',
      },
    );

    let allBases = [...this.#targetApp.drawing.bases];

    data.forEach((datum, i) => {
      let color = colorGradient.at((datum - dataMin) / (dataMax - dataMin));

      let b: Nucleobase | undefined = allBases[i];

      if (b) {
        let o = this.#targetApp.drawing.outline(b);
        o.domNode.setAttribute('fill', color);
      }
    });
  }
}
