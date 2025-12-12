import { findFreshIngredients, importPuzzle } from './main';

describe(`${importPuzzle.name}()`, () => {
  test('correctly separates the ranges from the ingredients based on the newline', async () => {
    const testData = ['1-2', '5-8', '', '3', '33', '7'];
    const [ranges, ingredients] = await importPuzzle(testData);
    expect(ranges).toEqual([
      [1, 2],
      [5, 8],
    ]);
    expect(ingredients).toEqual([3, 7, 33]);
  });
});

describe(`${findFreshIngredients.name}()`, () => {
  test('provided test cases', () => {
    const testRanges: [number, number][] = [
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ];
    const testIngredients = [1, 5, 8, 11, 17, 32];
    const freshIngredients = [5, 11, 17];

    const result = findFreshIngredients(testRanges, testIngredients);
    expect(result).toEqual(freshIngredients);
  });
});
