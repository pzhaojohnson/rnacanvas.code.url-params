import { ColorGradient } from './ColorGradient';

describe('`class ColorGradient`', () => {
  test('`at()`', () => {
    // no descriptor
    var colorGradient = new ColorGradient();

    // red by default
    expect(colorGradient.at(0)).toBe('rgb(255,255,255)');
    expect(colorGradient.at(0.37)).toBe('rgb(255,161,161)');
    expect(colorGradient.at(0.5)).toBe('rgb(255,128,128)');
    expect(colorGradient.at(1)).toBe('rgb(255,0,0)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('rgb(255,255,255)');

    // above one
    expect(colorGradient.at(2)).toBe('rgb(255,0,0)');

    // explicitly red
    var colorGradient = new ColorGradient('red');

    expect(colorGradient.at(0)).toBe('rgb(255,255,255)');
    expect(colorGradient.at(0.37)).toBe('rgb(255,161,161)');
    expect(colorGradient.at(1)).toBe('rgb(255,0,0)');

    // reverse red
    var colorGradient = new ColorGradient('red', { reverse: true });

    expect(colorGradient.at(0)).toBe('rgb(255,0,0)');
    expect(colorGradient.at(0.37)).toBe('rgb(255,94,94)');
    expect(colorGradient.at(1)).toBe('rgb(255,255,255)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('rgb(255,0,0)');

    // above one
    expect(colorGradient.at(2)).toBe('rgb(255,255,255)');

    // explicitly not reverse red
    var colorGradient = new ColorGradient('red', { reverse: false });

    expect(colorGradient.at(0)).toBe('rgb(255,255,255)');
    expect(colorGradient.at(0.37)).toBe('rgb(255,161,161)');
    expect(colorGradient.at(1)).toBe('rgb(255,0,0)');

    // RNAfold color gradient
    var colorGradient = new ColorGradient('RNAfold');

    expect(colorGradient.at(0)).toBe('rgb(255,0,0)');
    expect(colorGradient.at(0.37)).toBe('rgb(133,255,0)');
    expect(colorGradient.at(0.5)).toBe('rgb(0,255,0)');
    expect(colorGradient.at(1)).toBe('rgb(0,0,255)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('rgb(255,0,0)');

    // above one
    expect(colorGradient.at(2)).toBe('rgb(0,0,255)');

    // reverse RNAfold
    var colorGradient = new ColorGradient('RNAfold', { reverse: true });

    expect(colorGradient.at(0)).toBe('rgb(0,0,255)');
    expect(colorGradient.at(0.37)).toBe('rgb(0,255,133)');
    expect(colorGradient.at(0.5)).toBe('rgb(0,255,0)');
    expect(colorGradient.at(1)).toBe('rgb(255,0,0)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('rgb(0,0,255)');

    // above one
    expect(colorGradient.at(2)).toBe('rgb(255,0,0)');

    // explicitly not reverse RNAfold
    var colorGradient = new ColorGradient('RNAfold', { reverse: false });

    expect(colorGradient.at(0)).toBe('rgb(255,0,0)');
    expect(colorGradient.at(0.37)).toBe('rgb(133,255,0)');
    expect(colorGradient.at(0.5)).toBe('rgb(0,255,0)');
    expect(colorGradient.at(1)).toBe('rgb(0,0,255)');
  });
});
