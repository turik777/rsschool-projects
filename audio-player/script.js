const tracks = [
    {title: "Roundabout", artist: "Yes", cover: "fragile"},
    {title: "The Chain", artist: "Fleetwood Mac", cover: "rumours"},
    {title: "La Femme Chinoise", artist: "Yellow Magic Orchestra", cover: "yellow-magic-orchestra"},
    { title: "Ecstasy", artist: "New Order", cover: "power-corruption-and-lies"},
    {title: "Plastic Love", artist: "Mariya Takeuchi", cover: "variety"},
    { title: "Secret", artist: "Orchestral Manoeuvres in the Dark", cover: "crash"},
    { title: "There Is a Light That Never Goes Out", artist: "The Smiths", cover: "the-queen-is-dead"},
    {title: "Only Love Can Break Your Heart", artist: "Saint Etienne", cover: "foxbase-alpha"},
    { title: "Fade Into You", artist: "Mazzy Star", cover: "so-tonight-that-i-might-see"},
    {title: "Yellow Hyper Balls", artist: "Merzbow", cover: "pulse-demon"},
    {title: "Heal", artist: "Pentagon", cover: "ico"},
    {title: "Theme of Laura", artist: "Akira Yamaoka", cover: "silent-hill-2"},
    {title: "Bad Reputation", artist: "The Radio Dept.", cover: "annie-laurie"},
    {title: "Obstacles", artist: "Syd Matters", cover: "someday-we-will-foresee-obstacles"},
    {title: "Get Innocuous!", artist: "LCD Soundsystem", cover: "sound-of-silver"},
    {title: "Souls of Mist", artist: "Shunsuke Kida", cover: "demons-souls"},
    {title: "Song of the Ancients", artist: "Kuniyuki Takahashi", cover: "nier-replicant"},
    {title: "Just a Habit", artist: "Low Roar", cover: "low-roar"},
    {title: "Crystals", artist: "M.O.O.N.", cover: "moon"},
    {title: "Aria Math", artist: "C418", cover: "minecraft"},
    {title: "Fleeting", artist: "Gustavo Santaolalla", cover: "the-last-of-us"},
    {title: "Black Ballerina", artist: "Ariel Pink", cover: "pom-pom"},
    {title: "Can't Leave the Night", artist: "BADBADNOTGOOD", cover: "iii"},
    {title: "Pain", artist: "Boy Harsher", cover: "lesser-man"},
    {title: "The Less I Know The Better", artist: "Tame Impala", cover: "currents"},
    {title: "Layer Cake", artist: "Shoji Meguro", cover: "persona-5"},
    {title: "Promises of Fertility", artist: "Huerco S.", cover: "for-those-of-you-who-have-never-and-also-those-who-have"},
    {title: "fullmoon", artist: "Ryuichi Sakamoto", cover: "async"},
    {title: "K.", artist: "Cigarettes After Sex", cover: "cigarettes-after-sex"},
    {title: "TSLAMP", artist: "MGMT", cover: "little-dark-age"},
    {title: "Once, There Was an Explosion", artist: "Ludvig Forssell", cover: "death-stranding"},
    {title: "EARFQUAKE", artist: "Tyler, the Creator", cover: "igor"}
];

const audio = document.getElementsByTagName("audio");
const play = document.querySelector(".play");

function pauseCheck() {
    if (play.classList.contains("pause")) {
        audio[0].play();
    } else {
        audio[0].pause();
    }
}

play.addEventListener("click", () => {
    play.classList.toggle("pause");
    pauseCheck();
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
const loop = document.querySelector(".loop");
const shuffle = document.querySelector(".shuffle");

function changeTrack(direction) {
    if (direction === backward) trackCount--;
    if (direction === forward) {
        if (shuffle.classList.contains("button-active")) {
            randomTrack(trackCount);
            trackCount--;
        }
        trackCount++;        
    }
    if (trackCount < 0) trackCount = tracks.length - 1;
    if (trackCount >= tracks.length) trackCount = 0;

    renderTrack();
    pauseCheck();

    timeValue = 0;
    maxTimeValue = Math.floor(audio[0].duration);
    progressBar.value = timeValue;
}
backward.addEventListener("click", (event) => changeTrack(event.target));
forward.addEventListener("click", (event) => changeTrack(event.target));

loop.addEventListener("click", () => {
    audio[0].loop = !audio[0].loop;
    loop.classList.toggle("button-active");
});

shuffle.addEventListener("click", () => {
    shuffle.classList.toggle("button-active");
});

function randomTrack(currentTrack) {
    trackCount = Math.floor(Math.random() * tracks.length);
    while (trackCount === currentTrack) trackCount = Math.floor(Math.random() * tracks.length);
}

const timeCurrent = document.querySelector(".time-current");
const timeTotal = document.querySelector(".time-total");
const progressBar = document.querySelector(".progress-bar");

let maxTimeValue = 0;
let timeValue = 0;
let minutesMax = 0;
let secondsMax = 0;

function convertCurrentTime() {
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
}

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
    convertCurrentTime();
    if (audio[0].ended) changeTrack(forward);
});

progressBar.addEventListener("mousedown", () => {
    audio[0].pause();
})
progressBar.addEventListener("input", (event) => {
    audio[0].currentTime = event.target.value;
    convertCurrentTime();
});
progressBar.addEventListener("mouseup", () => {
    pauseCheck();
});

const player = document.querySelector(".player");
const footer = document.querySelector(".footer");

pulse.addEventListener("click", () => {
    pulse.style.display = "none";
    player.style.display = "flex";
    footer.style.display = "flex";
    setTimeout(() => player.classList.toggle("active"), 10);
    setTimeout(() => footer.classList.toggle("active"), 10);
});

document.body.addEventListener("click", (event) => {
    if (event.target === document.body) {
        player.classList.remove("active");
        footer.classList.remove("active");
        pulse.style.display = "block";
        setTimeout(() => player.style.display = "none", 500);
        setTimeout(() => footer.style.display = "none", 500);
    }
});