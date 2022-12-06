import { input_reader } from "../libtapete.ts";
import "../langExts/Array/windows.ts";

const add = (a: number, b: number): number => a + b;

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .map((l) => +new Number(l))
  .windows(3)
  .map((l) => l.reduce(add))
  .windows(2)
  .filter(([a, b]) => a < b)
  .length;

export default a;

if (import.meta.main) {
  console.log(a);
}
