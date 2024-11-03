import { URLParamsHandlers } from './URLParamsHandler';

describe('`class URLParamsHandler`', () => {
  test('`async handle()`', () => {
    let targetApp = new AppMock();
    let urlParamsHandler = new URLParamsHandlers(targetApp);

    // no URL parameters
    urlParamsHandler.handle((new URL('https://code.rnacanvas.app')).searchParams);
    expect(targetApp.drawDotBracket).not.toHaveBeenCalled();

    // only a sequence is provided
    urlParamsHandler.handle((new URL('https://code.rnacanvas.app?sequence=AUCUUGACUGAUCGUAGGGCUAGC')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(1);
    expect(targetApp.drawDotBracket.mock.calls[0][0]).toBe('AUCUUGACUGAUCGUAGGGCUAGC');
    expect(targetApp.drawDotBracket.mock.calls[0][1]).toBe('');

    // both a sequence and dot-bracket notation are provided
    urlParamsHandler.handle((new URL('https://code.rnacanvas.app?sequence=GCGCAAAAGCGC&dot_bracket=((((....))))')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(2);
    expect(targetApp.drawDotBracket.mock.calls[1][0]).toBe('GCGCAAAAGCGC');
    expect(targetApp.drawDotBracket.mock.calls[1][1]).toBe('((((....))))');

    // only dot-bracket notation is provided
    urlParamsHandler.handle((new URL('https://code.rnacanvas.app?dot_bracket=((((....))))')).searchParams);
    expect(targetApp.drawDotBracket).toHaveBeenCalledTimes(2);
  });
});

class AppMock {
  drawDotBracket = jest.fn();
}
