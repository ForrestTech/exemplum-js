export const parseEnum = (_enum: { [s: string]: string | number }) => {
  const allValues: (string | number)[] = Object.values(_enum);
  const properties: string[] = allValues.slice(
    0,
    allValues.length / 2
  ) as string[];
  const values: (string | number)[] = allValues.slice(allValues.length / 2);
  const enumObj: Record<string, number | string> = {};

  properties.forEach((prop, index) => {
    const val = values[index];

    if (val) {
      enumObj[prop] = val;
    }
  });

  return enumObj;
};

export const getEnumNamesAndValues = <T extends number | string>(_enum: {
  [s: string]: string | number;
}) => {
  const obj = parseEnum(_enum);
  return Object.keys(obj).map((n) => ({ name: n, value: obj[n] as T }));
};

export const getEnumNames = (_enum: { [s: string]: string | number }) => {
  if (Object.keys(_enum).length > 0) return Object.keys(_enum) as string[];
  return Object.keys(parseEnum(_enum)) as string[];
};

export const getEnumValues = <T extends number | string>(_enum: {
  [s: string]: string | number;
}) => {
  if (Object.keys(_enum).length > 0) return Object.values(_enum) as T[];
  return Object.values(parseEnum(_enum)) as T[];
};
