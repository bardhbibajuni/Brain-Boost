// Verbal Memory - Brain Boost

const vmStartBtn = document.getElementById("vmStartBtn");
const vmNewBtn = document.getElementById("vmNewBtn");
const vmSeenBtn = document.getElementById("vmSeenBtn");
const vmPlayAgainBtn = document.getElementById("vmPlayAgainBtn");

const vmHero = document.querySelector(".vm-hero");
const vmGame = document.getElementById("vmGame");
const vmResult = document.getElementById("vmResult");

const vmWord = document.getElementById("vmWord");
const vmScoreLabel = document.getElementById("vmScore");
const vmLivesLabel = document.getElementById("vmLives");
const vmHighLabel = document.getElementById("vmHigh");

const vmFinalScore = document.getElementById("vmFinalScore");
const vmFinalHigh = document.getElementById("vmFinalHigh");

// ~220 mixed-difficulty English words
const WORDS = [
"forest","mirror","silver","planet","shadow","gentle","angle","orbit","castle","coast",
"rapid","system","motion","expert","random","silent","bridge","timber","wander","vivid",
"branch","flame","switch","wonder","carbon","signal","humble","fabric","legacy","distant",
"remark","glance","object","simple","native","valley","prison","rocket","custom","border",
"crisis","nature","vision","hidden","stable","fabric","volume","puzzle","oxygen","smooth",
"divide","copper","launch","symbol","urgent","wisdom","reward","hazard","market","choice",
"option","spirit","memory","crystal","ancient","future","yellow","silver","broken","fluent",
"travel","random","freeze","window","branch","wonder","marine","signal","thrive","tunnel",
"charge","stream","energy","growth","polish","sudden","leader","fabric","motion","sacred",
"marble","spider","cotton","switch","ethics","gentle","native","corner","planet","harbor",
"violin","detect","cozy","rustic","echo","spice","lunar","solar","cosmic","vital",
"loyal","hollow","major","frost","arrow","shore","limit","prize","burst","faint",
"flock","cabin","orbit","dizzy","brisk","cling","craft","flair","gloom","grain",
"harsh","ivory","jelly","morph","novel","oasis","phase","pulse","quest","reign",
"shear","stark","tilde","unity","vapor","woven","yield","zesty","amber","bliss",
"crown","drift","ember","forge","glare","haven","infer","jolly","kneel","latch",
"mimic","noble","oxide","perch","quilt","rider","stern","trail","usher","vivid",
"whirl","yearn","bland","crisp","drape","evoke","flute","glide","hinge","ivory",
"jewel","knack","lemon","mirth","nexus","optic","pearl","quark","rural","sleek",
"trait","umbra","vigil","wheat","youth","zonal","bound","charm","dwell","flank",
"gleam","hefty","ideal","jumpy","lumen","medic","nymph","oddly","prime","ranch",
"scout","theme","urban","vigor","wharf","yield","zebra","bride","cable","dense",
"elite","forum","grasp","haste","index","jewel","kneel","linen","motel","nerve",
"oxide","pulse","quilt","revue","stove","treat","ultra","vista","woven","yacht"
];

let score = 0;
let lives = 3;
let highScore = 0;

let seen = new Set();
let currentWord = "";

// Random word
function getRandomWord() {
    return WORDS[Math.floor(Math.random() * WORDS.length)];
}

// Decide if next word is NEW or SEEN
function generateNextWord() {
    let useSeen = false;

    // If we have enough seen words, 40% chance to reuse
    if (seen.size >= 3) {
        useSeen = Math.random() < 0.40;
    }

    if (useSeen) {
        const arr = Array.from(seen);
        return arr[Math.floor(Math.random() * arr.length)];
    } else {
        let w;
        do {
            w = getRandomWord();
        } while (seen.has(w)); // ensure it's new
        return w;
    }
}

function showNextWord() {
    currentWord = generateNextWord();
    vmWord.textContent = currentWord;
}

// Handle NEW button
function handleNew() {
    if (seen.has(currentWord)) {
        loseLife();
    } else {
        score++;
        seen.add(currentWord);
        vmScoreLabel.textContent = score;
        showNextWord();
    }
}

// Handle SEEN button
function handleSeen() {
    if (!seen.has(currentWord)) {
        loseLife();
    } else {
        score++;
        vmScoreLabel.textContent = score;
        showNextWord();
    }
}

function loseLife() {
    lives--;
    vmLivesLabel.textContent = lives;

    if (lives <= 0) return endGame();

    // show next word
    showNextWord();
}

function startGame() {
    vmHero.classList.add("vm-hidden");
    vmResult.classList.add("vm-hidden");
    vmGame.classList.remove("vm-hidden");

    score = 0;
    lives = 3;
    seen.clear();

    vmScoreLabel.textContent = 0;
    vmLivesLabel.textContent = 3;

    showNextWord();
}

function endGame() {
    vmGame.classList.add("vm-hidden");
    vmResult.classList.remove("vm-hidden");

    vmFinalScore.textContent = score;

    if (score > highScore) highScore = score;

    vmFinalHigh.textContent = highScore;
    vmHighLabel.textContent = highScore;
}

// Events
vmStartBtn.addEventListener("click", startGame);
vmPlayAgainBtn.addEventListener("click", startGame);

vmNewBtn.addEventListener("click", handleNew);
vmSeenBtn.addEventListener("click", handleSeen);
