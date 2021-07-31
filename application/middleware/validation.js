const checkUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
};

const checkPassword = (password) => {
    let passwordChecker = /(?=.*\d)(?=.*[A-Z])(?=.*[\/*+!@#$^%-]).{8,}/;
    return passwordChecker.test(password);
};

const checkEmail = (email) => {
    let emailChecker = /[@][a-zA-Z]+[.]/;
    return emailChecker.test(email);
};

const checkTitle = (title) => {
    let titleChecker = /^(?!\s*$).+/;
    return titleChecker.test(title);
}

function usernameValid(req, res, next, page) {
    let username = req.body.username;
    if (!checkUsername(username)) {
        req.flash('error', 'Invalid username!');
        req.session.save(err => {
            res.redirect(page);
        });
    } else {
        next();
    }
}

function passwordValid(req, res, next, page) {
    let password = req.body.password;
    if (!checkPassword(password)) {
        req.flash('error', 'Invalid password!');
        req.session.save(err => {
            res.redirect(page);
        });
    } else {
        next();
    }
}

const registerValidator = (req, res, next) => {
    usernameValid(req, res, next, "/register");
    passwordValid(req, res, next, "/register");

    let email = req.body.email;
    if (!checkEmail(email)) {
        req.flash('error', 'Invalid email!');
        req.session.save(err => {
            res.redirect("/register");
        });
    } else {
        next();
    }
};

const loginValidator = (req, res, next) => {
    usernameValid(req, res, next, "/login");
    //passwordValid(req, res, next, "/login");
};

const postImageValidator = (req, res, next) => {
    let title = req.body.title;
    if (!checkTitle(title)) {
        req.flash('error', 'Invalid title!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }

    let description = req.body.description;
    if (!checkTitle(description)) {
        req.flash('error', 'Invalid description!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }

    let image = req.file.filename;
    if (!checkTitle(image)) {
        req.flash('error', 'Invalid image!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }
};

module.exports = {registerValidator, loginValidator, postImageValidator};