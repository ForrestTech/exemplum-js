export const pipe =
  <T>(...fns: Array<(arg: T) => T>) =>
  (value: T) =>
    fns.reduce((acc, fn) => fn(acc), value);

export const groupBy = <T>(array: T[], iteratee: (item: T) => string) => {
  const map = new Map();
  array.forEach((item) => {
    const key = iteratee(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
};

export const distinctBy = <T>(
  array: T[],
  selector: (item: T) => string
): T[] => {
  return array.filter(
    (value, index, self) =>
      self.findIndex((x) => selector(x) === selector(value)) === index
  );
};
