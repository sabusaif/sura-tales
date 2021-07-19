const username = document.getElementById("reg-user-input");
const password = document.getElementById("reg-pass-input");
const confirmPassword = document.getElementById("confirm-pass-input");

username.onfocus = function() {
    document.getElementById("validateUser").style.display = "grid";
}

username.onblur = function() {
    document.getElementById("validateUser").style.display = "none";
}

password.onfocus = function() {
    document.getElementById("validatePass").style.display = "grid";
}

password.onblur = function() {
    document.getElementById("validatePass").style.display = "none";
}

confirmPassword.onfocus = function() {
    document.getElementById("confirmPass").style.display = "grid";
}

confirmPassword.onblur = function() {
    document.getElementById("confirmPass").style.display = "none";
}

username.onkeyup = function() {
    validateUserFirstChar();
    validateUserLengthAndAlpha();
}

password.onkeyup = function() {
    validatePassLength();
    validatePassUppercase();
    validatePassNumber();
    validatePassSpecialChar();
}

confirmPassword.onkeyup = function() {
    confirmPass();
}

let userChar = document.getElementById("user-char");
let userValid = document.getElementById("user-length");
let passLength = document.getElementById("pass-length");
let passUpper = document.getElementById("pass-upper");
let passNumber = document.getElementById("pass-number");
let passSpecial = document.getElementById("pass-special");
let checkPass = document.getElementById("confirm-password");

document.getElementById("reg-submit").addEventListener("click", function(submit) {
    if (validateUserFirstChar() === false || validateUserLengthAndAlpha() === false || validatePassLength() === false
        || validatePassUppercase() === false || validatePassNumber() === false
        || validatePassSpecialChar() === false || confirmPass() === false) {
        submit.preventDefault();
        alert("Submission is invalid.");
    }
});

function validateUserFirstChar() {
    if (username.value.charAt(0).match(/[a-zA-Z]/)) {
        userChar.className = "valid";
        return true;
    } else {
        userChar.className = "invalid";
        return false;
    }
}

function validateUserLengthAndAlpha() {
    if (username.value.length >= 3 && (/\d/.test(username.value)
        || /[a-zA-Z]/.test(username.value))) {
        userValid.className = "valid";
        return true;
    } else {
        userValid.className = "invalid";
        return false;
    }
}

function validatePassLength() {
    if (password.value.length >= 8) {
        passLength.className = "valid";
        return true;
    } else {
        passLength.className = "invalid";
        return false;
    }
}

function validatePassUppercase() {
    if (/[A-Z]/.test(password.value)) {
        passUpper.className = "valid";
        return true;
    } else {
        passUpper.className = "invalid";
        return false;
    }
}

function validatePassNumber() {
    if (/\d/.test(password.value)) {
        passNumber.className = "valid";
        return true;
    } else {
        passNumber.className = "invalid";
        return false;
    }
}

function validatePassSpecialChar() {
    if (password.value.includes("/") || password.value.includes("*")
        || password.value.includes("-") || password.value.includes("+")
        || password.value.includes("!") || password.value.includes("@")
        || password.value.includes("#") || password.value.includes("$")
        || password.value.includes("^") || password.value.includes("&")) {
        passSpecial.className = "valid";
        return true;
    } else {
        passSpecial.className = "invalid";
        return false;
    }
}

function confirmPass() {
    if (password.value === confirmPassword.value) {
        checkPass.className = "valid";
        return true;
    } else {
        checkPass.className = "invalid";
        return false;
    }
}