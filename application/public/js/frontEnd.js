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