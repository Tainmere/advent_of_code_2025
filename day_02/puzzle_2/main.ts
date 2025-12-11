import { readPuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzle_file = 'day_02/puzzle_input.txt';

export const solvePuzzle = async (testCase?: string) => {
  const input = testCase ? testCase : await readPuzzleInput(puzzle_file);
  console.time(`parsing day 2 puzzle 2`);
  const parsedInput = parsePuzzleInput(input);
  console.timeEnd(`parsing day 2 puzzle 2`);

  console.time(`solving day 2 puzzle 2 took`);
  const result = parsedInput.reduce<number>((invalidIdCount, range) => {
    return invalidIdCount + calculateInvalidIdCountInRange(range as [string, string]);
  }, 0);
  console.timeEnd(`solving day 2 puzzle 2 took`);

  return result;
};

const parsePuzzleInput = (input: string) => input.split(',').map((range) => range.split('-'));

export const calculateInvalidIdCountInRange = ([start, stop]: [string, string]) => {
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

export const isIdInvalid = (id: number) => {
  const idString = id.toString();

  if (idString.length === 1) return false;

  if (idString[0].repeat(idString.length) === idString) {
    return true;
  }

  for (let range = 2; range <= idString.length / 2; range++) {
    const substringRepetitions = idString.length / range;
    const doesRangeFactor = substringRepetitions === Math.floor(substringRepetitions);
    if (!doesRangeFactor) continue;

    if (idString.slice(0, range).repeat(substringRepetitions) === idString) return true;
  }
  return false;
};

solvePuzzle().then((result) =>
  writeSolution('day_02/solution_2', `Invalid ID Count is '${result}'\n`)
);
