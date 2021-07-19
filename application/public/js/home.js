let main = document.getElementById("container");
let count = 0;

if(main) {
    let fetchUrl = "https://jsonplaceholder.typicode.com/albums/2/photos"
    fetch(fetchUrl)
        .then(data => {
            return data.json()
        })
        .then(photos => {
           photos.forEach(photo => {
               count++;
               createPhotoCard(photo, count);
           });
           counter();
        })
}

function counter() {
    document.getElementById("items-count").innerHTML = "There are " + count + " photo(s) being shown";
}

function createPhotoCard(data, count) {
    let div = document.createElement("div");
    div.setAttribute("id", "photo-" + count);
    div.setAttribute("class", "section");
    div.setAttribute("onclick", "fadeOut(this.id);");
    document.getElementById("container").appendChild(div);

    let image = document.createElement("IMG");
    image.setAttribute("src", data.url);
    image.setAttribute("width", "250px");
    image.setAttribute("height", "250px");
    image.setAttribute("class", "images");
    document.getElementById("photo-" + count).appendChild(image);

    let description = document.createElement("P");
    description.innerHTML = data.title;
    description.setAttribute("class", "descriptions");
    document.getElementById("photo-" + count).appendChild(description);
}

function fadeOut(photo) {
    let fadeImage = document.getElementById(photo);
    fadeImage.style.opacity = '0';
    fadeImage.addEventListener('transitionend', () => {
        fadeImage.remove();
    });
    setTimeout(() => {
        count--;
        counter();
    }, 500);
}