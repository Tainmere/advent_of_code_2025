import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_03/puzzle_input.txt';

export const solvePuzzle = async () => {
  const data: string[] = await readMultilinePuzzleInput(puzzlePath);
  const result = calculateTotalJotage(data);
  writeSolution('day_03/solution_1', `Total joltage is ${result}.\n`);
};

export const calculateTotalJotage = (banks: string[]) =>
  banks.map((bank) => findMaxJoltage(bank)).reduce<number>((a, b) => a + b, 0);

export const findMaxJoltage = (bank: string) => {
  const batteries = bank.split('');

  // ignoring the last battery in the bank for now
  // out of the other batteries the highest voltage is the best one
  // even if a battery ends on `91`,
  // that would still be bigger than any battery set starting with `8`

  const highestVoltage = batteries.slice(0, -1).toSorted().toReversed()[0];
  const highestVoltageIndex = batteries.findIndex((battery) => battery === highestVoltage);

  const secondHighestVoltage = batteries
    .slice(highestVoltageIndex + 1)
    .toSorted()
    .toReversed()[0];

  // const result = [highestVoltage, secondHighestVoltage].join('') |> parseInt
  const result = parseInt([highestVoltage, secondHighestVoltage].join(''));
  return result;
};
