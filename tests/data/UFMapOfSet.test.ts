import {UFMapOfSet} from "../../src/UF/data/UFMapOfSet";

describe('UFMapOFSet', () => {

  describe('add', () => {
    test('single value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.get('a')).toEqual([1]);
    });

    test('two values', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 2);
      expect(map.get('a')).toEqual([1, 2]);
    });

    test('same value 2x', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 1);
      expect(map.get('a')).toEqual([1]);
    });

    test('two keys', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('b', 2);
      expect(map.get('a')).toEqual([1]);
      expect(map.get('b')).toEqual([2]);
    });
  });

  describe('get', () => {
    test('unknown key', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.get('b')).toEqual([]);
    });
  });

  describe('has', () => {
    test('existing key', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.has('a')).toBeTruthy();
    });

    test('unknown key', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.has('b')).toBeFalsy();
    });
  });

  describe('hasValue', () => {
    test('existing key and value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.hasValue('a', 1)).toBeTruthy();
    });

    test('existing key and unknown value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.hasValue('a', 2)).toBeFalsy();
    });

    test('unknown key and unknown value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.hasValue('b', 1)).toBeFalsy();
    });
  });

  describe('isEmpty', () => {
    test('new instance', () => {
      const map = new UFMapOfSet<string, number>();
      expect(map.isEmpty()).toBeTruthy();
    });

    test('not empty', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      expect(map.isEmpty()).toBeFalsy();
    });

    test('again empty', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.remove('a', 1);
      expect(map.isEmpty()).toBeTruthy();
    });
  });

  describe('remove', () => {
    test('remove existing value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 2);
      map.remove('a', 1);
      expect(map.get('a')).toEqual([2]);
    });

    test('remove unknown value', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 2);
      map.remove('a', 3);
      expect(map.get('a')).toEqual([1, 2]);
    });

    test('remove unknown key', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 2);
      map.remove('b', 1);
      expect(map.get('a')).toEqual([1, 2]);
    });

    test('remove all', () => {
      const map = new UFMapOfSet<string, number>();
      map.add('a', 1);
      map.add('a', 2);
      map.remove('a', 1);
      map.remove('a', 2);
      expect(map.get('a')).toEqual([]);
    });
  });
});