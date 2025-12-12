import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_05/puzzle_input.txt';

type Range = [number, number];

export const solvePuzzle = async () => {
  const ranges = await importPuzzle();

  const freshIngredientsRanges = combineFreshIngredientRanges(ranges);
  const totalFreshIngredientCount = freshIngredientsRanges
    .map(ingredientCountInRange)
    .reduce<number>((a, b) => a + b, 0);

  writeSolution(
    'day_05/solution_2',
    `Overall there are ${totalFreshIngredientCount} fresh ingredients.\n`
  );
};

export const importPuzzle = async (testData?: string[]) => {
  const data: string[] = testData ? testData : await readMultilinePuzzleInput(puzzlePath);
  const emptyLineIndex = data.findIndex((element) => element === '');

  const ranges = data.slice(0, emptyLineIndex).map(parseRange);
  return ranges as Range[];
};

export const combineFreshIngredientRanges = (ranges: Range[]) => {
  const sortedRanges = ranges.toSorted((a, b) => a[0] - b[0]);

  let currentFreshIngredientRange = sortedRanges[0];
  const processedRanges: Range[] = [];

  sortedRanges.slice(1).forEach((range) => {
    const isThereOverlap = doRangesOverlap(currentFreshIngredientRange, range);

    if (!isThereOverlap) {
      /* because we go through ranges from smallest to highest range start
        now we know that currentFreshIngredientRange happens completely before the current range

        -> all future ranges are also completely after currentFreshIngredientRange
        -> currentFreshIngredientRange cannot be extended anymore
      */
      processedRanges.push(currentFreshIngredientRange);
      currentFreshIngredientRange = range;
      return;
    }

    /*
      there is overlap between the two ranges
      because we go through ranges from highest to lowest start position,
      we know what currentFreshIngredientRange.start <= range.start
      
      -> we only need to compare the end values
    */
    const higherStopValue = Math.max(currentFreshIngredientRange[1], range[1]);
    currentFreshIngredientRange[1] = higherStopValue;
  });
  /*
    the last range still needs to be added to the list after going through all ranges
    before we only add a range to the processed ranges list when we have a range that is completely after the range
    but for the last range we look at that cannot happen.
  */
  processedRanges.push(currentFreshIngredientRange);

  return processedRanges;
};

export const ingredientCountInRange = ([start, stop]: Range) => stop - start + 1;

const doRangesOverlap = ([range1Start, range1Stop]: Range, [range2Start, range2Stop]: Range) =>
  /* Instead of checking the four different ways ranges can overlap,
  check the two cases they don't overlap.
  If neither case happens, then the ranges overlap */

  !(
    // Range 1 is completely before range 2
    (
      (range1Start < range2Start && range1Stop < range2Start) ||
      // Range 1 is completely after range 2
      (range1Start > range2Stop && range1Stop > range2Stop)
    )
  );

export const parseRange = (range: string) => range.split('-').map((x) => parseInt(x));
