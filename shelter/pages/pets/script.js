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

let arrayPets = [];
let arrayRandom = [];

function randomArr() {
    arrayRandom = [];
    
    while (arrayRandom.length < 8) {
        let random = Math.floor(Math.random() * 8);
        if (arrayRandom.indexOf(random) === -1) {
            arrayRandom.push(random);
        }
    }  
}
randomArr();

arrayPets.push(arrayRandom);
let last = [arrayRandom[6], arrayRandom[7]];

while (arrayPets.length < 6) {
    randomArr();
    while (arrayRandom.slice(0, 4).some(x => last.includes(x))) {
        randomArr();
    }
    arrayPets.push(arrayRandom);
    last = [arrayRandom[6], arrayRandom[7]];
}

const pagination = document.querySelector(".pets-cards");
function renderCard(pet) {
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

    pagination.appendChild(card);
    card.appendChild(cardImage);
    card.appendChild(cardTitle);
    card.appendChild(cardButton);

    card.addEventListener("click", () => {
        showPopup(pet);
    });
}

arrayPets[0].forEach(pet => {
  renderCard(pets[pet]);
});