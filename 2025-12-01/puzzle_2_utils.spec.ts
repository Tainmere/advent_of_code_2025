import { rotateDial } from './puzzle_2_utils';
import { Direction } from './types';

describe(`${rotateDial.name}()`, () => {
  let _rotateDial = rotateDial(100);

  test.each([0, 10, 20, 40, 99])(`doesn't change position %d when rotation is 0`, (position) => {
    const [resultRight, _] = _rotateDial(position, Direction.RIGHT, 0);
    const [resultLeft, __] = _rotateDial(position, Direction.LEFT, 0);

    expect(resultRight).toBe(position);
    expect(resultLeft).toBe(position);
  });

  test.each([
    [0, 1, 1],
    [0, 3, 3],
    [10, 5, 15],
    [20, 5, 25],
    [40, 5, 45],
  ])(`increase position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
    const [result, _] = _rotateDial(position, Direction.RIGHT, rotation);
    expect(result).toBe(expectedPosition);
  });

  test.each([
    [99, 1, 98],
    [99, 3, 96],
    [10, 5, 5],
    [20, 5, 15],
    [40, 5, 35],
  ])(`decreases position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
    const [result, _] = _rotateDial(position, Direction.LEFT, rotation);
    expect(result).toBe(expectedPosition);
  });

  describe('the position properly wraps back around when turning it passed 0/100', () => {
    test.each([
      [99, 1, 0],
      [5, 100, 5],
      [90, 20, 10],
    ])(`increase position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
      const [result, _] = _rotateDial(position, Direction.RIGHT, rotation);
      expect(result).toBe(expectedPosition);
    });

    test.each([
      [0, 1, 99],
      [10, 20, 90],
      [40, 60, 80],
    ])(`decreases position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
      const [result, _] = _rotateDial(position, Direction.LEFT, rotation);
      expect(result).toBe(expectedPosition);
    });
  });

  describe('calculating zero count', () => {
    describe('when moving exactly to 0 without any loops,', () => {
      test.each([1, 10, 50, 99])('returns zero count 1 when moving left', (position) => {
        const [result, zeroCount] = _rotateDial(position, Direction.LEFT, position);
        expect(result).toBe(0);
        expect(zeroCount).toBe(1);
      });

      test.each([
        [1, 99],
        [10, 90],
        [50, 50],
        [99, 1],
      ])('returns zero count 1 when moving right', (position, rotation) => {
        const [result, zeroCount] = _rotateDial(position, Direction.RIGHT, rotation);
        expect(result).toBe(0);
        expect(zeroCount).toBe(1);
      });
    });

    describe('when looping over zero but not landing on zero', () => {
      test.each([
        [0, 101, Direction.RIGHT, 1],
        [0, 201, Direction.RIGHT, 2],
        [0, 501, Direction.RIGHT, 5],
        [50, 60, Direction.RIGHT, 1],
        [50, 360, Direction.RIGHT, 4],
        [1, 90, Direction.LEFT, 1],
        [1, 190, Direction.LEFT, 2],
        [1, 490, Direction.LEFT, 5],
        [50, 60, Direction.LEFT, 1],
        [50, 360, Direction.LEFT, 4],
      ])(
        'when moving from %i %i to the %s, the zero count is %i',
        (position, rotation, direction, expectedZeroCount) => {
          const [_, zeroCount] = _rotateDial(position, direction, rotation);
          expect(zeroCount).toBe(expectedZeroCount);
        }
      );
    });

    describe('when starting at zero', () => {
      test.each([
        [0, 10, Direction.RIGHT, 0],
        [0, 110, Direction.RIGHT, 1],
        [0, 190, Direction.RIGHT, 1],
        [0, 410, Direction.RIGHT, 4],
        [0, 590, Direction.RIGHT, 5],
        [0, 10, Direction.LEFT, 0],
        [0, 110, Direction.LEFT, 1],
        [0, 190, Direction.LEFT, 1],
        [0, 410, Direction.LEFT, 4],
        [0, 590, Direction.LEFT, 5],
      ])(
        'when moving from %i %i to the %s, the zero count is %i',
        (position, rotation, direction, expectedZeroCount) => {
          const [_, zeroCount] = _rotateDial(position, direction, rotation);
          expect(zeroCount).toBe(expectedZeroCount);
        }
      );
    });

    describe('when landing on zero', () => {
      describe('and not starting at zero', () => {
        test.each([
          [1, 99, Direction.RIGHT, 1],
          [1, 199, Direction.RIGHT, 2],
          [1, 499, Direction.RIGHT, 5],
          [50, 50, Direction.RIGHT, 1],
          [50, 350, Direction.RIGHT, 4],
          [1, 101, Direction.LEFT, 2],
          [1, 201, Direction.LEFT, 3],
          [1, 401, Direction.LEFT, 5],
          [50, 150, Direction.LEFT, 2],
          [50, 350, Direction.LEFT, 4],
        ])(
          'when moving from %i %i to the %s, the zero count is %i',
          (position, rotation, direction, expectedZeroCount) => {
            const [result, zeroCount] = _rotateDial(position, direction, rotation);
            expect(result).toBe(0);
            expect(zeroCount).toBe(expectedZeroCount);
          }
        );
      });
      describe('and starting at zero', () => {
        test.each([
          [0, 100, Direction.RIGHT, 1],
          [0, 200, Direction.RIGHT, 2],
          [0, 500, Direction.RIGHT, 5],
          [0, 100, Direction.LEFT, 1],
          [0, 200, Direction.LEFT, 2],
          [0, 500, Direction.LEFT, 5],
        ])(
          'when moving from %i %i to the %s, the zero count is %i',
          (position, rotation, direction, expectedZeroCount) => {
            const [result, zeroCount] = _rotateDial(position, direction, rotation);
            expect(result).toBe(0);
            expect(zeroCount).toBe(expectedZeroCount);
          }
        );
      });
    });
  });
});
