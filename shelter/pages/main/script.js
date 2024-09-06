import pets from "../../assets/data/pets.js"

const burger = document.querySelector(".burger-icon");
const menu = document.querySelector(".menu");
const menuBackground = document.querySelector(".menu-background");
const menuLinks = document.querySelectorAll(".menu-link");

function showMenu() {
    if (menu.classList.contains("menu-active")) {
        menuBackground.style.backgroundColor = "transparent";
        setTimeout(() => menuBackground.classList.remove("menu-background-active"), 500);
    } else {
        menuBackground.style.backgroundColor = "rgba(41, 41, 41, 0.60)";
        menuBackground.classList.add("menu-background-active");
    }

    burger.classList.toggle("burger-icon-active");
    menu.classList.toggle("menu-active");
    document.querySelector("html").classList.toggle("overflow-hidden");
}

burger.addEventListener("click", showMenu);
menuBackground.addEventListener("click", showMenu);
menuLinks.forEach((link) => {
    link.addEventListener("click", showMenu);
})

function renderCard(pet, number) {
    const cards = document.querySelectorAll(".pets-cards");
    const card = document.createElement("div");
    const cardImage = document.createElement("img");
    const cardTitle = document.createElement("p");
    const cardButton = document.createElement("button");

    card.classList.add("pets-card");
    cardImage.classList.add("pets-card-title");
    cardTitle.classList.add("pets-card-title");
    cardButton.classList.add("pets-card-button");

    cardImage.src = pet.img;
    cardImage.alt = pet.type + " " + pet.name;
    cardTitle.textContent = pet.name;
    cardButton.textContent = "Learn more";

    cards[number].appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardButton);

    card.addEventListener("click", () => {
        showPopup(pet);
    });
}

let arrayCurrRandom = [];
let arrayNextRandom = [];

function randomArr() {
    arrayCurrRandom = [];
    
    while (arrayCurrRandom.length < 3) {
        let random = Math.floor(Math.random() * 8);
        if (arrayCurrRandom.indexOf(random) === -1) {
            arrayCurrRandom.push(random);
        }
    }  
}

function randomNextArr() {
    arrayNextRandom = [];
    
    while (arrayNextRandom.length < 3) {
        let random = Math.floor(Math.random() * 8);
        if (arrayCurrRandom.indexOf(random) === -1 && arrayNextRandom.indexOf(random) === -1) {
            arrayNextRandom.push(random);
        }
    }  
}

randomArr();
arrayCurrRandom.forEach(pet => {
    renderCard(pets[pet], 1);
});

randomNextArr();
arrayNextRandom.forEach(pet => {
    renderCard(pets[pet], 0);
});

randomNextArr();
arrayNextRandom.forEach(pet => {
    renderCard(pets[pet], 2);
});

const slider = document.querySelector(".slider-cards");
const cards = document.getElementsByClassName("pets-cards");
const buttons = document.querySelectorAll(".button-arrow");

let countL = 1;
let countR = 1;
buttons[1].addEventListener("click", () => {
    if (countL === 2 && countR === 1) [arrayNextRandom, arrayCurrRandom] = [arrayCurrRandom, arrayNextRandom];

    countR++;
    countL--;
    if (countL < 1) countL = 1;

    if (countR === 3) {
        countR = 2;
        arrayCurrRandom = arrayNextRandom;
        randomNextArr();
        cards[2].innerHTML = "";

        arrayNextRandom.forEach(pet => {
            renderCard(pets[pet], 2);
        });

        hideCards();
    }
    cards[0].remove();
    slider.appendChild(cards[0].cloneNode(true));
});

buttons[0].addEventListener("click", () => {
    if (countR === 2 && countL === 1) [arrayCurrRandom, arrayNextRandom] = [arrayNextRandom, arrayCurrRandom];

    countL++;
    countR--;
    if (countR < 1) countR = 1;

    if (countL === 3) {
        countL = 2;
        arrayCurrRandom = arrayNextRandom;
        randomNextArr();
        cards[0].innerHTML = "";

        arrayNextRandom.forEach(pet => {
            renderCard(pets[pet], 0);
        });

        hideCards();
    }
    const lastCard = cards[cards.length - 1];
    lastCard.remove();
    slider.insertBefore(lastCard.cloneNode(true), cards[0]);
});

function hideCards() {
    const cards1280 = document.querySelectorAll(".pets-cards .pets-card:last-child");
    const cards768 = document.querySelectorAll(".pets-cards .pets-card:nth-child(2)");
    
    if (document.documentElement.clientWidth < 768) {
        cards1280.forEach(card => card.style.display = "none");
        cards768.forEach(card => card.style.display = "none");
    } else if ((document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280)) {
        cards1280.forEach(card => card.style.display = "none");
        cards768.forEach(card => {
            if (card.style.display === "none") card.style.display = "flex";
        })
    } else if (document.documentElement.clientWidth >= 1280) {
        cards1280.forEach(card => {
            if (card.style.display === "none") card.style.display = "flex";
        })
        cards768.forEach(card => {
            if (card.style.display === "none") card.style.display = "flex";
        })
    }
}