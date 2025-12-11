import { Position, Instruction, Rotation, Direction } from '../types';

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder
const modulo = (digit: number, divisor: number) => ((digit % divisor) + divisor) % divisor;

export const processPuzzleInstruction = (
  digitCount: number,
  position: Position,
  instruction: Instruction
) => {
  const [direction, rotation] = parseInstruction(instruction);

  const [newPosition, zeroCount] = rotateDial(digitCount)(position, direction, rotation);

  if (isNaN(zeroCount)) {
    console.log(position, instruction, newPosition);
  }

  return [newPosition, zeroCount] as [Position, number];
};

export const parseInstruction = (instruction: Instruction) => {
  const direction = instruction[0] as Direction;
  const rotation: Rotation = parseInt(instruction.slice(1));

  return [direction, rotation] as [Direction, Rotation];
};

export const rotateDial =
  (digitCount: number) => (position: Position, direction: Direction, rotation: Rotation) => {
    let intermediate_result = position;

    if (direction === Direction.LEFT) {
      intermediate_result = position - rotation;
    }
    if (direction === Direction.RIGHT) {
      intermediate_result = position + rotation;
    }
    const result = modulo(intermediate_result, digitCount);

    // e.g. rotation is 101 -> we have at least one rotation over the 100 digit board
    const guaranteedZeroCrossings = Math.floor(rotation / digitCount);

    let zeroCount = guaranteedZeroCrossings;

    // if (intermediate_result > digitCount) {
    //   zeroCount = Math.floor(intermediate_result / digitCount);
    // }
    // if (intermediate_result < 0) {
    //   zeroCount = Math.ceil(Math.abs(intermediate_result) / digitCount);

    //   // else moving from 0 1 left would count as a zero crossing
    //   if (position === 0) {
    //     zeroCount -= 1;
    //   }
    // }

    const crossedZero =
      direction === Direction.LEFT ? result > position && position !== 0 : result < position;
    const landedOnZero = result === 0 && position !== 0;

    if (crossedZero || landedOnZero) {
      zeroCount += 1;
    }

    return [result, zeroCount];
  };
