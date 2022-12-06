export const input_reader = async (resolve: (a: string) => string) =>
  (new TextDecoder("utf-8")).decode(
    await Deno.readFile(resolve("./input").split("://")[1]),
  );

export const assertNever = (o: unknown): never => {
  throw new Error(`Expected to be unreachable, got ${JSON.stringify(o)}`);
};

export const zip = <T>(...arrays: T[][]): T[][] => {
  const result: T[][] = [];
  for (const arr of arrays) {
    for (const [i, element] of arr.entries()) {
      if (!result[i]) result[i] = [];
      result[i].push(element);
    }
  }
  return result;
};

export const transpose = <T>(a: T[][]): T[][] => {
  return zip(...a);
};
