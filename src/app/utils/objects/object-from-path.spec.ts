import { objectFromPath } from './object-from-path';

describe('Objects from path', () => {
  it('should create an object from a path', () => {
    expect(objectFromPath('a.b.c', 1)).toEqual({ a: { b: { c: 1 } } });
  });
  it('should create an object from a path with an array', () => {
    expect(objectFromPath('a.0.b', 1)).toEqual({ a: [{ b: 1 }] });
  });
  it('should create an object from a path with an array and a number', () => {
    expect(objectFromPath('a.0.b.1', 1)).toEqual({ a: [{ b: [undefined, 1] }] });
  });
  it('should create an object from a path with an array and a number', () => {
    expect(objectFromPath('a[0].b[1]', 1)).toEqual({ a: [{ b: [undefined, 1] }] });
  });
  it('should create an array from a path with an array number', () => {
    expect(objectFromPath('[0]', 1)).toEqual([1]);
  });
  it('should create an array from a path with only a number', () => {
    expect(objectFromPath('0', 2)).toEqual([2]);
  });
  it('should create an sparse array from a path with only a number', () => {
    expect(objectFromPath('2', 3)).toEqual([, , 3]);
  });
  it('should create an sparse array with object from a path that starts with a number', () => {
    expect(objectFromPath('[1].a.b', 'c')).toEqual([, { a: { b: 'c' } }]);
  });
  it('should throw on an invalid path', () => {
    expect(() => objectFromPath('', 1)).toThrowError(`[objectFromPath] Invalid path: a path can not be empty`);
    expect(() => objectFromPath('.', 1)).toThrowError(`[objectFromPath] Invalid path: a path can not be empty`);
    expect(() => objectFromPath('a. .b', 1)).toThrowError(
      `[objectFromPath] Invalid path: "a. .b", should not contain whitespace between the dots or brackets`
    );
    expect(() => objectFromPath('a..b', 1)).toThrowError(
      `[objectFromPath] Invalid path: "a..b", it contains two dots in a row`
    );
    expect(() => objectFromPath('[ ]', 1)).toThrowError(
      `[objectFromPath] Invalid path: "[ ]", should not contain whitespace between the dots or brackets`
    );
    expect(() => objectFromPath('a.[ \n].b', 1)).toThrowError(
      `[objectFromPath] Invalid path: "a.[ \n].b", should not contain whitespace between the dots or brackets`
    );
  });
});
