import {UFCallbackAction} from "../../src/UF/actions/UFCallbackAction";
import {UFCancellationTokenSource} from "../../src/UF/actions/UFCancellationTokenSource";

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