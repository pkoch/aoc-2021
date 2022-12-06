declare global {
  interface Array<T> {
    partition: (fn: (t: T) => boolean) => [T[], T[]];
  }
}

Array.prototype.partition = function <T>(
  this: T[],
  fn: (t: T) => boolean,
): [T[], T[]] {
  const result = [[], []] as [T[], T[]];
  for (const el of this) {
    (fn(el) ? result[0] : result[1]).push(el);
  }
  return result;
};
