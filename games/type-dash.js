const MODE_60 = "60s";
const MODE_PARAGRAPH = "paragraph";

// DOM elementet
const hero = document.querySelector(".td-hero");
const modeSelect = document.getElementById("tdModeSelect");
const gameArea = document.getElementById("tdGame");
const resultArea = document.getElementById("tdResult");

const startBtn = document.getElementById("tdStartBtn");
const mode60Btn = document.getElementById("tdMode60Btn");
const modeParagraphBtn = document.getElementById("tdModeParagraphBtn");

const modeLabel = document.getElementById("tdModeLabel");
const timeLabel = document.getElementById("tdTime");
const wpmLabel = document.getElementById("tdWpm");
const accuracyLabel = document.getElementById("tdAccuracy");

const textEl = document.getElementById("tdText");
const inputEl = document.getElementById("tdInput");

const resultWpm = document.getElementById("tdResultWpm");
const resultAccuracy = document.getElementById("tdResultAccuracy");
const resultTime = document.getElementById("tdResultTime");
const resultModeLabel = document.getElementById("tdResultModeLabel");
const resultHighScore = document.getElementById("tdResultHighScore");

const playAgainBtn = document.getElementById("tdPlayAgainBtn");
const changeModeBtn = document.getElementById("tdChangeModeBtn");

// game state
let currentMode = null;
let targetText = "";
let timerId = null;
let startTime = null;
let elapsedMs = 0;
let testRunning = false;

let typedChars = 0;
let correctChars = 0;

let highScore60 = null;
let highScoreParagraph = null;

const paragraphs = [
    "The summer evenings were long and peaceful. Fresh air slipped through the open window while the city slowly fell asleep in the distance. Tom sat at his desk, tapping his fingers on the old wooden surface. He had a habit of thinking deeply before he spoke, and tonight his thoughts drifted far beyond the small room. The distant hum of cars blended with the rustling of the leaves outside, creating a calming backdrop that made it easy to lose track of time. He wanted to write something meaningful, but the right words refused to come easily, drifting around his mind like clouds that never broke into rain.",
    "Practice is the fastest path to improving your typing speed. Many people believe speed comes first, but accuracy is truly the foundation. With consistent effort, the fingers begin to learn movements that once felt awkward or slow. Over time, the mind stops focusing on each individual letter and instead recognizes entire words as shapes. This creates a natural flow that becomes both efficient and comfortable. Improvement is not always visible at first, but small daily habits build skills that last a lifetime. The more familiar the keyboard becomes, the more your hands move without conscious thought.",
    "Computers were once enormous machines that filled entire rooms, blinking with lights and buzzing with mechanical parts. Today, more processing power fits inside a device that easily slips into a pocket. This rapid evolution has reshaped modern life, affecting how people communicate, work, and even think. Technology has unlocked possibilities that earlier generations could only imagine, giving everyone the ability to create, learn, and share at incredible speed. It is a reminder of how far innovation can push when creativity and curiosity come together.",
    "Typing without looking at the keyboard feels strange at first, almost like walking in the dark. But with repetition, the fingers begin to memorize the layout until every movement becomes automatic. This skill frees the mind to focus on ideas instead of mechanics, allowing creativity and clarity to flow more easily. It is similar to learning a musical instrument—the hands eventually take over while the mind shapes the performance. In the end, mastery comes from practice, patience, and consistency.",
    "Small, consistent practice sessions are far more effective than one long and exhausting attempt each week. The brain learns best through repeated exposure, especially when tasks are short and easy to manage. By spreading out your learning, you build a strong and stable foundation that lasts much longer. This method leads to steady improvement and fewer moments of frustration. Progress may feel slow at times, but each step forward adds up in ways that become clear over time.",
    "As the sun rose above the quiet fields, a warm golden light stretched across the surrounding hills. Birds began their morning songs, filling the air with a peaceful rhythm that signaled the beginning of another day. Sarah tightened her backpack and stepped onto the winding dirt path that led through the countryside. Today she felt motivated, ready to challenge herself and discover something new along the way. She didn't know what she would find, but the sense of possibility was enough to keep her moving forward with excitement.",
    "In a world filled with countless distractions, maintaining focus has become a valuable skill. Every notification and vibration fights for your attention, making uninterrupted concentration increasingly rare. Yet the moments of deep focus often produce the best results. Training your mind to resist distractions is challenging at first, but the benefits make the effort worthwhile. The ability to sit down and fully commit to a task has become almost a superpower in the modern age.",
    "Rain tapped gently against the window as Michael prepared a cup of warm tea. The soft rhythm created a soothing atmosphere inside the small apartment. He settled onto the couch with a notebook in his hand, ready to map out his plans for the week. The simple act of organizing his thoughts made him feel calmer and more grounded. As he wrote, he realized how helpful it was to take a moment away from the noise of everyday life and focus on what truly mattered."
];

function pickParagraph() {
    return paragraphs[Math.floor(Math.random() * paragraphs.length)];
}

function resetStats() {
    typedChars = 0;
    correctChars = 0;
    elapsedMs = 0;
    startTime = null;
    testRunning = false;
    updateTimeLabel();
    updateLiveStats();
}

