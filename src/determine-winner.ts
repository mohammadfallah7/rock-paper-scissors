import { Move } from "./main";

export function determineWinner(playerMove: Move, computerMove: Move): string {
  if (playerMove === computerMove) return "TIE!";

  if (
    (playerMove === "rock" && computerMove === "scissors") ||
    (playerMove === "paper" && computerMove === "rock") ||
    (playerMove === "scissors" && computerMove === "paper")
  )
    return "YOU WON!";

  return "COMPUTER WON!";
}
