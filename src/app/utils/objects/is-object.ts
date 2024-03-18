
/**
 * Check if an value is an Object, and not a primitive,array or date
 * doubles as an ts type-guard.
 * @param x unknown
 * @returns boolean
 */
export const isObject = (x: unknown): x is Object => {
  if (typeof x !== 'object') return false; // rules out all primitives,symbols, and functions
  if (x === null) return false;
  if (Array.isArray(x)) return false;
  if (x instanceof Date) return false; // a date is an object, but for most purposes, it should be threated as a primitive
  return true;
};

