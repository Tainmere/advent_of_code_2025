import { readMultilinePuzzleInput } from '../../utils/importPuzzle';
import { writeSolution } from '../../utils/writeSolution';

const puzzlePath = 'day_04/puzzle_input.txt';

export const solvePuzzle = async () => {
  const data: string[] = await readMultilinePuzzleInput(puzzlePath);
  const result = findAccessibleRollCount(data);
  writeSolution('day_04/solution_1', `${result} rolls are accessible`);
};

export const findAccessibleRollCount = (grid: string[]) => {
  const _isRollAtPosition = isRollAtPosition(grid);

  const accessibleCells = [];
  for (let y = 0; y < grid.length; y++) {
    for (let x = 0; x < grid[y].length; x++) {
      const isRoll = grid[y][x] === '@';
      if (!isRoll) continue;

      const adjacentCells = [
        [x - 1, y - 1],
        [x - 1, y],
        [x - 1, y + 1],
        [x, y - 1],
        [x, y + 1],
        [x + 1, y - 1],
        [x + 1, y],
        [x + 1, y + 1],
      ];

      const adjacentRollCount = adjacentCells.filter(([_x, _y]) =>
        _isRollAtPosition(_x, _y)
      ).length;
      if (adjacentRollCount < 4) {
        accessibleCells.push({ x, y });
      }
    }
  }
  // console.log(accessibleCells);
  return accessibleCells.length;
};

export const isRollAtPosition = (grid: string[]) => {
  const columnCount = grid.length;
  const rowCount = grid[0].length;

  return (x: number, y: number) => {
    const isWithinRowBounds = 0 <= x && x < rowCount;
    const isWithinColumnBounds = 0 <= y && y < columnCount;
    if (!isWithinRowBounds || !isWithinColumnBounds) return false;

    return grid[y][x] === '@';
  };
};
