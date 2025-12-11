import { isIdInvalid, calculateInvalidIdCountInRange, solvePuzzle } from './puzzle_1';

describe(`${solvePuzzle.name}()`, () => {
  test('properly solves the given test example', async () => {
    const testCase =
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
    const testResult = 1227775554;
    const result = await solvePuzzle(testCase);

    expect(result).toBe(testResult);
  });
});

describe(`${isIdInvalid.name}()`, () => {
  describe('ids with odd digit counts are never invalid', () => {
    test.each([0, 1, 5, 111, 185, 55555])('id %i is not invalid', (id) => {
      expect(isIdInvalid(id)).toBe(false);
    });
  });

  describe('ids with even digit counts', () => {
    test.each([10, 15, 20, 1234, 87654321, 555551])(
      'id %i is not invalid as digits are not mirrored',
      (id) => {
        expect(isIdInvalid(id)).toBe(false);
      }
    );

    test.each([11, 22, 33, 1111, 1616, 12341234, 9753197531])(
      'id %i is invalid as digits are mirrored',
      (id) => {
        expect(isIdInvalid(id)).toBe(true);
      }
    );
  });
});

describe(`${calculateInvalidIdCountInRange.name}()`, () => {
  describe('when both ids have odd digits counts and are the same length', () => {
    test.each([
      ['1', '5'],
      ['111', '999'],
      ['10000', '99999'],
    ])('start %i to stop %i return 0', (start, stop) => {
      expect(calculateInvalidIdCountInRange([start, stop])).toBe(0);
    });
  });

  describe('returns 0 when there are no invalid IDs in range', () => {
    test.each([['12', '21']])('range %i-%i returns 0', (start, stop) => {
      expect(calculateInvalidIdCountInRange([start, stop])).toBe(0);
    });
  });

  test('invalid IDs in range 11-22 are summed to 33', () => {
    expect(calculateInvalidIdCountInRange(['11', '22'])).toBe(33);
  });
  describe('when the range includes invalid ids', () => {
    test.each([
      ['1', '12', 11],
      ['6', '24', 33],
    ])('invalid IDs in range %i-%i are summed to %i', (start, stop, expected) => {
      expect(calculateInvalidIdCountInRange([start, stop])).toBe(expected);
    });
  });
});
