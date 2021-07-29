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

let currentOpacity = 1.0;

function setFlashMessageFadeOut() {
    let time = setTimeout(() => {
        let timer = setInterval(() => {
            if (currentOpacity < 0.05) {
                clearInterval(timer);
                flashElement.remove();
            }
            currentOpacity = currentOpacity - 0.05;
            flashElement.style.opacity = currentOpacity;

            flashElement.onmousemove = function() {
                currentOpacity = 1.0;
                flashElement.style.opacity = currentOpacity;
                clearInterval(timer);
                clearTimeout(time);
            }
        }, 50);
        flashElement.onmouseleave = function() {
            clearInterval(timer);
            setFlashMessageFadeOut();
        }
    }, 4000);
}

let flashElement = document.getElementById('flash-message');

if (flashElement) {
    setFlashMessageFadeOut();
}