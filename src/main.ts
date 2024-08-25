import "./output.css";
import { themeIcon } from "./theme-icon";
import { getComputerMove } from "./get-computer-move";
import { determineWinner } from "./determine-winner";
import { moveIcon } from "./move-icon";
import gameMusic from "./assets/gameMusic.mp3";
import loseMusic from "./assets/loseMusic.mp3";
import tieMusic from "./assets/tieMusic.mp3";
import winMusic from "./assets/winMusic.mp3";

export type Move = "rock" | "paper" | "scissors";
let playerScore = 0;
let computerScore = 0;
let countdownTimer = 30;

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div id="play-view" class="container mx-auto h-screen pt-8 px-5 sm:px-0 flex items-center justify-around gap-10">
    <button id="play-btn" class="btn btn-primary btn-lg px-12">Play<button>
    <h1 class="text-3xl text-base-content text-left">Rock Paper Scissors with Compose</h1>
  </div>

  <div id="game-view" class="container mx-auto pt-8 px-5 hidden">
    <audio id="game-audio" autoplay></audio>
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

    <h2 id="result" class="text-5xl text-center my-8"></h2>

    <div class="flex justify-around items-center relative">
      <i id="player-move" style="font-size: 56px"></i>
      <span class="absolute text-xl">vs</span>
      <i id="computer-move" style="font-size: 56px"></i>
    </div>

    <div class="flex flex-col gap-8 mt-12">
      <span id="timer" class="text-center font-extrabold text-3xl">${countdownTimer}</span>
      <p class="text-center text-base font-thin">Choose your move, rock paper or scissors?</p>
      <div id="user-actions" class="flex justify-around">
        <button class="btn btn-primary w-1/4 font-bold">ROCK</button>
        <button class="btn btn-primary w-1/4 font-bold">PAPER</button>
        <button class="btn btn-primary w-1/4 font-bold">SCISSORS</button>
      </div>
    </div>
  </div>

  <div id="final-view" class="container mx-auto pt-8 px-5 h-screen items-center justify-center hidden">
    <audio id="final-audio" autoplay></audio>
    <h1 id="final-message" class="text-center text-5xl"></h1>
  </div>
`;

const playView = <HTMLElement>document.querySelector("#play-view");
const gameView = <HTMLElement>document.querySelector("#game-view");
const finalView = <HTMLElement>document.querySelector("#final-view");
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
const timer = <HTMLSpanElement>document.querySelector("#timer");
const userActions = <HTMLElement>document.querySelector("#user-actions");
const finalMessage = <HTMLElement>document.querySelector("#final-message");
const gameAudio = <HTMLAudioElement>document.querySelector("#game-audio");
const finalAudio = <HTMLAudioElement>document.querySelector("#final-audio");

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
  gameAudio.innerHTML = `<source src="${gameMusic}" type="audio/mpeg">`;
  playView.classList.toggle("hidden");
  gameView.classList.toggle("hidden");

  const interval = setInterval(() => {
    countdownTimer--;
    timer.textContent = countdownTimer.toString();
  }, 1000);

  setTimeout(() => {
    clearInterval(interval);
    gameView.classList.toggle("hidden");
    finalView.classList.remove("hidden");
    finalView.classList.add("flex");

    if (computerScore > playerScore) {
      finalMessage.textContent = "YOU LOSE!";
      finalAudio.innerHTML = `<source src="${loseMusic}" type="audio/mpeg">`;
    } else if (computerScore < playerScore) {
      finalMessage.textContent = "YOU WON!";
      finalAudio.innerHTML = `<source src="${winMusic}" type="audio/mpeg">`;
    } else {
      finalMessage.textContent = "TIE!";
      finalAudio.innerHTML = `<source src="${tieMusic}" type="audio/mpeg">`;
    }

    setTimeout(() => {
      location.reload();
    }, 9000);
  }, 30000);
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
