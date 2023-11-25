import {UFDelayAction} from "../../src/actions/UFDelayAction";
import {UFCancellationTokenSource} from "../../src/actions/UFCancellationTokenSource";

describe('UFDelayAction', () => {
  describe('run', () => {
    test('result is true', async () => {
      const action = new UFDelayAction(100);
      const result = await action.run(UFCancellationTokenSource.NONE);
      expect(result).toBeTruthy();
    });

    test('100ms', async () => {
      const action = new UFDelayAction(100);
      const time = Date.now();
      await action.run(UFCancellationTokenSource.NONE);
      const length = Date.now() - time;
      expect(length).toBeGreaterThanOrEqual(100);
      expect(length).toBeLessThan(150);
    });

    test('200ms', async () => {
      const action = new UFDelayAction(200);
      const time = Date.now();
      await action.run(UFCancellationTokenSource.NONE);
      const length = Date.now() - time;
      expect(length).toBeGreaterThanOrEqual(200);
      expect(length).toBeLessThan(250);
    });
  });

  describe('progress', () => {
    test('0.0', () => {
      const action = new UFDelayAction(100);
      expect(action.progress).toBe(0);
    });

    test('1.0', async () => {
      const action = new UFDelayAction(100);
      await action.run(UFCancellationTokenSource.NONE);
      expect(action.progress).toBe(1.0);
    });
  })
});