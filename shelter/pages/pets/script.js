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
