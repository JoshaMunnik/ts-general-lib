import {UFEnum} from "../../src/tools/UFEnum";

describe('UFEnum', () => {
  describe('getMinMax', () => {
    test('basic enum', () => {
      enum test {
        first,
        second,
        third
      }
      const result = UFEnum.getMinMax(test);
      expect(result).toEqual([0, 2]);
    });

    test('enum with single hardcoded value', () => {
      enum test {
        first = 300,
        second,
        third
      }
      const result = UFEnum.getMinMax(test);
      expect(result).toEqual([300, 302]);
    });

    test('enum with multiple hardcoded values', () => {
      enum test {
        first = 300,
        second = 400,
        third = 500
      }
      const result = UFEnum.getMinMax(test);
      expect(result).toEqual([300, 500]);
    });

    test('enum with string values', () => {
      enum test {
        first = 'first',
        second = 'second',
        third = 'third'
      }
      const result = UFEnum.getMinMax(test);
      expect(result).toEqual([Infinity, -Infinity]);
    });
  });
});