var db = require('../conf/database');
var bcrypt = require('bcrypt');
const UserModel = {};

UserModel.create = (username, password, email) => {
    return bcrypt.hash(password, 10)
        .then((hashedPassword) => {
            let baseSQL = "INSERT INTO users (username, email, password, created) VALUES (?,?,?,now());";
            return db.execute(baseSQL,[username, email, hashedPassword])
        })
        .then(([results, fields]) => {
            if (results && results.affectedRows) {
                return Promise.resolve(results.insertId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });

}

UserModel.usernameExists = (username) => {
    return db.execute("SELECT * FROM csc317db.users WHERE username=?", [username])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length === 0));
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

UserModel.emailExists = (email) => {
    return db.execute("SELECT * FROM csc317db.users WHERE email=?", [email])
        .then(([results, fields]) => {
            return Promise.resolve(!(results && results.length === 0));
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

UserModel.authenticate = (username, password) => {
    let baseSQL = "SELECT id, username, password FROM users WHERE username=?;";
    let userId;

    return db.execute(baseSQL, [username])
        .then(([results, fields]) => {
            if (results && results.length === 1) {
                let hashedPassword = results[0].password;
                userId = results[0].id;
                return bcrypt.compare(password, hashedPassword);
            } else {
                return Promise.reject(-1);
            }
        })
        .then((passwordsMatched) => {
            if (passwordsMatched) {
                return Promise.resolve(userId);
            } else {
                return Promise.resolve(-1);
            }
        })
        .catch((err) => {
            return Promise.reject(err);
        });
}

module.exports = UserModel;