import pets from "../../assets/data/pets.js"

let cooldown = false;

const burger = document.querySelector(".burger-icon");
const menu = document.querySelector(".menu");
const menuBackground = document.querySelector(".menu-background");
const menuLinks = document.querySelectorAll(".menu-link");

function showMenu() {
    if (cooldown) return;
    cooldown = true;

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

    setTimeout(() => cooldown = false, 500);
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

let length = 0;
["load", "resize"].forEach((event) => {
    window.addEventListener(event, () => {
        const cards1280 = document.querySelectorAll(".pets-cards .pets-card:last-child");
        const cards768 = document.querySelectorAll(".pets-cards .pets-card:nth-child(2)");
        if (document.documentElement.clientWidth < 768  && length !== 1) {
            cards1280.forEach(card => card.style.display = "none");
            cards768.forEach(card => card.style.display = "none");
            length = 1;
            transition();
        } else if (document.documentElement.clientWidth >= 768 && document.documentElement.clientWidth < 1280 && length !== 2) {
            cards1280.forEach(card => card.style.display = "none");
            cards768.forEach(card => {
                if (card.style.display === "none") card.style.display = "flex";  
            })
            length = 2;
            transition();
        } else if (document.documentElement.clientWidth >= 1280 && length !== 3) {
            cards1280.forEach(card => {
                if (card.style.display === "none") card.style.display = "flex";
            })
            cards768.forEach(card => {
                if (card.style.display === "none") card.style.display = "flex";
            })
            length = 3;
            transition();
        }
    });
})

function transition() {
    const cards = document.querySelectorAll(".pets-cards");
    cards.forEach(card => {
        card.style.transition = "none";
        setTimeout(() => card.style.transition = "1s", 100);
    })
}

let countL = 1;
let countR = 1;
buttons[1].addEventListener("click", () => {
    if (cooldown) return;
    cooldown = true;

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

    setTimeout(() => cooldown = false, 850);
});

buttons[0].addEventListener("click", () => {
    if (cooldown) return;
    cooldown = true;
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

    setTimeout(() => cooldown = false, 850);
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

const popup = document.querySelector(".popup");
const popupClose = document.querySelector(".popup-close");

function showPopup(pet) {
    popup.style.display = "flex";
    document.querySelector("html").classList.add("overflow-hidden");

    const popupImage = document.querySelector(".popup-image img");
    const popupTitle = document.querySelector(".popup-title");
    const popupSubtitle = document.querySelector(".popup-subtitle");
    const popupDescription = document.querySelector(".popup-description");
    const popupInfo = document.querySelectorAll(".popup-info");

    popupImage.src = pet.img;
    popupTitle.textContent = pet.name;
    popupSubtitle.textContent = pet.type + " - " + pet.breed;
    popupDescription.textContent = pet.description;
    popupInfo[0].textContent = pet.age;
    popupInfo[1].textContent = pet.inoculations.join(", ");
    popupInfo[2].textContent = pet.diseases.join(", ");
    popupInfo[3].textContent = pet.parasites.join(", ");
}

popup.addEventListener("click", (event) => {
    if (event.target === popup) {
        popup.style.display = "none";
        document.querySelector("html").classList.remove("overflow-hidden");
    }
});

popupClose.addEventListener("click", () => {
    popup.style.display = "none";
    document.querySelector("html").classList.remove("overflow-hidden");
});