const express = require("express");
const router = express.Router();
const pool = require("../public/javascripts/dbConnection");
const enLocation = "enLocation";
var cars = [];
var locations = [];
var pricePerDays = 0;

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

pool.getConnection((err, connection) => {
  if (err) throw err;

  connection.query(
    "SELECT * FROM VOITURE WHERE ETAT = ? ORDER BY MODELE",
    ["libre"],
    (err, results, fields) => {
      if (err) throw err;
      results.forEach((car) => {
        cars.push(new Car(car));
      });
    }
  );

  connection.query("SELECT * FROM CENTRE", (err, results, fields) => {
    if (err) throw err;
    results.forEach((location) => {
      locations.push(new Location(location));
    });
  });
  connection.release();
});

var redirectSignUp = (req, res, next) => {
  if (!req.session.userId) {
    res.redirect("/signUp");
  } else {
    next();
  }
};

var calculPrice = (startDate, endDate, pricePerDays) => {
  firstDate = new Date(startDate);
  secondDate = new Date(endDate);

  var timeDiff = Math.abs(secondDate.getTime() - firstDate.getTime());
  var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
  return diffDays * pricePerDays;
};

var isOnline = (userId) => {
  if (userId >= 0) {
    return true;
  } else {
    return false;
  }
};

router.get("/", redirectSignUp, (req, res, next) => {
  res.render("rentCar", {
    cars,
    locations,
    userId: isOnline(req.session.userId),
  });
});

router.post("/submit", redirectSignUp, (req, res, next) => {
  const { startDate, endDate, endLocation, startLocation, car } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT PRIX_PAR_JOUR FROM VOITURE WHERE ID_VOITURE= ?",
      req.body.car,
      (err, results, fields) => {
        if (err) throw err;
        pricePerDays = results[0].PRIX_PAR_JOUR;
      }
    );
    connection.release();
  });

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "INSERT INTO LOCATION_VOITURE SET ?",
      {
        PRIX: calculPrice(startDate, endDate, pricePerDays),
        DATE_DEPART: startDate,
        DATE_ARRIVEE: endDate,
        ID_CLIENT: req.session.userId,
        ID_VOITURE: car,
        CENTRE_DEPART: startLocation,
        CENTRE_ARRIVEE: endLocation,
      },
      (err, results, fields) => {
        if (err) throw err;
      }
    );

    connection.query(
      "UPDATE VOITURE SET ETAT= ?, CENTRE_POSITION= ? WHERE ID_VOITURE= ?",
      {
        ETAT: enLocation,
        CENTRE_POSITION: endLocation,
        ID_VOITURE: car,
      },
      (err, results, fields) => {
        if (err) throw err;
      }
    );
    res.redirect("/rent/car");
    connection.release();
  });
});

module.exports = router;
