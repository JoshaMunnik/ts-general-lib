import {UFObject} from "../../src/tools/UFObject";

describe('UFObject', () => {
  describe('getAs', () => {
    test('existing property', () => {
      const test = {
        apple: 'green'
      };
      const actual = UFObject.getAs(test, 'apple', 'yellow');
      const expected = 'green';
      expect(actual).toBe(expected);
    });

    test('missing property', () => {
      const test = {
        apple: 'green'
      };
      const actual = UFObject.getAs(test, 'banana', 'yellow');
      const expected = 'yellow';
      expect(actual).toBe(expected);
    });
  });

  describe('equalProperties', () => {

    test('equals single property', () => {
      const test = {
        apple: 'green',
        banana: 'yellow',
        berry: 'blue'
      };
      expect(UFObject.equalProperties(test, { apple: 'green'})).toBeTruthy();
    });

    test('equals double property', () => {
      const test = {
        apple: 'green',
        banana: 'yellow',
        berry: 'blue'
      };
      expect(UFObject.equalProperties(test, {apple: 'green', banana: 'yellow'})).toBeTruthy();
    });

    test('mismatch casing', () => {
      const test = {
        apple: 'green',
        banana: 'yellow',
        berry: 'blue'
      };
      expect(UFObject.equalProperties(test, {apple: 'Green', banana: 'Yellow'})).toBeFalsy();
    });

    test('ignore casing', () => {
      const test = {
        apple: 'green',
        banana: 'yellow',
        berry: 'blue'
      };
      expect(UFObject.equalProperties(test, {apple: 'Green', banana: 'Yellow'}, true)).toBeTruthy();
    });

    test('deep equals', () => {
      const test = {
        simple: '1234',
        complex: {
          first: '1',
          second: '2'
        }
      };
      expect(UFObject.equalProperties(test, {simple: '1234', complex: {second: '2'}})).toBeTruthy();
    });

    test('deep unequals', () => {
      const test = {
        simple: '1234',
        complex: {
          first: '1',
          second: '2'
        }
      };
      expect(UFObject.equalProperties(test, {simple: '1234', complex: {third: '3'}})).toBeFalsy();
    });
  });
});


