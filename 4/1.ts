import { assertNever, input_reader, transpose } from "../libtapete.ts";
import "../langExts/Array/any.ts";
import "../langExts/Array/all.ts";
import "../langExts/Array/partition.ts";

export type Board = (number | null)[][];

export const isWinner = (board: Board): boolean => {
  return board.concat(transpose(board)).any((l) => l.all((c) => c === null));
};

export const withMarked = (board: Board, n: number): Board => {
  return board.map((l) => l.map((c) => c === n ? null : c));
};

export const playUntilWin = (
  boards: Board[],
  balls: number[],
): [Board[], number, Board[], number[]] => {
  while (true) {
    if (!balls.length) throw assertNever({ balls });
    const ball = balls.shift()!;

    let winners;
    [winners, boards] = boards
      .map((b) => withMarked(b, ball))
      .partition(isWinner);

    if (winners.length) return [winners, ball, boards, balls];
  }
};

export const score = (board: Board, ball: number): number => {
  return (board.flat(1).filter((l) => l !== null) as number[]).reduce((a, b) =>
    a + b
  ) * ball;
};

export const decode = (s: string): [number[], Board[]] => {
  const [ballsS, ...boardsS] = s.trim().split("\n\n");

  const balls: number[] = ballsS.split(",").map((bS) => +new Number(bS));
  const boards: Board[] = boardsS.map((bS) =>
    bS.split("\n").map((lS) =>
      lS.split(" ").filter((s) => s).map((cS) => +new Number(cS))
    )
  );

  return [balls, boards];
};

const [balls, boards] = decode(await input_reader(import.meta.resolve));

const [[winner], ball] = playUntilWin(boards, balls);

const a = score(winner, ball);

export default a;

if (import.meta.main) {
  console.log(a);
}
