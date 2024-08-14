import { Move } from "./main";

export function moveIcon(
  playerMove: Move,
  playerMoveEl: HTMLElement,
  computerMove: Move,
  computerMoveEl: HTMLElement
) {
  switch (playerMove) {
    case "rock":
      playerMoveEl.className = "fa-solid fa-hand-back-fist";
      break;
    case "paper":
      playerMoveEl.className = "fa-solid fa-hand";
      break;
    default:
      playerMoveEl.className = "fa-solid fa-hand-scissors";
      break;
  }
  switch (computerMove) {
    case "rock":
      computerMoveEl.className = "fa-solid fa-hand-back-fist";
      break;
    case "paper":
      computerMoveEl.className = "fa-solid fa-hand";
      break;
    default:
      computerMoveEl.className = "fa-solid fa-hand-scissors";
      break;
  }
}
