import { isObject } from './is-object';

describe('isObject', () => {
  it('should return false for null', () => {
    expect(isObject(null)).toBe(false);
  });

  it('should return false for array', () => {
    expect(isObject([])).toBe(false);
  });

  it('should return false for date', () => {
    expect(isObject(new Date())).toBe(false);
  });

  it('should return false for primitive types', () => {
    expect(isObject(1)).toBe(false);
    expect(isObject('string')).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  it('should return true for object', () => {
    expect(isObject({})).toBe(true);
    expect(isObject(new Object())).toBe(true);
    const sample = new (class Sample {
      a = 1;
    })();
    expect(isObject(sample)).toBe(true);
  });
});
