// Number Memory - Brain Boost Version

const nmStartBtn = document.getElementById("nmStartBtn");
const nmSubmitBtn = document.getElementById("nmSubmitBtn");
const nmPlayAgainBtn = document.getElementById("nmPlayAgainBtn");

const nmGame = document.getElementById("nmGame");
const nmHero = document.querySelector(".nm-hero");
const nmInputPhase = document.getElementById("nmInputPhase");
const nmResult = document.getElementById("nmResult");

const nmNumber = document.getElementById("nmNumber");
const nmRoundText = document.getElementById("nmRoundText");

const nmInput = document.getElementById("nmInput");

const nmFinalRound = document.getElementById("nmFinalRound");
const nmHighScore = document.getElementById("nmHighScore");

let round = 1;
let numberToRemember = "";
let highScore = 0;

function generateNumber(digits) {
    let min = Math.pow(10, digits - 1);
    let max = Math.pow(10, digits) - 1;
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function startRound() {
    nmHero.classList.add("nm-hidden");
    nmResult.classList.add("nm-hidden");
    nmInputPhase.classList.add("nm-hidden");
    nmGame.classList.remove("nm-hidden");

    numberToRemember = String(generateNumber(round));
    nmNumber.textContent = numberToRemember;
    nmRoundText.textContent = `Round ${round}`;

    let showTime = 1000 + round * 300;

    setTimeout(() => {
        nmGame.classList.add("nm-hidden");
        nmInputPhase.classList.remove("nm-hidden");
        nmInput.value = "";
        nmInput.focus();
    }, showTime);
}

function checkAnswer() {
    let playerValue = nmInput.value.trim();

    nmInputPhase.classList.add("nm-hidden");

    if (playerValue === numberToRemember) {
        round++;
        startRound();
    } else {
        endGame();
    }
}

function endGame() {
    nmResult.classList.remove("nm-hidden");

    nmFinalRound.textContent = round - 1;

    if (round - 1 > highScore) highScore = round - 1;

    nmHighScore.textContent = highScore;

    nmGame.classList.add("nm-hidden");
}

function startGame() {
    round = 1;
    startRound();
}

nmStartBtn.addEventListener("click", startGame);
nmSubmitBtn.addEventListener("click", checkAnswer);
nmPlayAgainBtn.addEventListener("click", startGame);

// ENTER key for submit
nmInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") checkAnswer();
});

// Parandalon paste cheat
nmInput.addEventListener("paste", (e) => e.preventDefault());
