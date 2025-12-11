import { processPuzzleData } from './main';

describe(`${processPuzzleData.name}()`, () => {
  test.each([
    ['L1', 0],
    ['L49', 0],
    ['L50', 1],
    ['L60', 1],
    ['L150', 2],
    ['R1', 0],
    ['R49', 0],
    ['R50', 1],
    ['R60', 1],
    ['R150', 2],
  ])('for one instruction', (instruction, expectedZeroCount) => {
    const [_, zeroCount] = processPuzzleData([instruction]);
    expect(zeroCount).toBe(expectedZeroCount);
  });

  test.each([
    [['L1', 'L1'], 0],
    [['L49', 'R49'], 0],
    [['L50', 'R1'], 1],
    [['L60', 'R10'], 2],
    [['L150', 'R1'], 2],
    [['R1', 'R48'], 0],
    [['R49', 'R1'], 1],
    [['R50'], 1],
    [['R50', 'L1'], 1],
    [['R60', 'L10'], 2],
    [['R150', 'L100'], 3],
  ])('for two instructions', (instructions, expectedZeroCount) => {
    const [_, zeroCount] = processPuzzleData(instructions);
    expect(zeroCount).toBe(expectedZeroCount);
  });
});
