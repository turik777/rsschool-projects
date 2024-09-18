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