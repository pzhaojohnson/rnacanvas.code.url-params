/**
 * @jest-environment jsdom
 */

import { URLParamsHandlers } from './URLParamsHandler';

describe('`class URLParamsHandler`', () => {
  test('`async handle()`', async () => {
    let targetApp = new AppMock();
    let urlParamsHandler = new URLParamsHandlers(targetApp);

    // no URL parameters
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app')).searchParams);
    expect(targetApp.drawDotBracket).not.toHaveBeenCalled();

    // only a sequence is provided
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app?sequence=AUCUUGACUGAUCGUAGGGCUAGC')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(1);
    expect(targetApp.drawDotBracket.mock.calls[0][0]).toBe('AUCUUGACUGAUCGUAGGGCUAGC');
    expect(targetApp.drawDotBracket.mock.calls[0][1]).toBe('');

    // both a sequence and dot-bracket notation are provided
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app?sequence=GCGCAAAAGCGC&dot_bracket=((((....))))')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(2);
    expect(targetApp.drawDotBracket.mock.calls[1][0]).toBe('GCGCAAAAGCGC');
    expect(targetApp.drawDotBracket.mock.calls[1][1]).toBe('((((....))))');

    // only dot-bracket notation is provided
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app?dot_bracket=((((....))))')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(2);

    // schema URL parameter is not a valid URL
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app?schema=asdf')).searchParams);
    expect(targetApp.drawSchema).not.toHaveBeenCalled();

    // schema URL parameter is a valid URL
    globalThis.fetch = jest.fn(async () => ({ text: async () => '{ "id": "27648728417" }' }))
    await urlParamsHandler.handle((new URL('https://code.rnacanvas.app?schema=https://rnacentral.org/r2dt?jobid=r2dt-R20241101-083237-0187-6141275-p1m')).searchParams);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toBe('https://rnacentral.org/r2dt?jobid=r2dt-R20241101-083237-0187-6141275-p1m');
    expect(targetApp.drawSchema).toHaveBeenCalledTimes(1);
    expect(targetApp.drawSchema.mock.calls[0][0]).toStrictEqual({ id: '27648728417' });
  });
});

class AppMock {
  drawDotBracket = jest.fn();

  drawSchema = jest.fn();
}
