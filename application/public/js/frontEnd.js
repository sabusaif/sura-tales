/*
if (document.cookie.includes('logged')) {
    console.log("user is logged");
    let ele = document.getElementById('logging-button');
    ele.innerHTML = "Log Out";
    ele.setAttribute("href", "/usermgnt/logout");
} else {
    let ele = document.getElementById('logging-button');
    ele.innerHTML = "Log In";
    ele.setAttribute("href", "/login");
}
 */


function setFlashMessageFadeOut(flashMessageElement) {
    let time = setTimeout(() => {
        let currentOpacity = 1.0;
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashMessageElement.style.opacity = currentOpacity;
        }, 50);
        flashMessageElement.onmousemove = function() {
            currentOpacity = 1.0;
            flashMessageElement.style.opacity = currentOpacity;
            clearInterval(timer);
            clearTimeout(time);
        }
        flashMessageElement.onmouseleave = function() {
            clearInterval(timer);
            setFlashMessageFadeOut(flashMessageElement);
        }
    }, 4000);
}

function addFlashFromFrontEnd(message) {
    let flashMessageDiv = document.createElement("div");
    let innerFlashDiv = document.createElement("div");
    let innerFlashA = document.createElement("a");
    let innerJquery = document.createElement("script");
    let innerBootstrap = document.createElement("script");

    let innerTextNode = document.createTextNode(message);
    innerFlashA.innerHTML = "&times;";

    innerFlashDiv.appendChild(innerFlashA);
    innerFlashDiv.appendChild(innerTextNode);

    flashMessageDiv.appendChild(innerFlashDiv);
    flashMessageDiv.appendChild(innerJquery);
    flashMessageDiv.appendChild(innerBootstrap);

    flashMessageDiv.setAttribute("id", "flash-message");
    innerFlashDiv.setAttribute("id", "info");
    innerFlashDiv.setAttribute("class", "alert alert-info alert-dismissible close");

    innerFlashA.setAttribute("class", "close dismiss");
    innerFlashA.setAttribute("data-dismiss", "alert");
    innerFlashA.setAttribute("aria-label", "close");

    innerJquery.setAttribute("src", "https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js");
    innerBootstrap.setAttribute("src", "https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js");

    document.getElementsByTagName("body")[0].appendChild(flashMessageDiv);
    setFlashMessageFadeOut(flashMessageDiv);
}

function createCard(postData) {
    return `<div id="${postData.id}" class="card">
        <img class="card-image" src="${postData.thumbnail}" alt="missing image">
        <div class="card-body">
            <p class="card-title">${postData.title}</p>
            <p class=card-text">${postData.description}</p>
            <a href="/post/${postData.id}" class="anchor-buttons">Post Details</a>
        </div>
    </div>`
}

function executeSearch() {
    let searchTerm = document.getElementById("search-photo").value;
    if (!searchTerm) {
        location.replace('/');
    }
    let mainContent = document.getElementById("main-content");
    let searchURL = `/posts/search?search=${searchTerm}`;
    fetch(searchURL)
    .then((data) => {
        return data.json();
    })
    .then((data_json) => {
        let newMainContentHTML = '';
        data_json.results.forEach((row) => {
            newMainContentHTML += createCard(row);
        });
        mainContent.innerHTML = newMainContentHTML;
        if (data_json.message) {
            addFlashFromFrontEnd(data_json.message);
        }
    })
    .catch((err) => {
        console.log(err);
    });

}

let flashElement = document.getElementById("flash-message");
if (flashElement) {
    setFlashMessageFadeOut(flashElement);
}

let searchButton = document.getElementById("search-button");
if (searchButton) {
    searchButton.onclick = executeSearch;
}