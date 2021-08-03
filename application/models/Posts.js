var db = require("../conf/database");
const PostModel = {};

PostModel.create = (title, description, photoPath, thumbnail, fk_userId) => {
    let baseSQL = "INSERT INTO posts (title, description, photopath, thumbnail, created, fk_userid) VALUE (?,?,?,?,now(),?);";
    return db.execute(baseSQL, [title, description, photoPath, thumbnail, fk_userId])
        .then(([results, fields]) => {
            return Promise.resolve(results && results.affectedRows);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

PostModel.search = (searchTerm) => {
    let baseSQL = "SELECT id, title, description, thumbnail, concat_ws(' ', title, description) AS haystack FROM posts HAVING haystack like ?;";
    let sqlReadySearchTerm = "%" + searchTerm + "%";

    return db.execute(baseSQL, [sqlReadySearchTerm])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

PostModel.getNRecentPosts = (numberOfPost) => {
    let baseSQl = "SELECT id, title, description, thumbnail, created FROM posts ORDER BY created DESC LIMIT ?;";

    // changed from execute to query because I was given the error "incorrect arguments to mysqld_stmt_execute"
    return db.query(baseSQl, [numberOfPost])
        .then(([results, fields]) => {
            return Promise.resolve(results);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

PostModel.getPostById = (postId) => {
    let baseSQL = "SELECT u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id=fk_userid WHERE p.id=?;";

    return db.execute(baseSQL, [postId])
        .then(([results, field]) => {
            return Promise.resolve(results);
        })
        .catch((err) => {
            return Promise.reject(err);
        });
};

module.exports = PostModel;