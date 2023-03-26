import {UFMath} from "../../src/UF/tools/UFMath";

describe('UFMath', () => {
  describe('rotate', () => {
     test('around center degrees', () => {
       const expected = {
         x: -30,
         y: -25
       };
       const {x, y} = UFMath.rotate(90, -25, 30);
       const actual = {x: Math.round(x), y: Math.round(y)};
       expect(actual).toMatchObject(expected);
     });
  });
});