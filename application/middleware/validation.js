const checkUsername = (username) => {
    let usernameChecker = /^\D\w{2,}$/;
    return usernameChecker.test(username);
};

const checkPassword = (password) => {
    let passwordChecker = /(?=.*\d)(?=.*[A-Z])(?=.*[\/*+!@#$^%-]).{8,}/;
    return passwordChecker.test(password);
};

const checkEmail = (email) => {
    let emailChecker = /\w[@][a-zA-Z]+[.][a-zA-Z]/;
    return emailChecker.test(email);
};

const checkNotEmpty = (title) => {
    let titleChecker = /^(?!\s*$).+/;
    return titleChecker.test(title);
};

const registerUsernameValidator = (req, res, next) => {
    let username = req.body.username;
    if (!checkUsername(username)) {
        req.flash('error', 'Invalid username!');
        req.session.save(err => {
            res.redirect("/register");
        });
    } else {
        next();
    }
};

const registerPasswordValidator = (req, res, next) => {
    let password = req.body.password;
    if (!checkPassword(password)) {
        req.flash('error', 'Invalid password!');
        req.session.save(err => {
            res.redirect("/register");
        });
    } else {
        next();
    }
};

const registerEmailValidator = (req, res, next) => {
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

const loginUsernameValidator = (req, res, next) => {
    let username = req.body.username;
    if (!checkNotEmpty(username)) {
        req.flash('error', 'Invalid username!');
        req.session.save(err => {
            res.redirect("/login");
        });
    } else {
        next();
    }
};

const loginPasswordValidator = (req, res, next) => {
    let password = req.body.password;
    if (!checkNotEmpty(password)) {
        req.flash('error', 'Invalid password!');
        req.session.save(err => {
            res.redirect("/login");
        });
    } else {
        next();
    }
};

const postImageTitleValidator = (req, res, next) => {
    let title = req.body.title;
    if (!checkNotEmpty(title)) {
        req.flash('error', 'Invalid title!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }
};

const postImageDescriptionValidator = (req, res, next) => {
    let description = req.body.description;
    if (!checkNotEmpty(description)) {
        req.flash('error', 'Invalid description!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }
};

const postImageValidator = (req, res, next) => {
    if (!req.file) {
        req.flash('error', 'Invalid image!');
        req.session.save(err => {
            res.redirect("/post_image");
        });
    } else {
        next();
    }
};

module.exports = {registerUsernameValidator, registerPasswordValidator, registerEmailValidator,
    loginUsernameValidator, loginPasswordValidator, postImageTitleValidator,
    postImageDescriptionValidator, postImageValidator};