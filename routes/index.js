var express = require('express');
var router = express.Router();
const formationModel = require("./../models/Formation");


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Accueil' });
  });
   
/* GET formations page. */

router.get('/formations', function(req, res, next) {
    formationModel
    .find()
    .then((dbRres) => {
    res.render('formations', { formations: dbRres });
  })
  .catch(next);
  });

/* GET contact page. */
router.get('/contact', function(req, res, next) {
    res.render('contact', { title: 'contact' });
  });

/* GET sur mesure page. */
router.get('/Sur-mesure', function(req, res, next) {
    res.render('Sur-mesure', { title: 'sur-mesure' });
  });

  module.exports = router;

