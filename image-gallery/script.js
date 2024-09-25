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