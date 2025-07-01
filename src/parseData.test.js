import { parseData } from './parseData';

test('`function parseData()`', () => {
  expect(parseData('')).toStrictEqual([]);

  expect(parseData(',')).toStrictEqual([]);
  expect(parseData(',,,,,')).toStrictEqual([]);

  expect(parseData('    ')).toStrictEqual([]);
  expect(parseData('  ,   ,,,   ,, ')).toStrictEqual([]);

  expect(parseData('7.29')).toStrictEqual([7.29]);
  expect(parseData('0.1,0.25,-0.554,0,0.0,5.8')).toStrictEqual([0.1, 0.25, -0.554, 0, 0, 5.8]);

  // extra whitespace around numbers
  expect(parseData(' 5 , 0.2. ,3,  -0.2,  0.8 ')).toStrictEqual([5, 0.2, 3, -0.2, 0.8]);

  // extra whitespace and empty space between commas
  expect(parseData(',5,2,, ,  5.2, 6 , 0.2 ,   , , ,,  7 ,')).toStrictEqual([5, 2, 5.2, 6, 0.2, 7]);
});
