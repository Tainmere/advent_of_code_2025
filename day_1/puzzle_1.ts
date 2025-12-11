import { readPuzzleInput, readPuzzleInputAsStream } from '../utils/importPuzzle';
import { Instruction, Position, ZeroCount } from './types';
import { processPuzzleInstruction } from './puzzle_1_utils';
import { writeSolution } from '../utils/writeSolution';

const initialPosition = 50;
const digitCount = 100;

const readPuzzleData = async () => {
  const puzzleLocation = 'day_1/puzzle_1_input.txt';

  const data: Instruction[] = await readPuzzleInput(puzzleLocation);
  return data;
};

const solvePuzzle = async () => {
  const data = await readPuzzleData();

  const solvingPuzzleMessage = 'Solving Puzzle 1 took';

  console.time(solvingPuzzleMessage);
  type Accumulator = [Position, ZeroCount];

  const [finalPosition, zeroCount] = data.reduce<Accumulator>(
    ([position, zeroCount], instruction) => {
      const [newPosition, isZero] = processPuzzleInstruction(digitCount, position, instruction);
      zeroCount = isZero ? zeroCount + 1 : zeroCount;

      return [newPosition, zeroCount];
    },
    [initialPosition, 0]
  );
  console.timeEnd(solvingPuzzleMessage);

  writeSolution('day_1/solution_1', `Zero was hit ${zeroCount} times.\n`);
};

solvePuzzle();
