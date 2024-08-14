import "./output.css";
import { themeIcon } from "./theme-icon";
import { getComputerMove } from "./get-computer-move";
import { determineWinner } from "./determine-winner";

export type Move = "rock" | "paper" | "scissors";
type LastGame = {
  playerScore: number;
  computerScore: number;
  result: string;
  playerMove: string;
  computerMove: string;
};
let playerScore = 0;
let computerScore = 0;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div class="container mx-auto py-8 px-5 sm:px-0">
    <div class="flex justify-between items-center gap-4">
      <h1 class="text-2xl text-base-content">Rock Paper Scissors with Compose</h1>
      <img id="toggle-theme" alt="Theme" class="cursor-pointer" />
    </div>

    <div class="flex items-center justify-center my-10">
      <button id="reset" class="text-lg">RESET THE TOUR</button>
    </div>

    <div class="flex justify-between items-center">
      <div class="flex flex-col items-center gap-3">
        <span>PLAYER SCORE:</span>
        <span id="player-score" class="text-2xl font-bold">${playerScore}</span>
      </div>
      <div class="flex flex-col items-center gap-3">
        <span>COMPUTER SCORE:</span>
        <span id="computer-score" class="text-2xl font-bold">${computerScore}</span>
      </div>
    </div>

    <h2 id="result" class="text-5xl text-center my-12"></h2>

    <div class="flex justify-around items-center">
      <div id="player-move"></div>
      <span>vs</span>
      <div id="computer-move"></div>
    </div>

    <div class="flex flex-col gap-8 mt-16">
      <p class="text-center text-base font-thin">Choose your move, rock paper or scissors?</p>
      <div id="user-actions" class="flex justify-around">
        <button class="btn btn-primary w-1/4 font-bold">ROCK</button>
        <button class="btn btn-primary w-1/4 font-bold">PAPER</button>
        <button class="btn btn-primary w-1/4 font-bold">SCISSORS</button>
      </div>
    </div>
  </div>
`;

const rootEl = <HTMLElement>document.querySelector("html");
const toggleTheme = <HTMLElement>document.querySelector("#toggle-theme");
const resetEl = <HTMLButtonElement>document.querySelector("#reset");
const playerScoreEl = <HTMLSpanElement>document.querySelector("#player-score");
const computerScoreEl = document.querySelector(
  "#computer-score"
) as HTMLSpanElement;
const resultEl = <HTMLHeadingElement>document.querySelector("#result");
const playerMoveEl = <HTMLElement>document.querySelector("#player-move");
const computerMoveEl = <HTMLElement>document.querySelector("#computer-move");
const userActions = <HTMLElement>document.querySelector("#user-actions");

document.addEventListener("DOMContentLoaded", () => {
  const currentTheme = localStorage.getItem("theme") ?? "light";
  themeIcon(currentTheme, toggleTheme);
  rootEl.setAttribute("data-theme", currentTheme);

  toggleTheme.addEventListener("click", (event) => {
    const theme = rootEl.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    themeIcon(newTheme, event.target as HTMLElement);
    rootEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});

function playGame(playerMove: Move): void {
  const computerMove = getComputerMove();

  playerMoveEl.textContent = playerMove;
  computerMoveEl.textContent = computerMove;

  const result = determineWinner(playerMove, computerMove);
  resultEl.textContent = result;

  if (result === "COMPUTER WON!") {
    computerScore = computerScore + 1;
    computerScoreEl.textContent = computerScore.toString();
  } else if (result === "YOU WON!") {
    playerScore = playerScore + 1;
    playerScoreEl.textContent = playerScore.toString();
  }
}

userActions.addEventListener("click", (event) => {
  const button = event.target as HTMLButtonElement;
  switch (button.textContent) {
    case "ROCK":
      playGame("rock");
      break;
    case "PAPER":
      playGame("paper");
      break;
    default:
      playGame("scissors");
      break;
  }
});
