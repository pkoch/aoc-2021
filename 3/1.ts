import { input_reader, transpose } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";

export const sortedByFreq = (entries: string[]): string[] => {
  const tally: Record<string, number> = {};
  for (const entry of entries) {
    tally[entry] ||= 0;
    tally[entry]++;
  }
  return Object.entries(tally)
    .toSorted(([_vA, freqA], [_vB, freqB]) => freqA - freqB)
    .map(([k, _v]) => k);
};

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .map((l) => l.split(""))
  .thrush(transpose)
  .map(sortedByFreq)
  .thrush(transpose)
  .map((l) => parseInt(l.join(""), 2))
  .thrush(([a, b]) => a * b);

export default a;

if (import.meta.main) {
  console.log(a);
}
