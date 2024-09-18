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

const title = document.querySelector(".song-title");
const artist = document.querySelector(".song-artist");
const cover = document.querySelector(".song-cover");

let trackCount = Math.floor(Math.random() * tracks.length);
function renderTrack() {
    audio[0].src = `assets/audio/${tracks[trackCount].title.toLowerCase().split(" ").join("-")}.mp3`;
    title.textContent = `${tracks[trackCount].title}`;
    artist.textContent = `${tracks[trackCount].artist}`;
    cover.style.background = `url(assets/img/${tracks[trackCount].cover}.png) center / cover`;
}
renderTrack();

const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");

function previousTrack() {
    trackCount--;
    if (trackCount < 0) {
        trackCount = tracks.length - 1;
    }
    renderTrack();

    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
}
backward.addEventListener("click", previousTrack);

function nextTrack() {
    trackCount++;
    if (trackCount >= tracks.length) {
        trackCount = 0;
    }
    renderTrack();

    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
}
forward.addEventListener("click", nextTrack);