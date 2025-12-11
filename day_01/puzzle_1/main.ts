import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { Instruction, Position, ZeroCount } from '../types';
import { processPuzzleInstruction } from './util';
import { writeSolution } from '../../utils/writeSolution';

const initialPosition = 50;
const digitCount = 100;

const readPuzzleData = async () => {
  const puzzleLocation = 'day_01/puzzle_input.txt';

  const data: Instruction[] = await readMultilinePuzzleInput(puzzleLocation);
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

  writeSolution('day_01/solution_1', `Zero was hit ${zeroCount} times.\n`);
};

solvePuzzle();
