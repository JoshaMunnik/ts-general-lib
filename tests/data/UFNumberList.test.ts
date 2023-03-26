import {UFNumberList} from "../../src/UF/data/UFNumberList";

describe('UFNumberList', () => {
  describe('empty list', () => {
    test('size', () => {
      const list = new UFNumberList();
      expect(list.size).toBe(0);
    });

    test('empty', () => {
      const list = new UFNumberList();
      expect(list.empty).toBeTruthy();
    });

    test('sum()', () => {
      const list = new UFNumberList();
      expect(list.sum()).toBe(0);
    });

    test('min()', () => {
      const list = new UFNumberList();
      expect(list.min()).toBe(0);
    });

    test('max()', () => {
      const list = new UFNumberList();
      expect(list.max()).toBe(0);
    });

    test('average()', () => {
      const list = new UFNumberList();
      expect(list.average()).toBe(0);
    });

    test('get()', () => {
      const list = new UFNumberList();
      expect(() => list.get(0)).toThrow();
    });
  });

  describe('list with one element in constructor', () => {
    test('get(0)', () => {
      const list = new UFNumberList(10);
      expect(list.get(0)).toBe(10);
    });

    test('size', () => {
      const list = new UFNumberList(10);
      expect(list.size).toBe(1);
    });

    test('empty', () => {
      const list = new UFNumberList(10);
      expect(list.empty).toBeFalsy();
    });

    test('sum()', () => {
      const list = new UFNumberList(10);
      expect(list.sum()).toBe(10);
    });

    test('min()', () => {
      const list = new UFNumberList(10);
      expect(list.min()).toBe(10);
    });

    test('max()', () => {
      const list = new UFNumberList(10);
      expect(list.max()).toBe(10);
    });

    test('average()', () => {
      const list = new UFNumberList(10);
      expect(list.average()).toBe(10);
    });

    test('get(1)', () => {
      const list = new UFNumberList();
      expect(() => list.get(1)).toThrow();
    });
  });

  describe('list with added element', () => {
    test('get(0)', () => {
      const list = new UFNumberList();
      list.add(15);
      expect(list.get(0)).toBe(15);
    });

    test('size', () => {
      const list = new UFNumberList();
      list.add(15);
      expect(list.size).toBe(1);
    });
  });

  describe('list with add x2', () => {
    test('get(0)', () => {
      const list = new UFNumberList();
      list.add(15);
      list.add(37);
      expect(list.get(0)).toBe(15);
      expect(list.get(1)).toBe(37);
    });

    test('size', () => {
      const list = new UFNumberList();
      list.add(15);
      list.add(37);
      expect(list.size).toBe(2);
    });
  });

  describe('list with addList', () => {
    test('get()', () => {
      const list = new UFNumberList();
      list.addList([25, 47]);
      expect(list.get(0)).toBe(25);
      expect(list.get(1)).toBe(47);
      expect(() => list.get(3)).toThrow();
    });

    test('size', () => {
      const list = new UFNumberList();
      list.addList([25, 47]);
      expect(list.size).toBe(2);
    });
  });

  describe('list with addList(UFNumberList)', () => {
    test('get()', () => {
      const list = new UFNumberList();
      list.addList(new UFNumberList(95, 32));
      expect(list.get(0)).toBe(95);
      expect(list.get(1)).toBe(32);
      expect(() => list.get(3)).toThrow();
    });

    test('size', () => {
      const list = new UFNumberList();
      list.addList(new UFNumberList(95, 32));
      expect(list.size).toBe(2);
    });
  });

  describe('list with add(x, x)', () => {
    test('get(0)', () => {
      const list = new UFNumberList();
      list.add(35, 57);
      expect(list.get(0)).toBe(35);
      expect(list.get(1)).toBe(57);
    });

    test('size', () => {
      const list = new UFNumberList();
      list.add(35, 57);
      expect(list.size).toBe(2);
    });
  });


  describe('list with four elements in constructor', () => {
    test('get(0)', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.get(0)).toBe(10);
    });

    test('get(1)', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.get(1)).toBe(20);
    });

    test('get(2)', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.get(2)).toBe(35);
    });

    test('get(3)', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.get(3)).toBe(55);
    });

    test('size', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.size).toBe(4);
    });

    test('empty', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.empty).toBeFalsy();
    });

    test('sum()', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.sum()).toBe(10 + 20 + 35 + 55);
    });

    test('min()', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.min()).toBe(10);
    });

    test('max()', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.max()).toBe(55);
    });

    test('average()', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(list.average()).toBe((10 + 20 + 35 + 55) / 4);
    });

    test('get(5)', () => {
      const list = new UFNumberList(10, 20, 35, 55);
      expect(() => list.get(5)).toThrow();
    });
  });
});
