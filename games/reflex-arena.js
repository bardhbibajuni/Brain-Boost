const mainMenu = document.querySelector(".main-menu");
const clickableArea = document.querySelector(".clickable-area");
const message = document.querySelector(".clickable-area .message");
const endScreen = document.querySelector(".end-screen");
const reactionTimeText = document.querySelector(".end-screen .reaction-time-text");
const highScoreText = document.querySelector(".high-score-text");
const playAgainBtn = document.querySelector(".end-screen .play-again-btn");

let timer;
let greenDisplayed;
let timeNow;
let waitingForStart;
let waitingForGreen;

let highScore = null;  // ruan high score

const init = () => {
    greenDisplayed = false;
    waitingForStart = false;
    waitingForGreen = false;
};

init();

const setGreenColor = () => {
    clickableArea.style.backgroundColor = "#32cd32";
    message.innerHTML = "Click Now!";
    message.style.color = "#111";
    greenDisplayed = true;
    timeNow = Date.now();
};

const startGame = () => {
    clickableArea.style.backgroundColor = "#c1121f";
    message.innerHTML = "Wait for the Green Color.";
    message.style.color = "#fff";

    let randomNumber = Math.floor(Math.random() * 4000 + 3000);
    timer = setTimeout(setGreenColor, randomNumber);

    waitingForStart = false;
    waitingForGreen = true;
};

mainMenu.addEventListener("click", () => {
    mainMenu.classList.remove("active");
    startGame();
});

const showEndScreen = (rt) => {
    endScreen.classList.add("active");

    reactionTimeText.innerHTML = `${rt} ms`;

    if (highScore === null || rt < highScore) {
        highScore = rt;
    }

    highScoreText.innerHTML = `High Score: ${highScore} ms`;
};

const displayReactionTime = (rt) => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = `<div class='reaction-time-text'>${rt} ms</div>Click to continue.`;
    greenDisplayed = false;

    waitingForStart = true;
    
    showEndScreen(rt);
};

const displayTooSoon = () => {
    clickableArea.style.backgroundColor = "#faf0ca";
    message.innerHTML = "Too Soon. Click to continue";
    message.style.color = "#111";
    waitingForStart = true;
    clearTimeout(timer);
};

clickableArea.addEventListener("click", () => {
    if (greenDisplayed) {
        let clickTime = Date.now();
        let reactionTime = clickTime - timeNow;
        displayReactionTime(reactionTime);
        return;
    }

    if (waitingForStart) {
        endScreen.classList.remove("active"); // hide score screen
        startGame();
        return;
    }

    if (waitingForGreen) {
        displayTooSoon();
    }
});

playAgainBtn.addEventListener("click", () => {
    endScreen.classList.remove("active");
    startGame();
});
