import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_03/puzzle_input.txt';

const solvePuzzle = async () => {
  const data: string[] = await readMultilinePuzzleInput(puzzlePath);
  const result = calculateTotalJotage(data);
  writeSolution('day_03/solution_2', `Total joltage is ${result}.\n`);
};

export const calculateTotalJotage = (banks: string[]) =>
  banks
    .map((bank) => findMaxJoltage(bank.split('')))
    .map((joltage) => parseInt(joltage))
    .reduce<number>((a, b) => a + b, 0);

export const findMaxJoltage = (batteries: string[], remainingDigits = 12): string => {
  // ignoring the last battery in the bank for now
  // out of the other batteries the highest voltage is the best one
  // even if a battery ends on `91`,
  // that would still be bigger than any battery set starting with `8`
  if (batteries.length === 1) {
    return batteries[0];
  }

  const highestVoltage = batteries
    .slice(0, batteries.length - remainingDigits + 1)
    .toSorted()
    .toReversed()[0];

  if (remainingDigits === 1) {
    return highestVoltage;
  }

  const highestVoltageIndex = batteries.findIndex((battery) => battery === highestVoltage);

  return `${highestVoltage}${findMaxJoltage(
    batteries.slice(highestVoltageIndex + 1),
    remainingDigits - 1
  )}`;

  // const result = [highestVoltage, secondHighestVoltage].join('') |> parseInt
  // const result = parseInt([highestVoltage, secondHighestVoltage].join(''));
  // return result;
};

solvePuzzle();
