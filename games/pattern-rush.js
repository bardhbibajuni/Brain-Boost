const prStartBtn = document.getElementById("prStartBtn");
const prPlayAgainBtn = document.getElementById("prPlayAgainBtn");

const prGame = document.getElementById("prGame");
const prHero = document.querySelector(".pr-hero");
const prResult = document.getElementById("prResult");

const prTiles = document.querySelectorAll(".pr-tile");
const prStatus = document.getElementById("prStatus");

const prRoundLabel = document.getElementById("prRound");
const prSpeedLabel = document.getElementById("prSpeed");
const prHighLabel = document.getElementById("prHigh");

const prFinalRound = document.getElementById("prFinalRound");
const prFinalHigh = document.getElementById("prFinalHigh");

let sequence = [];
let playerIndex = 0;
let round = 1;
let highScore = 0;
let playingBack = false;

const colors = ["blue", "red", "yellow", "green"];

function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

function addToSequence() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(color);
}

async function flashTile(color) {
    const tile = document.querySelector(`.pr-tile[data-color="${color}"]`);
    tile.classList.add("flash");
    await sleep(250);
    tile.classList.remove("flash");
}

async function playSequence() {
    playingBack = true;
    prStatus.textContent = "Watch the pattern...";
    prSpeedLabel.textContent = round + "x";

    for (let color of sequence) {
        await flashTile(color);
        await sleep(150);
    }

    playingBack = false;
    prStatus.textContent = "Your turn!";
    playerIndex = 0;
}

async function handlePlayerClick(e) {
    if (playingBack) return;

    const clickedColor = e.target.dataset.color;
    flashTile(clickedColor);

    if (clickedColor === sequence[playerIndex]) {
        playerIndex++;

        if (playerIndex === sequence.length) {
            await sleep(400);
            nextRound();
        }
    } else {
        return endGame();
    }
}

async function nextRound() {
    round++;
    prRoundLabel.textContent = round;

    addToSequence();
    await sleep(400);
    playSequence();
}

function startGame() {
    prHero.classList.add("pr-hidden");
    prResult.classList.add("pr-hidden");
    prGame.classList.remove("pr-hidden");

    round = 1;
    sequence = [];
    playerIndex = 0;

    prRoundLabel.textContent = round;
    prStatus.textContent = "Watch the pattern...";
    prSpeedLabel.textContent = "1x";

    addToSequence();
    playSequence();
}

function endGame() {
    prGame.classList.add("pr-hidden");
    prResult.classList.remove("pr-hidden");

    prFinalRound.textContent = round - 1;

    if (round - 1 > highScore) highScore = round - 1;

    prFinalHigh.textContent = highScore;
    prHighLabel.textContent = highScore;
}

prStartBtn.addEventListener("click", startGame);
prPlayAgainBtn.addEventListener("click", startGame);

prTiles.forEach(tile => {
    tile.addEventListener("click", handlePlayerClick);
});
