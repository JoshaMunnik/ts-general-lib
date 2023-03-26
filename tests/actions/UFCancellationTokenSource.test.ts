import {UFCancellationTokenSource} from "../../src/UF/actions/UFCancellationTokenSource";

describe('UFCancellationTokenSource', () => {
  describe('token', () => {
    test('get', () => {
      const source = new UFCancellationTokenSource();
      expect(source.token).not.toBeNull();
    });

    test('isCancellationRequested', () => {
      const source = new UFCancellationTokenSource();
      expect(source.token.isCancellationRequested).toBeFalsy();
    });

    test('NONE', () => {
      expect(UFCancellationTokenSource.NONE).not.toBeNull();
    });

    test('NONE.isCancellationRequested', () => {
      expect(UFCancellationTokenSource.NONE.isCancellationRequested).toBeFalsy();
    })
  });

  describe('cancel', () => {
    test('token cancelled', () => {
      const source = new UFCancellationTokenSource();
      const token = source.token;
      source.cancel();
      expect(token.isCancellationRequested).toBeTruthy();
    });

    test('source cancelled', () => {
      const source = new UFCancellationTokenSource();
      source.cancel();
      expect(source.isCancellationRequested).toBeTruthy();
    });
  });

  describe('linked', () => {
    test('token cancelled', () => {
      const first = new UFCancellationTokenSource();
      const second = new UFCancellationTokenSource(first.token);
      second.cancel();
      expect(second.token.isCancellationRequested).toBeTruthy();
      expect(first.token.isCancellationRequested).toBeFalsy();
    });

    test('other token cancelled', () => {
      const first = new UFCancellationTokenSource();
      const second = new UFCancellationTokenSource(first.token);
      first.cancel();
      expect(second.token.isCancellationRequested).toBeTruthy();
    });

    test('source cancelled', () => {
      const first = new UFCancellationTokenSource();
      const second = new UFCancellationTokenSource(first.token);
      second.cancel();
      expect(second.isCancellationRequested).toBeTruthy();
      expect(first.isCancellationRequested).toBeFalsy();
    });

    test('other source cancelled', () => {
      const first = new UFCancellationTokenSource();
      const second = new UFCancellationTokenSource(first.token);
      first.cancel();
      expect(second.isCancellationRequested).toBeTruthy();
    });
  });
})