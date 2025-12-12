import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_05/puzzle_input.txt';

type Range = [number, number];

export const solvePuzzle = async () => {
  const ranges = await importPuzzle();

  const freshIngredients = findAllFreshIngredients(ranges);

  writeSolution(
    'day_05/solution_2',
    `Overall there are ${freshIngredients.length} fresh ingredients.\n`
  );
};

export const importPuzzle = async (testData?: string[]) => {
  const data: string[] = testData ? testData : await readMultilinePuzzleInput(puzzlePath);
  const emptyLineIndex = data.findIndex((element) => element === '');

  const ranges = data.slice(0, emptyLineIndex).map(parseRange);
  return ranges as Range[];
};

export const findAllFreshIngredients = (ranges: Range[]) => {
  const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);

  let highestFreshIngredient = 0;
  const freshIngredients: number[] = [];

  sortedRanges.forEach(([start, stop]) => {
    const isRangeAlreadyCovered = stop <= highestFreshIngredient;
    if (isRangeAlreadyCovered) return;
    console.log(start, stop, highestFreshIngredient);

    for (let ingredient = start; ingredient <= stop; ingredient++) {
      const isIngredientAlreadyCovered = ingredient <= highestFreshIngredient;
      if (isIngredientAlreadyCovered) continue;
      try {
        freshIngredients.push(ingredient);
      } catch (e: any) {
        console.log(ingredient, freshIngredients.length);
        throw new Error(e.message);
      }
    }

    // only need to update this value after a range
    highestFreshIngredient = stop;
  });
  return freshIngredients;
};

export const parseRange = (range: string) => range.split('-').map((x) => parseInt(x));
