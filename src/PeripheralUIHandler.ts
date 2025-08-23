import type { App } from './App';

export class PeripheralUIHandler<Schema> {
  #targetApp;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;
  }

  async handle(urlParams: URLSearchParams) {
    if (urlParams.get('peripheral_ui')?.toLowerCase() === 'none') {
      this.#targetApp.peripheralUI.hide();
    }
  }
}
