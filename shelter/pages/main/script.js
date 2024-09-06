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