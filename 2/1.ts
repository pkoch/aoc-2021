import { assertNever, input_reader } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";

const directions = [
  "forward",
  "down",
  "up",
] as const;

type Direction = typeof directions[number];

interface Movement {
  direction: Direction;
  n: number;
}

interface Position {
  depth: number;
  horizontal: number;
}

const isDirection = (s: string): s is Direction =>
  (directions as readonly string[]).includes(s);

const decodeMovement = (s: string): Movement => {
  const [direction, nS] = s.split(" ", 2);
  if (!isDirection(direction)) return assertNever(direction);

  return {
    direction,
    n: +new Number(nS),
  };
};

const applyMovement = (pos: Position, move: Movement): Position => {
  switch (move.direction) {
    case "forward":
      return { ...pos, horizontal: pos.horizontal + move.n };
    case "down":
      return { ...pos, depth: pos.depth + move.n };
    case "up":
      return { ...pos, depth: pos.depth - move.n };
    default:
      return assertNever({ pos, move });
  }
};

const a = (await input_reader(import.meta.resolve))
  .trim()
  .split("\n")
  .map(decodeMovement)
  .reduce(applyMovement, { depth: 0, horizontal: 0 })
  .thrush((_) => _.depth * _.horizontal);

export default a;

if (import.meta.main) {
  console.log(a);
}
