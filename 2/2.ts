import { assertNever, input_reader } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";
import { decodeMovement, Movement } from "./1.ts";

interface Position {
  depth: number;
  horizontal: number;
  aim: number;
}

const applyMovement = (pos: Position, move: Movement): Position => {
  switch (move.direction) {
    case "down":
      return { ...pos, aim: pos.aim + move.n };
    case "up":
      return { ...pos, aim: pos.aim - move.n };
    case "forward":
      return {
        ...pos,
        horizontal: pos.horizontal + move.n,
        depth: pos.depth + pos.aim * move.n,
      };
    default:
      return assertNever({ pos, move });
  }
};

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .map(decodeMovement)
  .reduce(applyMovement, { depth: 0, horizontal: 0, aim: 0 })
  .thrush((_) => _.depth * _.horizontal);

export default a;

if (import.meta.main) {
  console.log(a);
}
