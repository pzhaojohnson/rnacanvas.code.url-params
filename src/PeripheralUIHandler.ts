import type { App } from './App';

export class PeripheralUIHandler<Schema> {
  #targetApp;

  constructor(targetApp: App<Schema>) {
    this.#targetApp = targetApp;
  }

  async handle(urlParams: URLSearchParams) {
    let peripheralUI = urlParams.get('peripheral_ui')?.toLowerCase();

    if (peripheralUI === 'none') {
      this.#targetApp.peripheralUI.hide();
    } else if (peripheralUI === 'minimal') {
      this.#targetApp.peripheralUI.showMinimal();
    }
  }
}
