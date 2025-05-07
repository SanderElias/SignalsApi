import { flattenObject } from './flatten-object';

describe('flattenObject', () => {
  it('should flatten an object correctly', () => {
    const date = new Date();
    const obj = {
      a: 1,
      b: {
        c: 2,
        d: {
          e: [1, 2, 3],
        },
        f: undefined
      },
      f: [4, 5, 6, , 7],
      date,

    };
    const expected = {
      a: 1,
      'b.c': 2,
      'b.d.e.0': 1,
      'b.d.e.1': 2,
      'b.d.e.2': 3,
      'f.0': 4,
      'f.1': 5,
      'f.2': 6,
      'f.4': 7,
      'date': date,
    };
    expect(flattenObject(obj)).toEqual(expected);
  });

  it('should return an empty object if input is empty', () => {
    const obj = {};
    const expected = {};
    expect(flattenObject(obj)).toEqual(expected);
  });
});
