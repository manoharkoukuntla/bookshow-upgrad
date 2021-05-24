import { snakeCase, camelCase, isPlainObject } from 'lodash';

export const toSnakeCase = (object) => {
  if (Array.isArray(object)) return object.map((obj) => toSnakeCase(obj));
  else if (isPlainObject(object)) {
    return Object.keys(object).reduce(
      (result, key) => ({
        ...result,
        [snakeCase(key)]: toSnakeCase(object[key]),
      }),
      {}
    );
  }

  return object;
};

export const toCamelCase = (object) => {
  if (Array.isArray(object)) return object.map((obj) => toCamelCase(obj));
  else if (isPlainObject(object)) {
    return Object.keys(object).reduce(
      (result, key) => ({
        ...result,
        [camelCase(key)]: toCamelCase(object[key]),
      }),
      {}
    );
  }

  return object;
};
