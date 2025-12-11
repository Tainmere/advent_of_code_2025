import { isIdInvalid, calculateInvalidIdCountInRange, solvePuzzle } from './main';

describe(`${solvePuzzle.name}()`, () => {
  test('properly solves the given test example', async () => {
    const testCase =
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124';
    const testResult = 4174379265;
    const result = await solvePuzzle(testCase);

    expect(result).toBe(testResult);
  });
});

describe(`${isIdInvalid.name}()`, () => {
  describe('ids without digits strings repeating at least once', () => {
    test.each([0, 1, 5, 185, 55455, 10, 15, 20, 1234, 87654321, 555551])(
      'id %i is not invalid',
      (id) => {
        expect(isIdInvalid(id)).toBe(false);
      }
    );
  });

  describe('IDs with digit mirror are still invalid', () => {
    test.each([11, 22, 33, 1111, 1616, 12341234, 9753197531, 446446])(
      'id %i is invalid as digits are mirrored',
      (id) => {
        expect(isIdInvalid(id)).toBe(true);
      }
    );
  });

  describe('IDs with substrings that repeat more than once now also are invalid', () => {
    test.each([111, 33333, 123123123, 912359123591235])('id %i is now also invalid', (id) => {
      expect(isIdInvalid(id)).toBe(true);
    });
  });
});

describe(`${calculateInvalidIdCountInRange.name}()`, () => {
  describe('given test cases', () => {
    test.each([
      ['11', '22', 33],
      ['95', '115', 99 + 111],
      ['998', '1012', 999 + 1010],
      ['1188511880', '1188511890', 1188511885],
      ['222220', '222224', 222222],
      ['1698522', '1698528', 0],
      ['446443', '446449', 446446],
      ['38593856', '38593862', 38593859],
      ['565653', '565659', 565656],
      ['824824821', '824824827', 824824824],
      ['2121212118', '2121212124', 2121212121],
    ])('range %i-%i sums to %i', (start, stop, expectedSum) => {
      expect(calculateInvalidIdCountInRange([start, stop])).toBe(expectedSum);
    });
  });

  // describe.skip('when both ids have odd digits counts and are the same length', () => {
  //   test.each([
  //     ['1', '5'],
  //     ['111', '999'],
  //     ['10000', '99999'],
  //   ])('start %i to stop %i return 0', (start, stop) => {
  //     expect(calculateInvalidIdCountInRange([start, stop])).toBe(0);
  //   });
  // });

  // describe.skip('returns 0 when there are no invalid IDs in range', () => {
  //   test.each([['12', '21']])('range %i-%i returns 0', (start, stop) => {
  //     expect(calculateInvalidIdCountInRange([start, stop])).toBe(0);
  //   });
  // });

  // test('invalid IDs in range 11-22 are summed to 33', () => {
  //   expect(calculateInvalidIdCountInRange(['11', '22'])).toBe(33);
  // });
  // describe.skip('when the range includes invalid ids', () => {
  //   test.each([
  //     ['1', '12', 11],
  //     ['6', '24', 33],
  //   ])('invalid IDs in range %i-%i are summed to %i', (start, stop, expected) => {
  //     expect(calculateInvalidIdCountInRange([start, stop])).toBe(expected);
  //   });
  // });
});
