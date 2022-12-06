import { input_reader } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";
import { applyLine, countDangerous, decode } from "./1.ts";

const a = decode(await input_reader(import.meta.resolve))
  .reduce(applyLine, {})
  .thrush(countDangerous);

export default a;

if (import.meta.main) {
  console.log(a);
}
