import {UFArray} from '../../src/tools/UFArray.js';

describe('UFArray', () => {
  describe('swap', () => {
    test('different index', () => {
      const expected = [4, 2, 3, 1];
      const actual = [1, 2, 3, 4];
      const result = UFArray.swap(actual, 0, 3);
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('same index', () => {
      const expected = [1, 2, 3, 4];
      const actual = [1, 2, 3, 4];
      const result = UFArray.swap(actual, 2, 2);
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('shuffle', () => {
    test('list', () => {
      const actual = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = UFArray.shuffle(actual);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(actual).not.toEqual(expected);
      expect(result).toBe(actual);
    });
  });


  describe('remove', () => {
    test('from start', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.removeItem(actual, 2);
      const expected = [1, 3, 4, 1, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('from middle', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.removeItem(actual, 2, 3);
      const expected = [1, 2, 3, 4, 1, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('not existing', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.removeItem(actual, 5);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('empty array', () => {
      const actual: number[] = [];
      const result = UFArray.removeItem(actual, 5);
      const expected: number[] = [];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('from beyond', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.removeItem(actual, 2, 10);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('createFilled', () => {
    test('new array', () => {
      const actual = UFArray.createFilled(4, 6);
      const expected = [4, 4, 4, 4, 4, 4];
      expect(actual).toEqual(expected);
    });

    test('existing array', () => {
      const actual = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = UFArray.createFilled(4, 6, actual);
      const expected = [4, 4, 4, 4, 4, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('randomItem', () => {
    test('item', () => {
      const actual = [1, 2, 3, 4];
      const result = UFArray.randomItem(actual);
      expect(actual.indexOf(result) >= 0).toBeTruthy();
    });
  });

  describe('removeDuplicates', () => {
    test('duplicates', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.removeDuplicates(actual);
      const expected = [1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('no duplicates', () => {
      const actual = [1, 2, 3, 4, 5, 6, 7, 8];
      const result = UFArray.removeDuplicates(actual);
      const expected = [1, 2, 3, 4, 5, 6, 7, 8];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('empty list', () => {
      const actual: number[] = [];
      const result = UFArray.removeDuplicates(actual);
      const expected: number[] = [];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });


  });

  describe('findByProperty', () => {
    test('single property', () => {
      const actual = [
        {
          value: 1,
          name: 'apple'
        },
        {
          value: 2,
          name: 'pear'
        },
        {
          value: 3,
          name: 'orange'
        },
        {
          value: 4,
          name: 'berry'
        },
      ];
      const result = UFArray.findByProperty(actual, {value: 3});
      const expected = 2;
      expect(result).toEqual(expected);
    });

    test('single property ignore case', () => {
      const actual = [
        {
          value: 1,
          name: 'apple'
        },
        {
          value: 2,
          name: 'pear'
        },
        {
          value: 3,
          name: 'orange'
        },
        {
          value: 4,
          name: 'berry'
        },
      ];
      const result = UFArray.findByProperty(actual, {name: 'Orange'}, true);
      const expected = 2;
      expect(result).toEqual(expected);
    });

    test('single property not existing', () => {
      const actual = [
        {
          value: 1,
          name: 'apple'
        },
        {
          value: 2,
          name: 'pear'
        },
        {
          value: 3,
          name: 'orange'
        },
        {
          value: 4,
          name: 'berry'
        },
      ];
      const result = UFArray.findByProperty(actual, {name: 'Orange'});
      const expected = -1;
      expect(result).toEqual(expected);
    });

    test('double property', () => {
      const actual = [
        {
          value: 1,
          name: 'apple'
        },
        {
          value: 2,
          name: 'pear'
        },
        {
          value: 3,
          name: 'orange'
        },
        {
          value: 4,
          name: 'berry'
        },
      ];
      const result = UFArray.findByProperty(actual, {value: 3, name: 'orange'});
      const expected = 2;
      expect(result).toEqual(expected);
    });

    test('double property not existing', () => {
      const actual = [
        {
          value: 1,
          name: 'apple'
        },
        {
          value: 2,
          name: 'pear'
        },
        {
          value: 3,
          name: 'orange'
        },
        {
          value: 4,
          name: 'berry'
        },
      ];
      const result = UFArray.findByProperty(actual, {value: 3, name: 'apple'});
      const expected = -1;
      expect(result).toEqual(expected);
    });


  });

  describe('getItem', () => {
    test('inside range', () => {
      const actual = UFArray.getItem([1, 2, 3, 4], 2, 1000);
      const expected = 3;
      expect(actual).toEqual(expected);
    });

    test('outside range', () => {
      const actual = UFArray.getItem([1, 2, 3, 4], 5, 1000);
      const expected = 1000;
      expect(actual).toEqual(expected);
    });


  });

  describe('replace', () => {
    test('replace all', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replace(actual, 4, 5);
      const expected = [1, 2, 3, 5, 1, 2, 3, 5];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('replace some', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replace(actual, 2, 5, 3);
      const expected = [1, 2, 3, 4, 1, 5, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('replace none', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replace(actual, 6, 5);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('replaceMultiple', () => {
    test('replace all with single value', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replaceMultiple(actual, [2, 3], 5);
      const expected = [1, 5, 5, 4, 1, 5, 5, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('replace all', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replaceMultiple(actual, [2, 3], [5, 6]);
      const expected = [1, 5, 6, 4, 1, 5, 6, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('replace none', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.replaceMultiple(actual, [5, 6], [7, 8]);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('add', () => {
    test('add', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const extra = [5, 6, 7, 8]
      const result = UFArray.add(actual, extra);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4, 5, 6, 7, 8];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('toInt', () => {
    test('numbers', () => {
      const actual = ['1', '2', '3', '4', '1', '2', '3', '4'];
      const result = UFArray.toInt(actual);
      const expected = [1, 2, 3, 4, 1, 2, 3, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('toNumber', () => {
    test('numbers', () => {
      const actual = ['1.1', '2.3', '3.5', '4.7', '1.9', '2.11', '3.13', '4.15'];
      const result = UFArray.toNumber(actual);
      const expected = [1.1, 2.3, 3.5, 4.7, 1.9, 2.11, 3.13, 4.15];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });

  describe('contains', () => {
    test('has value', () => {
      const list = [1, 2, 3, 4, 1, 2, 3, 4];
      const actual = UFArray.contains(list, 5, 6, 2);
      expect(actual).toBeTruthy();
    });

    test('has not value', () => {
      const list = [1, 2, 3, 4, 1, 2, 3, 4];
      const actual = UFArray.contains(list, 5, 6);
      expect(actual).toBeFalsy();
    });
  });

  describe('sortNumeric', () => {
    test('normal sort', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.sortNumeric(actual);
      const expected = [1, 1, 2, 2, 3, 3, 4, 4];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });

    test('reverse sort', () => {
      const actual = [1, 2, 3, 4, 1, 2, 3, 4];
      const result = UFArray.sortNumeric(actual, true);
      const expected = [4, 4, 3, 3, 2, 2, 1, 1];
      expect(actual).toEqual(expected);
      expect(result).toBe(actual);
    });
  });
});