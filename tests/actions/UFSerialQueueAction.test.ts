// noinspection ES6MissingAwait

import {DelayedCallbackAction} from "../support/DelayedCallbackAction";
import {UFCancellationTokenSource} from "../../src/actions/UFCancellationTokenSource";
import {UFTypescript} from "../../src/tools/UFTypescript";
import {UFSerialQueueAction} from "../../src/actions/UFSerialQueueAction";

describe('UFSerialQueueAction', () => {
  describe('run', () => {
    test('four actions', async () => {
      let done = 0;
      let started = 0;
      const actions = [
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
      ];
      const action = new UFSerialQueueAction(
        ...actions
      );
      action.run(UFCancellationTokenSource.NONE);
      expect(action.getRunningActions()).toEqual([actions[0]]);
      expect(started).toBe(1);
      await UFTypescript.delay(120);
      expect(action.getRunningActions()).toEqual([actions[1]]);
      expect(done).toBe(1);
      expect(started).toBe(2);
      await UFTypescript.delay(220);
      expect(action.getRunningActions()).toEqual([actions[2]]);
      expect(done).toBe(2);
      expect(started).toBe(3);
      await UFTypescript.delay(120);
      expect(action.getRunningActions()).toEqual([actions[3]]);
      expect(done).toBe(3);
      expect(started).toBe(4);
      await UFTypescript.delay(220);
      expect(action.running).toBeFalsy();
      expect(done).toBe(4);
    });
  });

  describe('cancel', () => {
    test('four actions', async () => {
      let done = 0;
      let started = 0;
      const tokenSource = new UFCancellationTokenSource();
      const actions = [
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
        new DelayedCallbackAction(100, () => started++, () => done++),
        new DelayedCallbackAction(200, () => started++, () => done++),
      ];
      const action = new UFSerialQueueAction(
        ...actions
      );
      action.run(tokenSource.token);
      expect(started).toBe(1);
      await UFTypescript.delay(120);
      expect(done).toBe(1);
      expect(started).toBe(2);
      await UFTypescript.delay(120);
      tokenSource.cancel();
      await UFTypescript.delay(120);
      expect(done).toBe(2);
      expect(started).toBe(2);
      expect(action.running).toBeFalsy();
    });
  });

});