import { assertNever, input_reader } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";
import { sortedByFreq } from "./1.ts";

const first = <A>(a: A[]): A => a[0];
const last = <A>(a: A[]): A => a.at(-1)!;

const finderProc = (
  picker: (as: string[]) => string,
  lines: string[],
  nthDigit = 0,
): string => {
  if (lines.length < 1) return assertNever({ picker, lines, nthDigit });
  if (lines.length == 1) return lines[0];
  if (nthDigit > lines[0].length) return assertNever({ nthDigit });

  const targetDigit = picker(sortedByFreq(lines.map((l) => l[nthDigit])));

  return finderProc(
    picker,
    lines.filter((l) => l[nthDigit] == targetDigit),
    nthDigit + 1,
  );
};

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .thrush((allLines) => [
    finderProc(first, allLines),
    finderProc(last, allLines),
  ])
  .map((s) => parseInt(s, 2))
  .thrush(([a, b]) => a * b);

export default a;

if (import.meta.main) {
  console.log(a);
}
