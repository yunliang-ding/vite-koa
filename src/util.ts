export const uuid = (size: number = 10) => {
  return Math.random()
    .toString(16)
    .substring(2, size + 2);
};