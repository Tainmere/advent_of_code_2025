import { calculateTotalJotage, findMaxJoltage } from './main';

describe(`${calculateTotalJotage.name}()`, () => {
  test('provided test case sums correctly', () => {
    const testBanks = ['987654321111111', '811111111111119', '234234234234278', '818181911112111'];

    expect(calculateTotalJotage(testBanks)).toBe(3121910778619);
  });
});

describe(`${findMaxJoltage.name}()`, () => {
  describe('provided test cases', () => {
    test.each([
      ['987654321111111', '987654321111'],
      ['811111111111119', '811111111119'],
      ['234234234234278', '434234234278'],
      ['818181911112111', '888911112111'],
    ])('bank %s has max voltage of %i', (bank, maxVoltage) => {
      const result = findMaxJoltage(bank.split(''));
      expect(result).toBe(maxVoltage);
    });
  });

  // test('if the only 9 is the last digit, it is used as the second digit', () => {
  //   expect(
  //     findMaxJoltage(
  //       '7345642821551771625344317583834873168383236262675128312173852581762387236528521115414155624672741639'
  //     )
  //   ).toBe(89);
  // });
});
