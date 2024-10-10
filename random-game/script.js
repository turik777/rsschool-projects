const runes = ["anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon", "anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon"];
const marks = document.querySelectorAll(".back img");
const cards = document.querySelectorAll(".card");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const okButton = document.querySelectorAll(".ok-button");

const moveSound = new Audio("assets/audio/move.wav");
const selectSound = new Audio("assets/audio/select.wav");
const okSound = new Audio("assets/audio/ok.wav");
const soulSound = new Audio("assets/audio/soul.wav");
const insightSound = new Audio("assets/audio/insight.wav");
const huntedSound = new Audio("assets/audio/hunted.wav");

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
function checkMatch(first, second) {
    moves++;
    if (first.children[1].children[0].src !== second.children[1].children[0].src) {
        setTimeout(() => {
            first.classList.remove("flip");
            second.classList.remove("flip");
        }, 1000);
    } else {
        matched++;
        if (matched === 10) {
            huntedSound.play();
        } else if (second.children[1].children[0].src.slice(-10, -4) === "hunter") {
            insightSound.play();
        } else {
            soulSound.cloneNode().play();
        }
    }

    firstCard = undefined;
    secondCard = undefined;

    if (matched === 10) {
        gameComplete();
        setTimeout(() => {
            cards.forEach(card => card.classList.remove("flip"));
            matched = 0;
            moves = 0;
         }, 2000);
         setTimeout(() => shuffleCards(), 2500)
    }
}

function gameComplete() {
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
    setTimeout(() => insightSound.cloneNode().play(), 3000);
    setTimeout(() => insightSound.cloneNode().play(), 3350);
    setTimeout(() => insightSound.cloneNode().play(), 3700);

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