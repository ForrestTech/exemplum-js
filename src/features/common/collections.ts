export const singleOrDefault = <T>(
  array: T[],
  selector: (item: T) => boolean
): T | undefined => {
  return array.filter(selector)[0];
};

export const firstOrDefault = <T>(
  array: T[],
  selector: (item: T) => boolean
): T | undefined => {
  return array.find(selector) || undefined;
};

export const sum = <T>(array: T[], selector: (item: T) => number): number => {
  return array.reduce(
    (partialSum, current) => partialSum + selector(current),
    0
  );
};

export const group = <T>(
  array: T[],
  selector: (item: T) => string
): Map<string, T[]> => {
  const map = new Map();
  array.forEach((item) => {
    const key = selector(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export const distinct = <T>(
  array: T[],
  selector: (item: T) => string | number
): T[] => {
  return array.filter(
    (value, index, self) =>
      self.findIndex((x) => selector(x) === selector(value)) === index
  );
};

export const orderBy = <T>(
  array: T[],
  selector: (item: T) => string | number
): T[] => {
  return array.sort((current, next) => {
    return selector(current) > selector(next) ? 1 : -1;
  });
};

export const orderByDesc = <T>(
  array: T[],
  selector: (item: T) => string | number
): T[] => {
  return array.sort((current, next) => {
    return selector(current) > selector(next) ? -1 : 1;
  });
};
