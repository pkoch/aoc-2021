import { assertNever, input_reader } from "../libtapete.ts";
import "../langExts/Object/thrush.ts"

const zip = <T>(...arrays: T[][]): T[][] => {
  const result: T[][] = [];
  for(const arr of arrays){
    for(const [i, element] of arr.entries()) {
      if(!result[i]) result[i] = [];
      result[i].push(element);
    }
  }
  return result;
}

const transpose = <T>(a: T[][]): T[][] => {
  return zip(...a);
}

const tally = (entries: string[]): Record<string, number> => {
  const result: Record<string, number> = {}
  for(const entry of entries){
    result[entry] ||= 0;
    result[entry]++;
  }
  return result;
}

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .map(l => l.split(''))
  .thrush(transpose)
  .map(tally)
  .map(Object.entries)
  .map(l => l.toSorted(([_vA, freqA], [_vB, freqB]) => freqA - freqB).map(([k, v]) => k))
  .thrush(transpose)
  .map(l => parseInt(l.join(''), 2))
  .thrush(([a, b]) => a * b)

export default a;

if (import.meta.main) {
  console.log(a);
}
