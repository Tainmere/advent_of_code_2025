import { findAccessibleRollCount } from './main';

describe('', () => {
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

    expect(findAccessibleRollCount(testGrid)).toBe(13);
  });
});
