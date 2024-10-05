const runes = ["anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon", "anti-clockwise-metamorphosis", "beast", "clockwise-metamorphosis", "communion", "deep-sea", "eye", "formless-oedon", "hunter", "lake", "moon"];
const marks = document.querySelectorAll(".back img");
const cards = document.querySelectorAll(".card");

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
    });
    card.addEventListener("click", () => {;
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
    }

    firstCard = undefined;
    secondCard = undefined;

    if (matched === 10) {
        setTimeout(() => {
            alert(`You win! Your number of moves: ${moves}`);
        }, 1000);
        setTimeout(() => {
            cards.forEach(card => card.classList.remove("flip"));
            matched = 0;
            moves = 0;
         }, 2000);
         setTimeout(() => shuffleCards(), 2500)
    }
}