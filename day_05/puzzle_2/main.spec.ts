import { combineFreshIngredientRanges, ingredientCountInRange } from './main';

describe(`${combineFreshIngredientRanges.name}()`, () => {
  test('provided test cases', () => {
    const testRanges: [number, number][] = [
      [3, 5],
      [10, 14],
      [16, 20],
      [12, 18],
    ];
    const combinedRanges = [
      [3, 5],
      [10, 20],
    ];

    const result = combineFreshIngredientRanges(testRanges);
    expect(result).toEqual(combinedRanges);
  });

  test('custom test case', () => {
    const testRanges: [number, number][] = [
      [40, 50],
      [100, 120],
      [110, 115],
      [45, 55],
      [120, 140],
      [142, 145],
    ];
    const combinedRanges = [
      [40, 55],
      [100, 140],
      [142, 145],
    ];
    const result = combineFreshIngredientRanges(testRanges);
    expect(result).toEqual(combinedRanges);
  });

  test("ranges aren't combined together when they happen right after another (like 40-50 and 51-54)", () => {
    const testRanges: [number, number][] = [
      [40, 50],
      [51, 54],
    ];
    const combinedRanges = [
      [40, 50],
      [51, 54],
    ];
    const result = combineFreshIngredientRanges(testRanges);
    expect(result).toEqual(combinedRanges);
  });
});

describe(`${ingredientCountInRange.name}()`, () => {
  test.each([
    [10, 20, 11],
    [10, 10, 1],
    [0, 100, 101],
  ])('range %i-%i covers %i items', (start, stop, length) => {
    expect(ingredientCountInRange([start, stop])).toBe(length);
  });
});
