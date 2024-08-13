import { Move } from "./main";

export function getComputerMove(): Move {
  const moves: Move[] = ["rock", "paper", "scissors"];
  const randomIndex = Math.floor(Math.random() * moves.length);
  return moves[randomIndex];
}
