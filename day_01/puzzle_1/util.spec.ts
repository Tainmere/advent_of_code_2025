import { rotateDial } from './util';
import { Direction } from '../types';

describe(`${rotateDial.name}()`, () => {
  let _rotateDial = rotateDial(100);

  test.each([0, 10, 20, 40, 99])(`doesn't change position %d when rotation is 0`, (position) => {
    expect(_rotateDial(position, Direction.RIGHT, 0)).toBe(position);

    expect(_rotateDial(position, Direction.LEFT, 0)).toBe(position);
  });

  test.each([
    [0, 1, 1],
    [0, 3, 3],
    [10, 5, 15],
    [20, 5, 25],
    [40, 5, 45],
  ])(`increase position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
    expect(_rotateDial(position, Direction.RIGHT, rotation)).toBe(expectedPosition);
  });

  test.each([
    [99, 1, 98],
    [99, 3, 96],
    [10, 5, 5],
    [20, 5, 15],
    [40, 5, 35],
  ])(`decreases position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
    expect(_rotateDial(position, Direction.LEFT, rotation)).toBe(expectedPosition);
  });

  describe('the position properly wraps back around when turning it passed 0/100', () => {
    test.each([
      [99, 1, 0],
      [5, 100, 5],
      [90, 20, 10],
    ])(`increase position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
      expect(_rotateDial(position, Direction.RIGHT, rotation)).toBe(expectedPosition);
    });

    test.each([
      [0, 1, 99],
      [10, 20, 90],
      [40, 60, 80],
    ])(`decreases position %d when rotation is R%d`, (position, rotation, expectedPosition) => {
      expect(_rotateDial(position, Direction.LEFT, rotation)).toBe(expectedPosition);
    });
  });
});
