import {
  importPuzzle,
  pivotNumbersGrid,
  processInputLine,
  reduceNumberRowsByOperation,
} from './main';

describe(`${processInputLine.name}()`, () => {
  test('parses integer string', () => {
    expect(processInputLine('123 328  51 64 ')).toEqual(['123', '328', '51', '64']);
  });
  test('parses operation string', () => {
    expect(processInputLine('*   +   *   +  ')).toEqual(['*', '+', '*', '+']);
  });
});

describe(`${importPuzzle.name}()`, () => {
  describe('parses both the integer and operation strings', () => {
    const testInput = ['123 328  51 64 ', '45 64  387 23 ', '6 98  215 314', '*   +   *   +  '];

    test('parsing integer strings and pivots the grid', async () => {
      const [numbers, _] = await importPuzzle(testInput);
      expect(numbers[0]).toEqual([123, 45, 6]);
      expect(numbers[1]).toEqual([328, 64, 98]);
      expect(numbers[2]).toEqual([51, 387, 215]);
      expect(numbers[3]).toEqual([64, 23, 314]);
    });

    test('parses operation strings', async () => {
      const [_, operations] = await importPuzzle(testInput);
      expect(operations).toEqual(['*', '+', '*', '+']);
    });
  });
});

describe(`${reduceNumberRowsByOperation.name}()`, () => {
  test('provided test case', () => {
    const grid = [
      [123, 45, 6],
      [328, 64, 98],
      [51, 387, 215],
      [64, 23, 314],
    ];
    const operations = ['*', '+', '*', '+'];
    const expectedResult = [33210, 490, 4243455, 401];

    expect(reduceNumberRowsByOperation(grid, operations)).toEqual(expectedResult);
  });
});

describe(`${pivotNumbersGrid.name}()`, () => {
  test('the length of the returned array is the length of the first nested array in the input', () => {
    const input = [[1, 2, 3, 4]];
    expect(pivotNumbersGrid(input).length).toBe(4);

    const input2 = [
      [1, 2, 3, 4],
      [1, 2],
    ];
    expect(pivotNumbersGrid(input2).length).toBe(4);
  });

  test('the length of the input array becomes the length of the nested arrays', () => {
    const input = [[1, 2, 3, 4]];
    expect(pivotNumbersGrid(input)[0].length).toBe(1);
  });

  test('the elements of the first row become the elements in the first column', () => {
    const input = [[1, 2, 3, 4]];
    const result = pivotNumbersGrid(input);

    expect(result[0][0]).toBe(1);
    expect(result[1][0]).toBe(2);
    expect(result[2][0]).toBe(3);
    expect(result[3][0]).toBe(4);
  });

  test('full pivoting case', () => {
    const input = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];
    const result = pivotNumbersGrid(input);

    expect(result[0]).toEqual([1, 5, 9]);
    expect(result[1]).toEqual([2, 6, 10]);
    expect(result[2]).toEqual([3, 7, 11]);
    expect(result[3]).toEqual([4, 8, 12]);
  });
});
