import { ColorGradient } from './ColorGradient';

describe('`class ColorGradient`', () => {
  test('`at()`', () => {
    // no descriptor
    var colorGradient = new ColorGradient();

    // red by default
    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 100%)');
    expect(colorGradient.at(0.37)).toBe('hsl(0deg 100% 81.5%)');
    expect(colorGradient.at(0.5)).toBe('hsl(0deg 100% 75%)');
    expect(colorGradient.at(1)).toBe('hsl(0deg 100% 50%)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('hsl(0deg 100% 100%)');

    // above one
    expect(colorGradient.at(2)).toBe('hsl(0deg 100% 50%)');

    // explicitly red
    var colorGradient = new ColorGradient('red');

    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 100%)');
    expect(colorGradient.at(0.37)).toBe('hsl(0deg 100% 81.5%)');
    expect(colorGradient.at(1)).toBe('hsl(0deg 100% 50%)');

    // reverse red
    var colorGradient = new ColorGradient('red', { reverse: true });

    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 50%)');
    expect(colorGradient.at(0.37)).toBe('hsl(0deg 100% 68.5%)');
    expect(colorGradient.at(1)).toBe('hsl(0deg 100% 100%)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('hsl(0deg 100% 50%)');

    // above one
    expect(colorGradient.at(2)).toBe('hsl(0deg 100% 100%)');

    // explicitly not reverse red
    var colorGradient = new ColorGradient('red', { reverse: false });

    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 100%)');
    expect(colorGradient.at(0.37)).toBe('hsl(0deg 100% 81.5%)');
    expect(colorGradient.at(1)).toBe('hsl(0deg 100% 50%)');

    // RNAfold color gradient
    var colorGradient = new ColorGradient('RNAfold');

    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 40%)');
    expect(colorGradient.at(0.37)).toBe('hsl(88.8deg 100% 40%)');
    expect(colorGradient.at(0.5)).toBe('hsl(120deg 100% 40%)');
    expect(colorGradient.at(1)).toBe('hsl(240deg 100% 40%)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('hsl(0deg 100% 40%)');

    // above one
    expect(colorGradient.at(2)).toBe('hsl(240deg 100% 40%)');

    // reverse RNAfold
    var colorGradient = new ColorGradient('RNAfold', { reverse: true });

    expect(colorGradient.at(0)).toBe('hsl(240deg 100% 40%)');
    expect(colorGradient.at(0.37)).toBe('hsl(151.2deg 100% 40%)');
    expect(colorGradient.at(0.5)).toBe('hsl(120deg 100% 40%)');
    expect(colorGradient.at(1)).toBe('hsl(0deg 100% 40%)');

    // below zero
    expect(colorGradient.at(-0.1)).toBe('hsl(240deg 100% 40%)');

    // above one
    expect(colorGradient.at(2)).toBe('hsl(0deg 100% 40%)');

    // explicitly not reverse RNAfold
    var colorGradient = new ColorGradient('RNAfold', { reverse: false });

    expect(colorGradient.at(0)).toBe('hsl(0deg 100% 40%)');
    expect(colorGradient.at(0.37)).toBe('hsl(88.8deg 100% 40%)');
    expect(colorGradient.at(0.5)).toBe('hsl(120deg 100% 40%)');
    expect(colorGradient.at(1)).toBe('hsl(240deg 100% 40%)');
  });
});
