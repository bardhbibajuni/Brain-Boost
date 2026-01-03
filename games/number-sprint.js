const nsHero = document.querySelector(".ns-hero");
const nsGame = document.getElementById("nsGame");
const nsResult = document.getElementById("nsResult");

const nsStartBtn = document.getElementById("nsStartBtn");
const nsPlayAgainBtn = document.getElementById("nsPlayAgainBtn");

const nsTimeLabel = document.getElementById("nsTime");
const nsScoreLabel = document.getElementById("nsScore");
const nsAccuracyLabel = document.getElementById("nsAccuracy");

const nsProblemEl = document.getElementById("nsProblem");
const nsAnswerInput = document.getElementById("nsAnswer");
const nsFeedback = document.getElementById("nsFeedback");

const nsResultScore = document.getElementById("nsResultScore");
const nsResultAccuracy = document.getElementById("nsResultAccuracy");
const nsResultCorrect = document.getElementById("nsResultCorrect");
const nsResultTotal = document.getElementById("nsResultTotal");
const nsResultHighScore = document.getElementById("nsResultHighScore");

const GAME_DURATION_MS = 60000;
let timerId = null;
let startTime = null;
let elapsedMs = 0;
let running = false;

let currentA = 0;
let currentB = 0;
let currentOp = "+";
let currentAnswer = 0;

let score = 0;
let correctCount = 0;
let totalCount = 0;
let highScore = null;

function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateProblem() {
  const opIndex = randInt(0, 2); 
  if (opIndex === 0) {
    currentOp = "+";
    currentA = randInt(1, 20);
    currentB = randInt(1, 20);
    currentAnswer = currentA + currentB;
  } else if (opIndex === 1) {
    currentOp = "-";
    let a = randInt(0, 20);
    let b = randInt(0, 20);
    if (b > a) [a, b] = [b, a];
    currentA = a;
    currentB = b;
    currentAnswer = currentA - currentB;
  } else {
    currentOp = "x";
    currentA = randInt(1, 10);
    currentB = randInt(1, 10);
    currentAnswer = currentA * currentB;
  }

  nsProblemEl.textContent = `${currentA} ${currentOp} ${currentB} = ?`;
  nsAnswerInput.value = "";
  nsAnswerInput.focus();
  nsFeedback.textContent = "";
  nsFeedback.classList.remove("correct", "wrong");
}

function resetStats() {
  elapsedMs = 0;
  score = 0;
  correctCount = 0;
  totalCount = 0;
  running = false;
  updateUiStats();
}

function updateUiStats() {
  const remainingMs = Math.max(0, GAME_DURATION_MS - elapsedMs);
  nsTimeLabel.textContent = (remainingMs / 1000).toFixed(1) + "s";
  nsScoreLabel.textContent = score;

  const accuracy =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;
  nsAccuracyLabel.textContent = accuracy + "%";
}

function startGame() {
  nsHero.classList.add("ns-hidden");
  nsResult.classList.add("ns-hidden");
  nsGame.classList.remove("ns-hidden");

  resetStats();
  generateProblem();

  startTime = performance.now();
  running = true;

  if (timerId) clearInterval(timerId);
  timerId = setInterval(() => {
    if (!running) return;
    elapsedMs = performance.now() - startTime;
    if (elapsedMs >= GAME_DURATION_MS) {
      elapsedMs = GAME_DURATION_MS;
      updateUiStats();
      endGame();
    } else {
      updateUiStats();
    }
  }, 80);
}

function endGame() {
  running = false;
  if (timerId) clearInterval(timerId);
  nsGame.classList.add("ns-hidden");
  nsResult.classList.remove("ns-hidden");

  const accuracy =
    totalCount > 0 ? Math.round((correctCount / totalCount) * 100) : 100;

  if (highScore === null || score > highScore) {
    highScore = score;
  }

  nsResultScore.textContent = score;
  nsResultAccuracy.textContent = accuracy + "%";
  nsResultCorrect.textContent = correctCount;
  nsResultTotal.textContent = totalCount;
  nsResultHighScore.textContent = highScore ?? 0;
}

function submitAnswer() {
  if (!running) return;

  const raw = nsAnswerInput.value.trim();
  if (raw === "") return;

  const value = Number(raw);
  totalCount++;

  if (!Number.isNaN(value) && value === currentAnswer) {
    score++;
    correctCount++;
    nsFeedback.textContent = "Saktë ✔";
    nsFeedback.classList.remove("wrong");
    nsFeedback.classList.add("correct");
  } else {
    nsFeedback.textContent = `Gabim ✘ - përgjigjja e saktë ishte ${currentAnswer}`;
    nsFeedback.classList.remove("correct");
    nsFeedback.classList.add("wrong");
  }

  updateUiStats();
  generateProblem();
}

nsStartBtn.addEventListener("click", () => {
  startGame();
});

nsPlayAgainBtn.addEventListener("click", () => {
  startGame();
});

nsAnswerInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    submitAnswer();
  }
});

// parandalon paste cheating
nsAnswerInput.addEventListener("paste", (e) => e.preventDefault());
