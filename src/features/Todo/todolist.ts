export const validColor = (color: string): boolean => {
  return color.length === 7 && color.startsWith("#");
};
