var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Sura Tales', name:"Sarah Abusaif" });
});

router.get('/login', (req, res, next) => {
  res.render('login', { title: 'Login', name:"Sarah Abusaif" });
});

router.get('/register', (req, res, next) => {
  res.render('registration', { title: 'Registration', name:"Sarah Abusaif" });
});

router.get('/post_image', (req, res, next) => {
  res.render('postimage', { title: 'Post Image', name:"Sarah Abusaif" });
});

router.get('/image_post', (req, res, next) => {
  res.render('imagepost', { title: 'Image Post', name:"Sarah Abusaif" });
});

module.exports = router;
