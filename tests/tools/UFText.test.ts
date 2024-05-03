import {UFText} from "../../src/tools/UFText.js";

describe('UFText', () => {
  describe('sprintf', () => {
    test('single parameter', () => {
      const actual = UFText.sprintf('Hello %s!', 'World');
      const expected = 'Hello World!';
      expect(actual).toBe(expected);
    });

    test('multiple parameters', () => {
      const actual = UFText.sprintf('Hello %s! %s', 'World', 'How are you?');
      const expected = 'Hello World! How are you?';
      expect(actual).toBe(expected);
    });

    test('missing parameter', () => {
      const actual = UFText.sprintf('Hello %s! %s', 'World');
      const expected = 'Hello World! %s';
      expect(actual).toBe(expected);
    });

    test('extra parameter', () => {
      const actual = UFText.sprintf('Hello %s!', 'World', 'How are you?');
      const expected = 'Hello World!';
      expect(actual).toBe(expected);
    });

    test('no parameter', () => {
      const actual = UFText.sprintf('Hello World!');
      const expected = 'Hello World!';
      expect(actual).toBe(expected);
    });

    test('empty string', () => {
      const actual = UFText.sprintf('');
      const expected = '';
      expect(actual).toBe(expected);
    });

    test('null parameter', () => {
      const actual = UFText.sprintf('Hello %s!', null);
      const expected = 'Hello null!';
      expect(actual).toBe(expected);
    });

    test('undefined parameter', () => {
      const actual = UFText.sprintf('Hello %s!', undefined);
      const expected = 'Hello undefined!';
      expect(actual).toBe(expected);
    });

    test('number parameter', () => {
      const actual = UFText.sprintf('Hello %s!', 123);
      const expected = 'Hello 123!';
      expect(actual).toBe(expected);
    });

    test('boolean parameter', () => {
      const actual = UFText.sprintf('Hello %s!', true);
      const expected = 'Hello true!';
      expect(actual).toBe(expected);
    });

    test('object parameter', () => {
      const actual = UFText.sprintf('Hello %s!', {name: 'World'});
      const expected = 'Hello [object Object]!';
      expect(actual).toBe(expected);
    });

    test('string property with single object', () => {
      const pear = {color: 'brown', shape: 'pear', weight: 100};
      const apple = {color: 'green', shape: 'round', weight: 150};
      const actual = UFText.sprintf('The color of an apple is %(color) and the shape is %(shape)', apple);
      const expected = 'The color of an apple is green and the shape is round';
      expect(actual).toBe(expected);
    });

    test('string property with multiple objects', () => {
      const pear = {color: 'brown', shape: 'pear', weight: 100};
      const apple = {color: 'green', shape: 'round', weight: 150};
      const actual = UFText.sprintf('The color of a pear is %0$(color) and the color of an apple is %1$(color)', pear, apple);
      const expected = 'The color of a pear is brown and the color of an apple is green';
      expect(actual).toBe(expected);
    });

    test('number property with multiple objects', () => {
      const pear = {color: 'brown', shape: 'pear', weight: 100};
      const apple = {color: 'green', shape: 'round', weight: 150};
      const actual = UFText.sprintf('The weight of a pear is %0${weight}.2f and the weight of an apple is %1${weight}.2f', pear, apple);
      const expected = 'The weight of a pear is 100.00 and the weight of an apple is 150.00';
      expect(actual).toBe(expected);
    });

    test('missing property', () => {
      const pear = {color: 'brown', shape: 'pear', weight: 100};
      const apple = {color: 'green', shape: 'round', weight: 150};
      const actual = UFText.sprintf('The color of a pear is %0$(color) and the color of an apple is %1$(color)', pear);
      const expected = 'The color of a pear is brown and the color of an apple is %1$(color)';
      expect(actual).toBe(expected);
    });

    test('binary format', () => {
      const actual = UFText.sprintf('The number 12 as binary = %b', 12);
      const expected = 'The number 12 as binary = 1100';
      expect(actual).toBe(expected);
    });

    test('binary format', () => {
      const actual = UFText.sprintf('The number 12 as binary = %b', 12);
      const expected = 'The number 12 as binary = 1100';
      expect(actual).toBe(expected);
    });

    test('octal format', () => {
      const actual = UFText.sprintf('The number 12 as octal = %o', 12);
      const expected = 'The number 12 as octal = 14';
      expect(actual).toBe(expected);
    });

    test('decimal format', () => {
      const actual = UFText.sprintf('The number 12 as decimal = %d', 12);
      const expected = 'The number 12 as decimal = 12';
      expect(actual).toBe(expected);
    });

    test('decimal format with sign', () => {
      const actual = UFText.sprintf('The number 12 as decimal = %+d', 12);
      const expected = 'The number 12 as decimal = +12';
      expect(actual).toBe(expected);
    });

    test('hexadecimal format', () => {
      const actual = UFText.sprintf('The number 12 as hexadecimal = %x', 12);
      const expected = 'The number 12 as hexadecimal = c';
      expect(actual).toBe(expected);
    });

    test('uppercase hexadecimal format', () => {
      const actual = UFText.sprintf('The number 12 as hexadecimal = %X', 12);
      const expected = 'The number 12 as hexadecimal = C';
      expect(actual).toBe(expected);
    });

    test('uppercase hexadecimal format with padding', () => {
      const actual = UFText.sprintf('The number 12 as hexadecimal = %04X', 12);
      const expected = 'The number 12 as hexadecimal = 000C';
      expect(actual).toBe(expected);
    });

    test('default float format', () => {
      const actual = UFText.sprintf('The number 12.5 as float = %f', 12.5);
      const expected = 'The number 12.5 as float = 12.500000';
      expect(actual).toBe(expected);
    });

    test('float with precision format', () => {
      const actual = UFText.sprintf('The number 12.5 as float = %.2f', 12.5);
      const expected = 'The number 12.5 as float = 12.50';
      expect(actual).toBe(expected);
    });

    test('scientific format', () => {
      const actual = UFText.sprintf('The number 12.5 as scientific = %e', 12.5);
      const expected = 'The number 12.5 as scientific = 1.250000e+1';
      expect(actual).toBe(expected);
    });

    test('scientific with precision format', () => {
      const actual = UFText.sprintf('The number 12.5 as scientific = %.2e', 12.5);
      const expected = 'The number 12.5 as scientific = 1.25e+1';
      expect(actual).toBe(expected);
    });

    test('string format', () => {
      const actual = UFText.sprintf('The number 12 as string = %s', 12);
      const expected = 'The number 12 as string = 12';
      expect(actual).toBe(expected);
    });

    test('default justification', () => {
      const actual = UFText.sprintf('[%8s] = default justification', 'abcd');
      const expected = '[    abcd] = default justification';
      expect(actual).toBe(expected);
    });

    test('left justification', () => {
      const actual = UFText.sprintf('[%-8s] = left justification', 'abcd');
      const expected = '[abcd    ] = left justification';
      expect(actual).toBe(expected);
    });

    test('zero padding', () => {
      const actual = UFText.sprintf('[%08s] = zero padding', 'abcd');
      const expected = '[0000abcd] = zero padding';
      expect(actual).toBe(expected);
    });

    test('minus padding', () => {
      const actual = UFText.sprintf('[%\'-8s] = space padding', 'abcd');
      const expected = '[----abcd] = space padding';
      expect(actual).toBe(expected);
    });

    test('percentage', () => {
      const actual = UFText.sprintf('%%%.2f percentage', 33.5);
      const expected = '%33.50 percentage';
      expect(actual).toBe(expected);
    });

  });
});