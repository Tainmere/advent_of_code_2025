import { processRollGrid } from './main';

describe(`${processRollGrid.name}()`, () => {
  test('provided test case', () => {
    const testGrid = [
      '..@@.@@@@.',
      '@@@.@.@.@@',
      '@@@@@.@.@@',
      '@.@@@@..@.',
      '@@.@@@@.@@',
      '.@@@@@@@.@',
      '.@.@.@.@@@',
      '@.@@@.@@@@',
      '.@@@@@@@@.',
      '@.@.@@@.@.',
    ];

    expect(processRollGrid(testGrid)).toBe(43);
  });
});
