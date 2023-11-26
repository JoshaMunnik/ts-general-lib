import {UFModel} from "../../src/models/UFModel";

class TestModel extends UFModel {
  private m_property1: number = 0;
  private m_property2: string = '';

  get property1(): number {
    return this.m_property1;
  }

  set property1(value: number) {
    this.processPropertyValue('property1', this.m_property1, value, value => this.m_property1 = value);
  }

  get property2(): string {
    return this.m_property2;
  }

  set property2(value: string) {
    this.processPropertyValue('property2', this.m_property2, value, value => this.m_property2 = value);
  }
}

describe('UFModel', () => {

  describe('lock', () => {
    test('lock/unlock', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.lock();
      data.property1 = data.property1 + 1;
      data.unlock();
      expect(listener).toBeCalled();
    });

    test('lock', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.lock();
      data.property1 = data.property1 + 1;
      expect(listener).not.toBeCalled();
    });
  });

  describe('addChangeListener', () => {
    test('single property', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledWith(data, ['property1']);
    });

    test('multiple properties', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.lock();
      data.property1 = data.property1 + 1;
      data.property2 = data.property2 + '1';
      data.unlock();
      expect(listener).toBeCalledWith(data, ['property1', 'property2']);
    });
  });

  describe('removeChangeListener', () => {
    test('property', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledWith(data, ['property1']);
      expect(listener).toBeCalledTimes(1);
      data.removeChangeListener(listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledTimes(1);
    });
  });

  describe('addPropertyChangeListener', () => {
    test('property', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addPropertyChangeListener('property1', listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledWith(data, 'property1');
    });

    test('other property', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addPropertyChangeListener('property1', listener);
      data.property2 = data.property2 + '1';
      expect(listener).not.toBeCalled();
    });

    test('multiple properties', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addPropertyChangeListener('property2', listener);
      data.lock();
      data.property1 = data.property1 + 1;
      data.property2 = data.property2 + '1';
      data.unlock();
      expect(listener).toBeCalledWith(data, 'property2');
    });
  });

  describe('removePropertyChangeListener', () => {
    test('property', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addPropertyChangeListener('property1', listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledWith(data, 'property1');
      expect(listener).toBeCalledTimes(1);
      data.removePropertyChangeListener('property1', listener);
      data.property1 = data.property1 + 1;
      expect(listener).toBeCalledTimes(1);
    });
  });

  describe('hasChanged', () => {
    test('unchanged', () => {
      const data = new TestModel();
      expect(data.hasChanged()).toBeFalsy();
    });

    test('lock', () => {
      const data = new TestModel();
      data.lock();
      data.property1 = data.property1 + 1;
      expect(data.hasChanged()).toBeTruthy();
    });

    test('lock/unlock', () => {
      const data = new TestModel();
      data.lock();
      data.property1 = data.property1 + 1;
      data.unlock();
      expect(data.hasChanged()).toBeFalsy();
    });
  });

  describe('isDirty', () => {
    test('false', () => {
      const data = new TestModel();
      expect(data.isDirty()).toBeFalsy();
    });

    test('true', () => {
      const data = new TestModel();
      data.property1 += 1;
      expect(data.isDirty()).toBeTruthy();
    });
  });

  describe('getDirtyProperties', () => {
    test('empty', () => {
      const data = new TestModel();
      expect(data.getDirtyProperties()).toHaveLength(0);
    });

    test('single, one change', () => {
      const data = new TestModel();
      data.property1 += 1;
      expect(data.getDirtyProperties()).toEqual(['property1']);
    });

    test('single, two changes', () => {
      const data = new TestModel();
      data.property1 += 1;
      data.property1 += 1;
      expect(data.getDirtyProperties()).toEqual(['property1']);
    });

    test('multiple', () => {
      const data = new TestModel();
      data.property1 += 1;
      data.property2 += '1';
      expect(data.getDirtyProperties()).toEqual(['property1', 'property2']);
    });
  });

  describe('clearDirty', () => {
    test('call', () => {
      const data = new TestModel();
      data.property1 += 1;
      data.clearDirty();
      expect(data.isDirty()).toBeFalsy();
    })
  });

  describe('isValidPropertyValue', () => {
    // todo isValidPropertyValue
  });

  describe('getPropertyValue', () => {
    test('property1', () => {
      const data = new TestModel();
      data.property1 = 1;
      expect(data.getPropertyValue<number>('property1')).toEqual(1);
    });

    test('property2', () => {
      const data = new TestModel();
      data.property2 = 'test';
      expect(data.getPropertyValue<string>('property2')).toEqual('test');
    });
  });

  describe('setPropertyValue', () => {
    test('property1', () => {
      const data = new TestModel();
      data.setPropertyValue('property1', 1);
      expect(data.property1).toEqual(1);
    });

    test('property2', () => {
      const data = new TestModel();
      data.setPropertyValue('property2', 'test');
      expect(data.property2).toEqual('test');
    });

    test('onChange', () => {
      const data = new TestModel();
      const listener = jest.fn();
      data.addChangeListener(listener);
      data.setPropertyValue('property1', 1);
      expect(listener).toBeCalledWith(data, ['property1']);
    });
  });
});