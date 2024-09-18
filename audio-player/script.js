const tracks = [
    { title: "Ecstasy", artist: "New Order", cover: "power-corruption-and-lies"},
    { title: "Bad Reputation", artist: "The Radio Dept.", cover: "annie-laurie"},
    { title: "Black Ballerina", artist: "Ariel Pink", cover: "pom-pom"}
];

const audio = document.getElementsByTagName("audio");
const play = document.querySelector(".play");

play.addEventListener("click", () => {
    play.classList.toggle("pause");

    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
});