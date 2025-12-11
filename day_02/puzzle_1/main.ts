import { readPuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzle_file = 'day_02/puzzle_input.txt';

export const solvePuzzle = async (testCase?: string) => {
  const input = testCase ? testCase : await readPuzzleInput(puzzle_file);
  console.time(`parsing day 2 puzzle 1`);
  const parsedInput = parsePuzzleInput(input);
  console.timeEnd(`parsing day 2 puzzle 1`);

  console.time(`solving day 2 puzzle 1 took`);
  const result = parsedInput.reduce<number>((invalidIdCount, range) => {
    return invalidIdCount + calculateInvalidIdCountInRange(range as [string, string]);
  }, 0);
  console.timeEnd(`solving day 2 puzzle 1 took`);

  return result;
};

const parsePuzzleInput = (input: string) => input.split(',').map((range) => range.split('-'));

export const calculateInvalidIdCountInRange = ([start, stop]: [string, string]) => {
  if (doesIdHaveOddDigitCount(start) && start.length === stop.length) return 0;

  let invalidIdCount = 0;
  const startInt = parseInt(start);
  const stopInt = parseInt(stop);
  for (let id = startInt; id <= stopInt; id++) {
    if (isIdInvalid(id)) {
      invalidIdCount += id;
    }
  }
  return invalidIdCount;
};

const doesIdHaveOddDigitCount = (id: string) => id.length % 2 === 1;

export const isIdInvalid = (id: number) => {
  const idString = id.toString();
  if (doesIdHaveOddDigitCount(idString)) {
    return false;
  }

  const halfStringLength = idString.length / 2;
  const firstHalf = idString.slice(0, halfStringLength);
  const secondHalf = idString.slice(-halfStringLength);

  return firstHalf === secondHalf;
};

solvePuzzle().then((result) =>
  writeSolution('day_02/solution_1', `Invalid ID Count is '${result}'\n`)
);
