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
const pulse = document.querySelector(".pulse");

let trackCount = Math.floor(Math.random() * tracks.length);
function renderTrack() {
    audio[0].src = `assets/audio/${tracks[trackCount].title.toLowerCase().split(" ").join("-")}.mp3`;
    title.textContent = `${tracks[trackCount].title}`;
    artist.textContent = `${tracks[trackCount].artist}`;
    cover.style.background = `url(assets/img/${tracks[trackCount].cover}.png) center / cover`;
    pulse.style.background = cover.style.background;
    document.body.style.background = `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(assets/img/${tracks[trackCount].cover}.png) center / 260px`;
}
renderTrack();

const backward = document.querySelector(".backward");
const forward = document.querySelector(".forward");

function changeTrack(direction) {
    if (direction === backward) trackCount--;
    if (direction === forward) trackCount++;
    if (trackCount < 0) trackCount = tracks.length - 1;
    if (trackCount >= tracks.length) trackCount = 0;

    renderTrack();

    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }

    timeValue = 0;
    maxTimeValue = Math.floor(audio[0].duration);
    progressBar.value = timeValue;
}
backward.addEventListener("click", (event) => changeTrack(event.target));
forward.addEventListener("click", (event) => changeTrack(event.target));

const timeCurrent = document.querySelector(".time-current");
const timeTotal = document.querySelector(".time-total");
const progressBar = document.querySelector(".progress-bar");

let maxTimeValue = 0;
let timeValue = 0;
let minutesMax = 0;
let secondsMax = 0;

audio[0].addEventListener("loadeddata", () => {
    maxTimeValue = Math.floor(audio[0].duration);   
    minutesMax = Math.floor(maxTimeValue / 60);
    secondsMax = maxTimeValue % 60;

    if (secondsMax < 10) {
        timeTotal.textContent = `${minutesMax}:0${(secondsMax)}`;
    } else {
        timeTotal.textContent = `${minutesMax}:${(secondsMax)}`;
    }

    progressBar.max = `${maxTimeValue}`;
});
audio[0].addEventListener("timeupdate", () => {
    timeValue = Math.floor(audio[0].currentTime);
    let minutes = Math.floor(audio[0].currentTime / 60);
    let seconds = timeValue % 60;

    if (seconds < 10) {
        timeCurrent.textContent = `${minutes}:0${seconds}`;
    } else {
        timeCurrent.textContent = `${minutes}:${seconds}`;
    }
    if (seconds > secondsMax && minutes >= minutesMax) timeCurrent.textContent = timeTotal.textContent;
    
    progressBar.value = timeValue;

    if (audio[0].ended) {
        changeTrack(forward);
    }
});

progressBar.addEventListener("mousedown", () => {
    audio[0].pause();
})
progressBar.addEventListener("input", (event) => {
    audio[0].currentTime = event.target.value;
    timeValue = Math.floor(audio[0].currentTime);
    let minutes = Math.floor(audio[0].currentTime / 60);
    let seconds = timeValue % 60;
    
    if (seconds < 10 ) {
        timeCurrent.textContent = `${minutes}:0${seconds}`;
    } else {
        timeCurrent.textContent = `${minutes}:${seconds}`;
    }
    if (seconds > secondsMax && minutes >= minutesMax) timeCurrent.textContent = timeTotal.textContent;
});
progressBar.addEventListener("mouseup", () => {
    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
});

const player = document.querySelector(".player");

pulse.addEventListener("click", () => {
  pulse.style.display = "none";
  player.style.display = "flex";
  setTimeout(() => player.classList.toggle("active"), 10);
});

document.body.addEventListener("click", (event) => {
  if (event.target === document.body) {
      player.classList.remove("active");
      pulse.style.display = "block";
      setTimeout(() => player.style.display = "none", 500);
  }
});