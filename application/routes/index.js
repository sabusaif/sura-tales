var express = require('express');
var router = express.Router();
var isLoggedIn = require('../middleware/routeprotector').userIsLoggedIn;
const {getRecentPosts, getPostById} = require('../middleware/postmiddleware');
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

router.get('/post/:id(\\d+)', getPostById, (req, res, next) => {
  res.render('imagepost', { title: `Post ${req.params.id}` });
});

module.exports = router;
