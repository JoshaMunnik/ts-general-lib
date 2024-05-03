import {UFService} from "../../src/services/UFService.js";

describe('UFService', () => {
  describe('registerFactory', () => {
    test('register factory', () => {
      const factory = () => ({});
      UFService.registerFactory('test', factory);
    });

    test('create instance', () => {
      const factory = () => ({});
      UFService.registerFactory('test', factory);
      const instance = UFService.getInstance('test');
      expect(instance).toBeDefined();
    });

    test('create two instances', () => {
      const factory = () => ({});
      UFService.registerFactory('test', factory);
      const firstInstance = UFService.getInstance('test');
      const secondInstance = UFService.getInstance('test');
      expect(firstInstance).not.toBe(secondInstance);
    });
  });

  describe('registerSingletonFactory', () => {
    test('register factory', () => {
      const factory = () => ({});
      UFService.registerSingletonFactory('test', factory);
    });

    test('create instance', () => {
      const factory = () => ({});
      UFService.registerSingletonFactory('test', factory);
      const instance = UFService.getInstance('test');
      expect(instance).toBeDefined();
    });

    test('create two instances', () => {
      const factory = () => ({});
      UFService.registerSingletonFactory('test', factory);
      const firstInstance = UFService.getInstance('test');
      const secondInstance = UFService.getInstance('test');
      expect(firstInstance).toBe(secondInstance);
    });
  });

  describe('registerConstructor', () => {
    test('register constructor', () => {
      class Test {
      }
      UFService.registerConstructor('test', Test);
    });

    test('create instance', () => {
      class Test {
      }
      UFService.registerConstructor('test', Test);
      const instance = UFService.getInstance<Test>('test');
      expect(instance).toBeDefined();
      expect(instance).toBeInstanceOf(Test);
    });

    test('create two instances', () => {
      class Test {
      }
      UFService.registerConstructor('test', Test);
      const firstInstance = UFService.getInstance<Test>('test');
      const secondInstance = UFService.getInstance<Test>('test');
      expect(firstInstance).not.toBe(secondInstance);
    });
  });

  describe('registerSingletonConstructor', () => {
    test('register constructor', () => {
      class Test {
      }
      UFService.registerSingletonConstructor('test', Test);
    });

    test('create instance', () => {
      class Test {
      }
      UFService.registerSingletonConstructor('test', Test);
      const instance = UFService.getInstance<Test>('test');
      expect(instance).toBeDefined();
      expect(instance).toBeInstanceOf(Test);
    });

    test('create two instances', () => {
      class Test {
      }
      UFService.registerSingletonConstructor('test', Test);
      const firstInstance = UFService.getInstance<Test>('test');
      const secondInstance = UFService.getInstance<Test>('test');
      expect(firstInstance).toBe(secondInstance);
    });
  });

  describe('registerStatic', () => {
    test('register factory', () => {
      const service = {};
      UFService.registerStatic('test', service);
    });

    test('create instance', () => {
      const service = {};
      UFService.registerStatic('test', service);
      const instance = UFService.getInstance('test');
      expect(instance).toBeDefined();
      expect(instance).toBe(service);
    });

    test('create two instances', () => {
      const service = {};
      UFService.registerStatic('test', service);
      const firstInstance = UFService.getInstance('test');
      const secondInstance = UFService.getInstance('test');
      expect(firstInstance).toBe(secondInstance);
    });
  });

  describe('service injection', () => {
    test('inject constructor service', () => {
      class TestClass {
      }

      type TestService = {
        service: TestClass;
      }

      const TestFactory = (anInstance: TestClass): TestService => ({
        service: anInstance
      });

      UFService.registerConstructor('testClass', TestClass);
      UFService.registerFactory('service', TestFactory, ['testClass']);
      const instance = UFService.getInstance<TestService>('service');
      expect(instance).toBeDefined();
      expect(instance.service).toBeDefined();
      expect(instance.service).toBeInstanceOf(TestClass);
    });
  });

});