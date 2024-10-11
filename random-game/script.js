const runes = ["anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon", "anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon"];

const runesTable = {
    "anti-clockwise-metamorphosis": 300,
    "beast": 100,
    "clockwise-metamorphosis": 300,
    "communion": 500,
    "deep-sea": 100,
    "eye": 500,
    "formless-oedon": 1000,
    "hunter": 0,
    "lake": 100,
    "moon": 1000
};

const marks = document.querySelectorAll(".back img");
const cards = document.querySelectorAll(".card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const message = document.querySelectorAll(".message-outer");
const okButton = document.querySelectorAll(".ok-button");

const moveSound = new Audio("assets/audio/move.wav");
const selectSound = new Audio("assets/audio/select.wav");
const okSound = new Audio("assets/audio/ok.wav");
const soulSound = new Audio("assets/audio/soul.wav");
const insightSound = new Audio("assets/audio/insight.wav");
const huntedSound = new Audio("assets/audio/hunted.wav");
const musicboxSound = new Audio("assets/audio/musicbox.wav");
const crySound = new Audio("assets/audio/cry.wav");
const clericSound = new Audio("assets/audio/cleric.mp3");
const lanternMusic = new Audio("assets/audio/lantern.mp3");
const nightmareMusic = new Audio("assets/audio/nightmare.mp3");
const dreamMusic = new Audio("assets/audio/dream.mp3");

window.addEventListener("load", () => {
    setTimeout(() => message[0].classList.add("fade-in"), 500);
    if (insightSum >= 20) {
        document.querySelector(".presence").classList.add("show");
        setTimeout(() => document.querySelector(".presence").classList.add("fade-in"), 500);
        document.querySelector(".overlay").classList.remove("show");
        setTimeout(() => document.querySelector(".overlay").classList.add("fade-out"), 500);
    } else if (insightSum >= 16) {
        document.querySelector(".amygdala").classList.add("show");
        setTimeout(() => document.querySelector(".amygdala").classList.add("fade-in"), 500);
        document.querySelector(".overlay").classList.remove("show");
        setTimeout(() => document.querySelector(".overlay").classList.add("fade-out"), 500);
    } else if (insightSum >= 12) {
        document.querySelector(".bloodmoon").classList.add("show");
        setTimeout(() => document.querySelector(".bloodmoon").classList.add("fade-in"), 500);
    } else if (insightSum >= 8) {
        document.querySelector(".old").classList.add("show");
        setTimeout(() => document.querySelector(".old").classList.add("fade-in"), 500);
    } else if (insightSum >= 4) {
        document.querySelector(".cleric").classList.add("show");
        setTimeout(() => document.querySelector(".cleric").classList.add("fade-in"), 500);
    }
});

okButton.forEach((button) => {
    button.addEventListener("click", () => {
        if (insightSum >= 20) {
            document.querySelector(".presence").classList.add("show");
            setTimeout(() => document.querySelector(".presence").classList.add("fade-in"), 500);
            document.querySelector(".overlay").classList.remove("show");
            setTimeout(() => document.querySelector(".overlay").classList.add("fade-out"), 500);

            document.querySelector(".subtitle p").textContent = "Become a Great One";
            document.querySelector(".subtitle p").style.color = "#860000"

            nightmareMusic.pause();
            dreamMusic.play();
        } else if (insightSum >= 16) {
            document.querySelector(".amygdala").classList.add("show");
            setTimeout(() => document.querySelector(".amygdala").classList.add("fade-in"), 500);
            document.querySelector(".overlay").classList.remove("show");
            setTimeout(() => document.querySelector(".overlay").classList.add("fade-out"), 500);

            document.querySelector(".subtitle p").textContent = "Fear the Old Blood";
            document.querySelector(".subtitle p").style.color = "#860000"

            left.classList.remove("green");
            right.classList.remove("green");
            left.textContent = "NIGHTMARE SLAIN";
            right.textContent = "NIGHTMARE SLAIN";

            lanternMusic.pause();
            nightmareMusic.play();
        } else if (insightSum >= 12) {
            document.querySelector(".bloodmoon").classList.add("show");
            setTimeout(() => document.querySelector(".bloodmoon").classList.add("fade-in"), 500);

            document.querySelector(".subtitle p").textContent = "Grant Us Eyes";

            left.classList.add("green");
            right.classList.add("green");
            left.textContent = "PREY SLAUGHTERED";
            right.textContent = "PREY SLAUGHTERED";

            crySound.pause();
            lanternMusic.play();
            lanternMusic.volume = 0.5;
        } else if (insightSum >= 8) {
            document.querySelector(".old").classList.add("show");
            setTimeout(() => document.querySelector(".old").classList.add("fade-in"), 500);

            crySound.play();
            crySound.volume = 0.05;
        } else if (insightSum >= 4) {
            document.querySelector(".cleric").classList.add("show");
            setTimeout(() => document.querySelector(".cleric").classList.add("fade-in"), 500);

            clericSound.play();
            clericSound.volume = 0.5;
        } else {
            musicboxSound.play();
        }
    });
})

okButton[0].addEventListener("click", () => {
    document.querySelector(".overlay").classList.add("show-block");
    document.querySelector(".title").classList.add("show-block");
    document.querySelector(".board-background").classList.add("show");
    document.querySelector(".points").classList.add("show");
    document.querySelector(".footer").classList.add("show");
    setTimeout(() => {
        document.querySelector(".overlay").classList.add("fade-in");
        document.querySelector(".title").classList.add("fade-in");
        document.querySelector(".board-background").classList.add("fade-in");
        document.querySelector(".points").classList.add("fade-in");
        document.querySelector(".footer").classList.add("fade-in");
    }, 500);
})

function shuffleCards() {
    let runesRandom = runes.sort(() => Math.random() - 0.5);
    for (let i = 0; i < 20; i++) {
        marks[i].src = `assets/img/${runesRandom[i]}.png`;
    }
}
shuffleCards();

let firstCard;
let secondCard;
cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
        moveSound.play();
    });
    card.addEventListener("click", () => {;
        selectSound.play();
        if (card.classList.contains("flip")) return;

        card.classList.add("flip");
        if (!firstCard) {
            firstCard = card;
        } else {
            secondCard = card;
            checkMatch(firstCard, secondCard);
        }
    });
});

