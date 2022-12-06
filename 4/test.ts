import { assertEquals } from "https://deno.land/std@0.167.0/testing/asserts.ts";

import a1, { isWinner, playUntilWin, score, withMarked } from "./1.ts";
// import a2 from "./2.ts";

const boardUnfilled = [
  [1, 2],
  [3, 4],
];
const boardPartiallyFilled = [
  [1, null],
  [3, 4],
];
const boardDiagonallyFilled = [
  [1, null],
  [null, 4],
];
const boardLineFilled = [
  [null, null],
  [3, 4],
];
const boardColumnFilled = [
  [1, null],
  [3, null],
];

Deno.test({
  name: "1/isWinner",
  fn() {
    ([
      [boardUnfilled, false],
      [boardPartiallyFilled, false],
      [boardDiagonallyFilled, false],
      [boardLineFilled, true],
      [boardColumnFilled, true],
    ] as const).map(([board, result]) => assertEquals(isWinner(board), result));
  },
});

Deno.test({
  name: "1/score",
  fn() {
    ([
      [boardUnfilled, 1, 10],
      [boardPartiallyFilled, 1, 8],
      [boardDiagonallyFilled, 1, 5],
      [boardLineFilled, 1, 7],
      [boardColumnFilled, 1, 4],
      [boardUnfilled, 2, 20],
      [boardPartiallyFilled, 2, 16],
      [boardDiagonallyFilled, 2, 10],
      [boardLineFilled, 2, 14],
      [boardColumnFilled, 2, 8],
    ] as const).map(([board, ball, result]) =>
      assertEquals(score(board, ball), result)
    );
  },
});

Deno.test({
  name: "1/withMarked",
  fn() {
    ([
      [boardUnfilled, 2, boardPartiallyFilled],
      [boardPartiallyFilled, 1, boardLineFilled],
      [boardPartiallyFilled, 3, boardDiagonallyFilled],
      [boardPartiallyFilled, 4, boardColumnFilled],
    ] as const).map(([board, ball, result]) =>
      assertEquals(withMarked(board, ball), result)
    );
  },
});

Deno.test({
  name: "1/playUntilWin",
  fn() {
    const balls = [7, 4, 9, 5, 11, 17, 23, 2, 0, 14, 21, 24, 25];
    const boards = [[
      [14, 21, 17, 24, 4],
      [10, 16, 15, 9, 19],
      [18, 8, 23, 26, 20],
      [22, 11, 13, 6, 5],
      [2, 0, 12, 3, 7],
    ]];
    const [winner, ball] = playUntilWin(boards, balls);
    assertEquals(score(winner, ball), 4512);
  },
});

Deno.test({
  name: "1",
  fn() {
    assertEquals(a1, 29440);
  },
});

// Deno.test({
//   name: "2",
//   fn() {
//     assertEquals(a2, 482500);
//   },
// });
