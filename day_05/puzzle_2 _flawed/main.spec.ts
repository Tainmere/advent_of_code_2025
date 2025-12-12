import { findAllFreshIngredients } from './main';

describe(`${findAllFreshIngredients.name}()`, () => {
  test('provided test cases', () => {
    const testRanges: [number, number][] = [
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ];
    const freshIngredients = [3, 4, 5, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];

    const result = findAllFreshIngredients(testRanges);
    expect(result).toEqual(freshIngredients);
  });
});
