import { input_reader } from "../libtapete.ts";
import "../langExts/Array/any.ts";
import "../langExts/Array/all.ts";
import "../langExts/Array/partition.ts";
import { Board, decode, playUntilWin, score } from "./1.ts";

export const playUntilLastWin = (
  boards: Board[],
  balls: number[],
): [Board, number] => {
  let winners, ball;
  do {
    [winners, ball, boards, balls] = playUntilWin(boards, balls);
  } while (boards.length);

  return [winners.at(-1)!, ball];
};

const [balls, boards] = decode(await input_reader(import.meta.resolve));

const [winner, ball] = playUntilLastWin(boards, balls);

const a = score(winner, ball);

export default a;

if (import.meta.main) {
  console.log(a);
}
