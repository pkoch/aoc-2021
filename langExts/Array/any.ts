declare global {
  interface Array<T> {
    any: (fn: (t: T) => boolean) => boolean;
  }
}

Array.prototype.any = function <T>(this: T[], fn: (t: T) => boolean): boolean {
  for (const el of this) {
    if (fn(el)) return true;
  }
  return false;
};
