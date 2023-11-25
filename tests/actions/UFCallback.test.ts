import {UFCallbackAction} from "../../src/actions/UFCallbackAction";
import {UFCancellationTokenSource} from "../../src/actions/UFCancellationTokenSource";

describe('UFCallback', () => {
  describe('run', () => {
    test('callback', async () => {
      let value = 1;
      const action = new UFCallbackAction(() => value++);
      await action.run(UFCancellationTokenSource.NONE);
      expect(value).toBe(2);
    });
  });
})