let matched = 0;
let moves = 0;

let lastMovesLocal = [];
let bestScore = undefined;
if (localStorage.getItem("moves")) {
    lastMovesLocal = localStorage.getItem("moves").split(",");
}
if (localStorage.getItem("best")) {
    bestScore = localStorage.getItem("best");
}
const lastMoves = lastMovesLocal;

function checkMatch(first, second) {
    moves++;
    if (first.children[1].children[0].src !== second.children[1].children[0].src) {
        setTimeout(() => {
            first.classList.remove("flip");
            second.classList.remove("flip");
        }, 1000);
    } else {
        matched++;
        let rune = second.children[1].children[0].src.split("/").reverse()[0].split(".")[0];
        if (matched === 10) {
            huntedSound.play();
            addSouls(runesTable[rune]);
        } else if (second.children[1].children[0].src.slice(-10, -4) === "hunter") {
            insightSum++;
            insightSound.play();
            addInsight();
        } else {
            soulSound.cloneNode().play();
            addSouls(runesTable[rune]);
        }
    }

    firstCard = undefined;
    secondCard = undefined;

    if (matched === 10) {
        gameComplete();
        setTimeout(() => {
            cards.forEach(card => card.classList.remove("flip"));
            matched = 0;
         }, 2000);
         setTimeout(() => shuffleCards(), 2500)
    }
}

