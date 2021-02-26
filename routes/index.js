const express = require('express');
const router = express.Router();

class Destination {
  constructor(src, title, description) {
    this.src = src;
    this.title = title;
    this.description = description;
  }
}

class Car {
  constructor(src, title, description) {
    this.src = src;
    this.title = title;
    this.description = description;
  }
}

const destinations = [
  new Destination('images/gaspesie.jpg', 'La Gaspésie', ''),
  new Destination('images/mont_tramblant.jpg', 'Le Mont Tramblant', ''),
  new Destination('images/quebec.jpg', 'Quebec', ''),
  new Destination('images/hiver_quebec.jpg', 'L\'expérience hivernale', '')
]

//TODO: lier ces donnees a la bd
const cars = [
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  new Car('images_bd/jaguar_i-pace.jpg', 'Jaguar I-Pace', ''),
  
]

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { destinations, cars });
});

module.exports = router;
