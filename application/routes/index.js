var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
var getRecentPosts = require('../middleware/postmiddleware').getRecentPosts;
var db = require("../conf/database");

/* GET home page. */
router.get('/', getRecentPosts, function(req, res, next) {
  res.render('index', { title: 'Sura Tales'});
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login'});
});

router.get('/register', (req, res, next) => {
  res.render('registration', { title: 'Registration'});
});

router.use('/post_image', isLoggedIn);
router.get('/post_image', (req, res, next) => {
  res.render('postimage', { title: 'Post Image'});
});

router.get('/post/:id(\\d+)', (req, res, next) => {
  let baseSQL = "SELECT u.username, p.title, p.description, p.photopath, p.created FROM users u JOIN posts p ON u.id=fk_userid WHERE p.id=?;";
  let postId = req.params.id;

  db.execute(baseSQL, [postId])
  .then(([results, field]) => {
    if (results && results.length) {
      let post = results[0];
      res.render('imagepost', {currentPost: post});
    } else {
      req.flash('error', 'This is not the post you are looking for!');
      req.session.save( err => {
        res.redirect('/');
      });
    }
  })
});

module.exports = router;
