const url = "https://api.unsplash.com/search/photos?query=snow&per_page=30&client_id=ThYeM-_FbWyhJU9sDl9Xw5_KxxCkgdHVCy7KITRyzvA";

async function getData(url) {
    const res = await fetch(url);
    const data = await res.json();

    if (data.results.length === 0) {
        imageGrid.textContent = "No images found";
    }
    
    data.results.map(data => renderImage(data));
}

getData(url);

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