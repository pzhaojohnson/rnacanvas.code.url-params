/**
 * Parses the data URL parameter, which is a comma-separated list of numbers.
 */
export function parseData(dataURLParam: string): number[] {
  let items = dataURLParam.split(',');

  return items
    .map(item => item.trim())
    .filter(item => item) // filter out empty strings
    .map(item => Number.parseFloat(item));
}
