import { readPuzzleInput, readPuzzleInputAsStream } from '../utils/importPuzzle';
import { Instruction, Position, ZeroCount } from './types';
import { processPuzzleInstruction } from './puzzle_2_utils';

const initialPosition = 50;
const digitCount = 100;

const readPuzzleData = async () => {
  const puzzleLocation = '2025-12-01/puzzle_1_input.txt';

  const data: Instruction[] = await readPuzzleInput(puzzleLocation);
  return data;
};

export const processPuzzleData = (data: Instruction[]) => {
  type Accumulator = [Position, ZeroCount];

  return data.reduce<Accumulator>(
    ([position, zeroCount], instruction) => {
      const [newPosition, zeroCounts] = processPuzzleInstruction(digitCount, position, instruction);

      zeroCount = zeroCount + zeroCounts;

      return [newPosition, zeroCount];
    },
    [initialPosition, 0]
  );
};

const solvePuzzle = async () => {
  const data = await readPuzzleData();

  const [finalPosition, zeroCount] = processPuzzleData(data);

  console.log(finalPosition, zeroCount);
};

solvePuzzle();
