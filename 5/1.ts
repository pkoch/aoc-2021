import { assertNever, input_reader, max, min } from "../libtapete.ts";
import "../langExts/Object/thrush.ts";

export interface Point {
  x: number;
  y: number;
}

export const decodePoint = (s: string): Point => {
  const as = s.split(",");
  if (as.length != 2) return assertNever(s);

  return {
    x: +new Number(as[0]),
    y: +new Number(as[1]),
  };
};

export interface Line {
  start: Point;
  end: Point;
}

export const decodeLine = (s: string): Line => {
  const as = s.split(" -> ");
  if (as.length != 2) return assertNever(s);

  return {
    start: decodePoint(as[0]),
    end: decodePoint(as[1]),
  };
};

export const horizontalOrVertical = (l: Line): boolean =>
  l.start.x == l.end.x || l.start.y == l.end.y;

export type Board = Record<string, number>;

export const applyLine = (b: Board, l: Line): Board => {
  const dx = l.end.x - l.start.x;
  const dy = l.end.y - l.start.y;

  if (
    dx != 0 && dy != 0 && Math.abs(dx) != Math.abs(dy)
  ) return assertNever({ dx, dy });

  const ix = Math.sign(dx);
  const iy = Math.sign(dy);

  const minX = min(l.start.x, l.end.x);
  const minY = min(l.start.y, l.end.y);
  const maxX = max(l.start.x, l.end.x);
  const maxY = max(l.start.y, l.end.y);

  for (
    let x = l.start.x, y = l.start.y;
    minX <= x && x <= maxX && minY <= y && y <= maxY;
    x += ix, y += iy
  ) {
    const key = `${x},${y}`;
    b[key] ||= 0;
    b[key] += 1;
  }

  return b;
};

export const decode = (s: string): Line[] =>
  s
    .trim()
    .split("\n")
    .map(decodeLine);

export const countDangerous = (b: Board): number =>
  b
    .thrush(Object.values)
    .filter((v) => v >= 2)
    .length;

const map = decode(await input_reader(import.meta.resolve))
  .filter(horizontalOrVertical)
  .reduce(applyLine, {});

const a = countDangerous(map);

export default a;

if (import.meta.main) {
  console.log(a);
}
