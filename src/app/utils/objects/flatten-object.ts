import { isObject } from './is-object';

export const flattenObject = (
  obj: Record<string, any>,
  parent = '',
  res = {} as Record<string, unknown>
) => {
  for (let key in obj) {
    let propName = parent ? parent + '.' + key : key;
    const value = obj[key];
    if (isObject(value)) {
      flattenObject(value, propName, res);
    } else if (Array.isArray(value)) {
      flattenArray(value, propName, res);
    } else {
      res[propName] = obj[key];
    }
  }
  return res;
};

const flattenArray = (
  arr: any[],
  parent = '',
  res = {} as Record<string, unknown>
) => {
  arr.forEach((value, index) => {
    const propName = parent ? `${parent}.${index}` : `${index}`;
    if (isObject(value)) {
      flattenObject(value, propName, res);
    } else if (Array.isArray(value)) {
      flattenArray(value, propName, res);
    } else {
      res[propName] = value;
    }
  });
  return res;
};