function setMode(mode) {
    currentMode = mode;
    modeLabel.textContent = mode === MODE_60 ? "60-Second Test" : "Paragraph Test";

    modeSelect.classList.add("td-hidden");
    gameArea.classList.remove("td-hidden");
    gameArea.classList.add("active");
    resultArea.classList.add("td-hidden");

    targetText = pickParagraph();
    renderTargetText("");
    inputEl.value = "";
    inputEl.disabled = false;
    inputEl.focus();

    resetStats();
}

function renderTargetText(currentInput) {
    let html = "";
    let inWord = false;

    for (let i = 0; i < targetText.length; i++) {
        const targetChar = targetText[i];
        const typedChar = i < currentInput.length ? currentInput[i] : null;
        const isSpace = targetChar === " " || targetChar === "\n" || targetChar === "\t";

        if (isSpace) {
            if (inWord) {
                html += "</span>";
                inWord = false;
            }
            html += " ";
            continue;
        }

        if (!inWord) {
            html += `<span class="td-word">`;
            inWord = true;
        }

        const safeChar =
            targetChar === "<" ? "&lt;" :
                targetChar === ">" ? "&gt;" :
                    targetChar;

        let className = "td-char";
        if (typedChar !== null) {
            className += typedChar === targetChar
                ? " td-char-correct"
                : " td-char-incorrect";
        }

        html += `<span class="${className}">${safeChar}</span>`;
    }

    if (inWord) {
        html += "</span>";
    }

    textEl.innerHTML = html;
}

function startTimerIfNeeded() {
    if (testRunning) return;

    testRunning = true;
    startTime = performance.now();

    if (currentMode === MODE_60) {
        const duration = 60000;
        timerId = setInterval(() => {
            elapsedMs = performance.now() - startTime;
            const remaining = Math.max(0, duration - elapsedMs);
            timeLabel.textContent = (remaining / 1000).toFixed(1) + "s";

            if (remaining <= 0) finishTest("time");
            else updateLiveStats();
        }, 80);
    } else {
        timerId = setInterval(() => {
            elapsedMs = performance.now() - startTime;
            updateTimeLabel();
            updateLiveStats();
        }, 80);
    }
}

function updateTimeLabel() {
    timeLabel.textContent = (elapsedMs / 1000).toFixed(1) + "s";
}

function updateLiveStats() {
    const minutes = elapsedMs > 0 ? elapsedMs / 60000 : 1;
    const wpm = Math.round((correctChars / 5) / minutes);
    const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

    wpmLabel.textContent = wpm >= 0 ? wpm : 0;
    accuracyLabel.textContent = accuracy + "%";
}

function finishTest(reason) {
    if (!testRunning && reason === "time") return;

    testRunning = false;
    inputEl.disabled = true;

    if (timerId) clearInterval(timerId);

    if (currentMode === MODE_60) elapsedMs = Math.max(elapsedMs, 60000);
    else elapsedMs = performance.now() - startTime;

    const minutes = elapsedMs / 60000;
    const wpm = Math.round((correctChars / 5) / minutes);
    const accuracy = typedChars > 0 ? Math.round((correctChars / typedChars) * 100) : 100;

    // update high score
    if (currentMode === MODE_60) {
        if (highScore60 === null || wpm > highScore60) highScore60 = wpm;
    } else {
        if (highScoreParagraph === null || wpm > highScoreParagraph) highScoreParagraph = wpm;
    }

    gameArea.classList.add("td-hidden");
    gameArea.classList.remove("active");
    resultArea.classList.remove("td-hidden");

    resultWpm.textContent = wpm;
    resultAccuracy.textContent = accuracy + "%";
    resultTime.textContent = (elapsedMs / 1000).toFixed(1) + "s";

    resultModeLabel.textContent =
        currentMode === MODE_60 ? "60-Second Test" : "Paragraph Test";

    resultHighScore.textContent =
        currentMode === MODE_60 ? highScore60 : highScoreParagraph;
}

inputEl.addEventListener("input", () => {
    const value = inputEl.value;
    startTimerIfNeeded();

    typedChars = value.length;
    correctChars = 0;

    for (let i = 0; i < value.length && i < targetText.length; i++) {
        if (value[i] === targetText[i]) correctChars++;
    }

    renderTargetText(value);
    updateLiveStats();

    if (
        currentMode === MODE_PARAGRAPH &&
        value.length === targetText.length &&
        value === targetText
    ) finishTest("complete");

    if (
        currentMode === MODE_60 &&
        value.length === targetText.length &&
        value === targetText
    ) finishTest("complete");
});

startBtn.addEventListener("click", () => {
    hero.classList.add("td-hidden");
    modeSelect.classList.remove("td-hidden");
});

mode60Btn.addEventListener("click", () => setMode(MODE_60));
modeParagraphBtn.addEventListener("click", () => setMode(MODE_PARAGRAPH));

playAgainBtn.addEventListener("click", () => setMode(currentMode));

changeModeBtn.addEventListener("click", () => {
    resultArea.classList.add("td-hidden");
    modeSelect.classList.remove("td-hidden");
    gameArea.classList.remove("active");
    inputEl.value = "";
    textEl.textContent = "";
    resetStats();
});

// per parandalimin e kopjimit, paste, pra cheating
textEl.addEventListener("contextmenu", (e) => e.preventDefault());

textEl.addEventListener("copy", (e) => e.preventDefault());
textEl.addEventListener("cut", (e) => e.preventDefault());
textEl.addEventListener("paste", (e) => e.preventDefault());

textEl.addEventListener("mousedown", (e) => e.preventDefault());

