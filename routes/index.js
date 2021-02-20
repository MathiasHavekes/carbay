var express = require('express');
var router = express.Router();

var destination_pictures = ['images\\gaspesie.jpg', 'images\\mont_tramblant.jpg', 'images\\quebec.jpg', 'images\\hiver_quebec.jpg'];
var destination_titles = ['La Gaspesie', 'Le Mont Tramblant', 'Quebec'];
var destination_descriptions = ['', '', ''];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { destination_pictures });
});

module.exports = router;
