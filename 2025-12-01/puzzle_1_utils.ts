import { Position, Instruction, Rotation, Direction } from './types';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
const modulo = (digit: number, divisor: number) => ((digit % divisor) + divisor) % divisor;

export const processPuzzleInstruction = (
  digitCount: number,
  position: Position,
  instruction: Instruction
) => {
  const [direction, rotation] = parseInstruction(instruction);

  const newPosition = rotateDial(digitCount)(position, direction, rotation);

  return [newPosition, newPosition === 0] as [Position, boolean];
};

export const parseInstruction = (instruction: Instruction) => {
  const direction = instruction[0] as Direction;
  const rotation: Rotation = parseInt(instruction.slice(1));

  return [direction, rotation] as [Direction, Rotation];
};

export const rotateDial =
  (digitCount: number) => (position: Position, direction: Direction, rotation: Rotation) => {
    let result = position;

    if (direction === Direction.LEFT) {
      result = position - rotation;
    }
    if (direction === Direction.RIGHT) {
      result = position + rotation;
    }
    return modulo(result, digitCount);
  };
