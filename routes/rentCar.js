const express = require("express");
const router = express.Router();
const pool = require("../public/javascripts/dbConnection");
var carNumber = 0;
var cars = [];
var locations = [];

class Car {
  constructor({
    ID_VOITURE,
    PLAQUE_IMMATRICULATION,
    MODELE,
    COULEUR,
    ETAT,
    URL_IMAGE,
    DESCRIPTION_VOITURE,
    PRIX_PAR_JOUR,
    CENTRE_POSITION,
  }) {
    this.id = ID_VOITURE;
    this.model = MODELE;
    this.color = COULEUR;
    this.location = CENTRE_POSITION;
  }
}

class Location {
  constructor({ ID_CENTRE, NOM, ADRESSE, LAT, LNG }) {
    this.id = ID_CENTRE;
    this.name = NOM;
    this.adress = ADRESSE;
    this.lat = LAT;
    this.lng = LNG;
  }
}

class Rental {
  constructor({
    ID_LOCATION,
    PRIX,
    DATE_DEPART,
    DATE_ARRIVEE,
    ID_CLIENT,
    ID_VOITURE,
    CENTRE_DEPART,
    CENTRE_ARRIVEE,
  }) {
    this.price = PRIX;
    this.startDate = DATE_DEPART;
    this.endDate = DATE_ARRIVEE;
    this.client = ID_CLIENT;
    this.car = ID_VOITURE;
    this.startLocation = CENTRE_DEPART;
    this.endLocation = CENTRE_ARRIVEE;
  }
}

pool.getConnection(function (err, connection) {
  if (err) throw err;

  connection.query(
    "SELECT * FROM VOITURE WHERE ETAT = ? ORDER BY MODELE",
    ["libre"],
    function (err, results, fields) {
      if (err) throw err;
      results.forEach((car) => {
        cars.push(new Car(car));
      });
    }
  );

  connection.query("SELECT * FROM CENTRE", function (err, results, fields) {
    if (err) throw err;
    results.forEach((location) => {
      locations.push(new Location(location));
    });
  });
  connection.release();
});

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("rentCar", { cars, locations });
});

router.post("/", function (req, res, next) {
  console.log(req.body);
  const rental = new Rental(
    50,
    req.body.startDate,
    req.body.endDate,
    1,
    req.body.car,
    req.body.startLocation,
    req.body.endtLocation
  );

  console.log(req.body.startDate);
  console.log(req.body.startLocation);
  console.log(rental);
  res.redirect("/rent/car");
});

module.exports = router;
