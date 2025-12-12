import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_05/puzzle_input.txt';

type Range = [number, number];

export const solvePuzzle = async () => {
  const [ranges, ingredients] = await importPuzzle();

  const freshIngredients = findFreshIngredients(ranges, ingredients);

  writeSolution('day_05/solution_1', `There are ${freshIngredients.length} fresh ingredients.\n`);
};

export const importPuzzle = async (testData?: string[]) => {
  const data: string[] = testData ? testData : await readMultilinePuzzleInput(puzzlePath);
  const emptyLineIndex = data.findIndex((element) => element === '');

  const ranges = data.slice(0, emptyLineIndex).map(parseRange);
  const ingredients = data
    .slice(emptyLineIndex + 1)
    .map((element) => parseInt(element))
    .toSorted((a, b) => a - b);

  return [ranges, ingredients] as [Range[], number[]];
};

export const findFreshIngredients = (ranges: Range[], ingredients: number[]) =>
  ingredients.filter((ingredient) =>
    ranges.some(([start, stop]) => start <= ingredient && ingredient <= stop)
  );

export const parseRange = (range: string) => range.split('-').map((x) => parseInt(x));
