import "./output.css";
import { themeIcon } from "./theme-icon";
import { getComputerMove } from "./get-computer-move";
import { determineWinner } from "./determine-winner";
import { moveIcon } from "./move-icon";

export type Move = "rock" | "paper" | "scissors";
let playerScore = 0;
let computerScore = 0;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="play-view" class="container mx-auto h-screen relative pt-8 px-5 sm:px-0 flex items-center justify-between">
    <button id="play-btn" class="btn btn-primary btn-lg px-12">Play<button>
    <h1 class="text-4xl text-base-content text-left">Rock Paper Scissors with Compose</h1>
  </div>

  <div id="game-view" class="container mx-auto pt-8 px-5 sm:px-0 hidden">
    <div class="flex justify-between items-center gap-4">
      <h1 class="text-2xl text-base-content">Rock Paper Scissors with Compose</h1>
      <img id="toggle-theme" alt="Theme" class="cursor-pointer" />
    </div>

    <div class="flex items-center justify-center my-8">
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

    <h2 id="result" class="text-5xl text-center my-10"></h2>

    <div class="flex justify-around items-center">
      <i id="player-move" style="font-size: 56px"></i>
      <span>vs</span>
      <i id="computer-move" style="font-size: 56px"></i>
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
const playBtn = <HTMLButtonElement>document.querySelector("#play-btn");
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
  playerMoveEl.className = "fa-solid fa-question";
  computerMoveEl.className = "fa-solid fa-question";

  toggleTheme.addEventListener("click", (event) => {
    const theme = rootEl.getAttribute("data-theme");
    const newTheme = theme === "light" ? "dark" : "light";

    themeIcon(newTheme, event.target as HTMLElement);
    rootEl.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  });
});

playBtn.addEventListener("click", () => {
  const playView = <HTMLElement>document.querySelector("#play-view");
  const gameView = <HTMLElement>document.querySelector("#game-view");
  playView.classList.toggle("hidden");
  gameView.classList.toggle("hidden");
});

resetEl.addEventListener("click", () => {
  playerScore = 0;
  computerScore = 0;

  playerScoreEl.textContent = playerScore.toString();
  computerScoreEl.textContent = computerScore.toString();
  resultEl.textContent = "";
  playerMoveEl.className = "fa-solid fa-question";
  computerMoveEl.className = "fa-solid fa-question";
});

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

function playGame(playerMove: Move): void {
  const computerMove = getComputerMove();

  moveIcon(playerMove, playerMoveEl, computerMove, computerMoveEl);

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
