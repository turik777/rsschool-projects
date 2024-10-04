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