async function getData(url) {
    const data = await (await fetch(url)).json();

    if (data.results.length === 0) imageGrid.textContent = "No images found";
    
    data.results.map(data => renderImage(data));
}

const imageGrid = document.querySelector(".image-grid");
function renderImage(data) {
    const imageContainer = document.createElement("div");
    const imageLink = document.createElement("a");
    const image = document.createElement("img");

    imageContainer.classList.add("image-container");
    image.classList.add("image");

    imageLink.href = data.urls.raw;
    imageLink.target = "_blank";
    image.src = data.urls.regular;
    image.alt = data.alt_description;

    imageGrid.appendChild(imageContainer);
    imageContainer.appendChild(imageLink);
    imageLink.appendChild(image);
}

const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

searchInput.addEventListener("keypress", (event) => {
    if (event.key === "Enter") searchImage(searchInput.value);
});

searchButton.addEventListener("click", () => {
    if (searchInput.value === "") return;
    searchImage(searchInput.value);
});

function searchImage(search) {
    const url = `https://api.unsplash.com/search/photos?query=${search}&per_page=30&client_id=ThYeM-_FbWyhJU9sDl9Xw5_KxxCkgdHVCy7KITRyzvA`;
    imageGrid.innerHTML = "";
    getData(url);
}

searchImage("universe");