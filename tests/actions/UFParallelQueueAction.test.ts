// noinspection ES6MissingAwait

import {UFParallelQueueAction} from "../../src/actions/UFParallelQueueAction";
import {DelayedCallbackAction} from "../support/DelayedCallbackAction";
import {UFCancellationTokenSource} from "../../src/actions/UFCancellationTokenSource";
import {UFTypescript} from "../../src/tools/UFTypescript";

describe('UFParallelQueueAction', () => {
  describe('run', () => {
    test('no actions', async () => {
      const action = new UFParallelQueueAction(4);
      await action.run(UFCancellationTokenSource.NONE);
    });

    test('single action', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(4, new DelayedCallbackAction(100, () => started++, () => done++));
      await action.run(UFCancellationTokenSource.NONE);
      expect(done).toBe(1);
    });

    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(
        4,
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++)
      );
      await action.run(UFCancellationTokenSource.NONE);
      expect(done).toBe(2);
    });
  });

  describe('getRunningActions()', () => {
    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const actions = [
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++)
      ];
      const action = new UFParallelQueueAction(
        4,
        ...actions
      );
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(started).toBe(2);
      expect(done).toBe(0);
      expect(action.getRunningActions()).toEqual(actions);
      await UFTypescript.delay(200);
      expect(done).toBe(2);
    });

    test('four actions', async () => {
      let done = 0;
      let started = 0;
      const actions = [
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
      ];
      const action = new UFParallelQueueAction(
        2,
        ...actions
      );
      action.run(UFCancellationTokenSource.NONE);
      expect(action.getRunningActions()).toEqual(actions.slice(0, 2));
      expect(started).toBe(2);
      await UFTypescript.delay(120);
      expect(action.getRunningActions()).toEqual([actions[1], actions[2]]);
      expect(done).toBe(1);
      expect(started).toBe(3);
      await UFTypescript.delay(120);
      expect(action.getRunningActions()).toEqual([actions[3]]);
      expect(done).toBe(3);
      expect(started).toBe(4);
      await UFTypescript.delay(220);
      expect(done).toBe(4);
    });
 });

  describe('running', () => {
    test('one action', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(4, new DelayedCallbackAction(100, () => started++, () => done++));
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.running).toBeTruthy();
      await UFTypescript.delay(70);
      expect(action.running).toBeFalsy();
      expect(done).toBe(1);
    });

    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(
        4,
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++)
      );
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.running).toBeTruthy();
      await UFTypescript.delay(170);
      expect(action.running).toBeFalsy();
      expect(done).toBe(2);
    });
  });

  describe('runningCount', () => {
    test('one action', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(4, new DelayedCallbackAction(100, () => started++, () => done++));
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.runningCount).toBe(1);
      await UFTypescript.delay(70);
      expect(action.runningCount).toBe(0);
      expect(done).toBe(1);
    });

    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(
        4,
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++)
      );
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.runningCount).toBe(2);
      await UFTypescript.delay(70);
      expect(action.runningCount).toBe(1);
      await UFTypescript.delay(100);
      expect(action.runningCount).toBe(0);
      expect(done).toBe(2);
    });
  });

  describe('progress', () => {
    test('one action', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(4, new DelayedCallbackAction(100, () => started++, () => done++));
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.progress).toBe(0);
      await UFTypescript.delay(70);
      expect(action.progress).toBe(1.0);
      expect(done).toBe(1);
    });

    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(
        4,
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++)
      );
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.progress).toBe(0);
      await UFTypescript.delay(70);
      expect(action.progress).toBe(0.5);
      await UFTypescript.delay(100);
      expect(action.progress).toBe(1.0);
      expect(done).toBe(2);
    });
  });

  describe('progressWeight', () => {
    test('two actions', async () => {
      let done = 0;
      let started = 0;
      const action = new UFParallelQueueAction(
        4,
        new DelayedCallbackAction(100, () => started++, () => done++, 1),
        new DelayedCallbackAction(200, () => started++, () => done++, 3)
      );
      action.run(UFCancellationTokenSource.NONE);
      await UFTypescript.delay(50);
      expect(action.progress).toBe(0);
      await UFTypescript.delay(70);
      expect(action.progress).toBe(0.25);
      await UFTypescript.delay(100);
      expect(action.progress).toBe(1.0);
      expect(done).toBe(2);
    });
  });

  describe('cancel', () => {
    test('four actions', async () => {
      const tokenSource = new UFCancellationTokenSource();
      let done = 0;
      let started = 0;
      const actions = [
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
      ];
      const action = new UFParallelQueueAction(
        2,
        ...actions
      );
      action.run(tokenSource.token);
      await UFTypescript.delay(150);
      expect(started).toBe(3);
      expect(done).toBe(1);
      tokenSource.cancel();
      await UFTypescript.delay(150);
      expect(action.running).toBeFalsy();
      expect(started).toBe(3);
      expect(done).toBe(3);
    });
  });

});
