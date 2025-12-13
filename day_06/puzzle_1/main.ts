import { parse } from 'path';
import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_06/puzzle_input.txt';

export const solvePuzzle = async () => {
  let [numbers, operations] = await importPuzzle();

  const result = reduceNumberRowsByOperation(numbers, operations);

  writeSolution('day_06/solution_1.txt', `The grand total is '${result.reduce(sum)}'`);
};

const sum = (a: number, b: number) => a + b;
const mult = (a: number, b: number) => a * b;

export const importPuzzle = async (testData?: string[]) => {
  const data: string[] = testData ? testData : await readMultilinePuzzleInput(puzzlePath);

  let numbers: number[][] = data
    .slice(0, -1)
    .map((line) => processInputLine(line).map((number) => parseInt(number)));
  const operations = processInputLine(data.at(-1) as unknown as string);

  return [pivotNumbersGrid(numbers), operations] as [number[][], string[]];
};

export const processInputLine = (line: string) =>
  line.split(' ').filter((element) => element != '');

export const pivotNumbersGrid = (grid: number[][]) => {
  const columnCount = grid.length;
  const rowCount = grid[0].length;
  const result: number[][] = new Array(rowCount).fill(0).map((_) => []);

  for (let column = 0; column < columnCount; column++) {
    for (let row = 0; row < rowCount; row++) {
      result[row][column] = grid[column][row];
    }
  }

  return result;
};

export const reduceNumberRowsByOperation = (grid: number[][], operations: string[]) =>
  operations.map((operation, row) => {
    const reduceFunc = operation === '*' ? mult : sum;

    // @ts-ignore
    return grid[row].reduce<number>(reduceFunc);
  });
