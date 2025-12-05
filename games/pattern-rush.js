// Pattern Rush - Color Memory Sequence Game

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

// Tile colors
const colors = ["blue", "red", "yellow", "green"];

// Utils
function sleep(ms) {
    return new Promise(res => setTimeout(res, ms));
}

// Generate one new step in pattern
function addToSequence() {
    const color = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(color);
}

// Flash tile visually
async function flashTile(color) {
    const tile = document.querySelector(`.pr-tile[data-color="${color}"]`);
    tile.classList.add("flash");
    await sleep(250);
    tile.classList.remove("flash");
}

// Play pattern to player
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

// Handle player clicking a tile
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

// Start a new round
async function nextRound() {
    round++;
    prRoundLabel.textContent = round;

    addToSequence();
    await sleep(400);
    playSequence();
}

// Start game
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

// Game over
function endGame() {
    prGame.classList.add("pr-hidden");
    prResult.classList.remove("pr-hidden");

    prFinalRound.textContent = round - 1;

    if (round - 1 > highScore) highScore = round - 1;

    prFinalHigh.textContent = highScore;
    prHighLabel.textContent = highScore;
}

// event listeners
prStartBtn.addEventListener("click", startGame);
prPlayAgainBtn.addEventListener("click", startGame);

// tile clicks
prTiles.forEach(tile => {
    tile.addEventListener("click", handlePlayerClick);
});