function gameComplete() {
    insightSum += 3;
    huntedSound.play();
    left.classList.toggle("show");
    right.classList.toggle("show");
    setTimeout(() => {
        left.classList.toggle("move-right");
        right.classList.toggle("move-left"); 
    });
    setTimeout(() => {
        left.classList.toggle("fade-out");
        right.classList.toggle("fade-out");
    }, 2000);
    setTimeout(() => {
        insightSound.cloneNode().play();
        addInsight();
    }, 3000);
    setTimeout(() => {
        insightSound.cloneNode().play();
        addInsight();
    }, 3350);
    setTimeout(() => {
        insightSound.cloneNode().play();
        addInsight();
    }, 3700);

    if (lastMoves.length > 9) lastMoves.shift();
    lastMoves.push(moves);
    if (moves < bestScore || !bestScore) bestScore = moves;
    localStorage.setItem("moves", lastMoves);
    localStorage.setItem("best", bestScore);
    localStorage.setItem("souls", soulsSum);
    localStorage.setItem("insight", insightSum);

    setTimeout(() => {
        renderScore();
        left.classList.toggle("show");
        right.classList.toggle("show");
        left.classList.toggle("move-right");
        right.classList.toggle("move-left");
        left.classList.toggle("fade-out");
        right.classList.toggle("fade-out");
    }, 5000)
}

okButton.forEach(button => {
    button.addEventListener("mouseenter", () => {
        moveSound.play();
    });
    button.addEventListener("click", (event) => {
        okSound.play();
        event.target.parentNode.parentNode.classList.toggle("show");
    });
})

function renderScore() {
    const message = document.querySelector(".score");
    const score = document.querySelector(".score ul");
    const text = document.createElement("p");
    text.classList.add("message-text");
    text.innerHTML = `Number of moves: ${moves}&emsp;&emsp;&emsp;Best: ${bestScore}`;
    message.classList.toggle("show");
    message.childNodes[1].removeChild(message.childNodes[1].firstChild);
    message.childNodes[1].prepend(text);

    score.textContent = "";
    lastMoves.reverse().forEach(move => {
        const li = document.createElement("li");
        li.textContent = `${move}`;
        score.appendChild(li);
    })
    moves = 0;
}

const souls = document.querySelector(".souls");
const soulsAdded = document.querySelector(".souls-add");
const insight = document.querySelector(".insight");

let soulsSum = 0;
let insightSum = 0;
if (localStorage.getItem("souls")) {
    souls.innerHTML = localStorage.getItem("souls");
    soulsSum = +localStorage.getItem("souls");
}
if (localStorage.getItem("insight")) {
    insight.innerHTML = localStorage.getItem("insight");
    insightSum = +localStorage.getItem("insight");
}

let currentAdd = 0;
let addTimeout;

function addSouls(n) {
    if (addTimeout) clearTimeout(addTimeout);
    let sum = soulsSum;
    let arr = [];
    let acc = Math.round(n / 10);
    let acc90 = Math.round(acc / 100 * 90)
    arr.push(acc);

    while (acc < n){
        if (acc90 === Math.round(acc90 / 100 * 90)) {
            acc90 = Math.round(acc90 / 100 * 70);
        } else {
            acc90 = Math.round(acc90 / 100 * 90);
        }
        acc += acc90;
        arr.push(acc);
    }
    
    arr.forEach((n, i) => {
        setTimeout(() => {
            souls.innerHTML = `${n + sum}`;
        }, i * 33.33);
    });

    soulsSum += n;
    currentAdd += n;
    soulsAdded.innerHTML = `+${currentAdd}`;
    soulsAdded.classList.add("show");
    addTimeout = setTimeout(() => {
        soulsAdded.innerHTML = "";
        soulsAdded.classList.remove("show");
        currentAdd = 0;
    }, 3000);
}

function addInsight() {
    let sum = +insight.innerHTML;
    insight.innerHTML = `${sum + 1}`;
}