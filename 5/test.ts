import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";
import { max, transpose } from "../libtapete.ts";

import a1, { applyLine, Board, decode, horizontalOrVertical } from "./1.ts";
import a2 from "./2.ts";

const exampleLines = decode(`
0,9 -> 5,9
8,0 -> 0,8
9,4 -> 3,4
2,2 -> 2,1
7,0 -> 7,4
6,4 -> 2,0
0,9 -> 2,9
3,4 -> 1,4
0,0 -> 8,8
5,5 -> 8,2
`);

Deno.test({
  name: "example/decode",
  fn() {
    assertEquals(
      exampleLines,
      [
        { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
        { start: { x: 8, y: 0 }, end: { x: 0, y: 8 } },
        { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
        { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
        { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
        { start: { x: 6, y: 4 }, end: { x: 2, y: 0 } },
        { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
        { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
        { start: { x: 0, y: 0 }, end: { x: 8, y: 8 } },
        { start: { x: 5, y: 5 }, end: { x: 8, y: 2 } },
      ],
    );
  },
});

Deno.test({
  name: "example/horizontalOrVertical",
  fn() {
    assertEquals(
      exampleLines.filter(horizontalOrVertical),
      [
        { start: { x: 0, y: 9 }, end: { x: 5, y: 9 } },
        { start: { x: 9, y: 4 }, end: { x: 3, y: 4 } },
        { start: { x: 2, y: 2 }, end: { x: 2, y: 1 } },
        { start: { x: 7, y: 0 }, end: { x: 7, y: 4 } },
        { start: { x: 0, y: 9 }, end: { x: 2, y: 9 } },
        { start: { x: 3, y: 4 }, end: { x: 1, y: 4 } },
      ],
    );
  },
});

Deno.test({
  name: "example/applyLine",
  fn() {
    assertEquals(
      applyLine({}, { start: { x: 1, y: 1 }, end: { x: 1, y: 3 } }),
      {
        "1,1": 1,
        "1,2": 1,
        "1,3": 1,
      },
    );

    assertEquals(
      applyLine({}, { start: { x: 9, y: 7 }, end: { x: 7, y: 7 } }),
      {
        "7,7": 1,
        "8,7": 1,
        "9,7": 1,
      },
    );
  },
});

const paint = (b: Board): string => {
  const coords = Object.keys(b).map((s) =>
    s.split(",").map((n) => +new Number(n))
  );
  const [maxX, maxY] = transpose(coords).map((l) => l.reduce(max));

  const result: number[][] = [];
  for (let y = 0; y <= maxY; y++) {
    result[y] = [];
    for (let x = 0; x <= maxX; x++) {
      result[y][x] = b[`${x},${y}`] || 0;
    }
  }
  return result.map((l) => l.map((c) => `${c || "."}`).join("")).join("\n");
};

const examplePicture = `
.......1..
..1....1..
..1....1..
.......1..
.112111211
..........
..........
..........
..........
222111....
`.trim();

Deno.test({
  name: "example/paint",
  fn() {
    assertEquals(
      paint(
        exampleLines.filter(horizontalOrVertical)
          .reduce(applyLine, {}),
      ),
      examplePicture,
    );
  },
});

Deno.test({
  name: "1",
  fn() {
    assertEquals(a1, 4826);
  },
});

Deno.test({
  name: "2",
  fn() {
    assertEquals(a2, 16793);
  },
});
