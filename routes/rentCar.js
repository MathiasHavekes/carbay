const express = require('express');
const router = express.Router();
const mysql = require('mysql');
const nbVoiture = 4;
var tableVoitures = [];


class Car {
  constructor(Plaque, modele, couleur, etat) {
    this.Plaque = Plaque;
    this.modele = modele;
    this.couleur = couleur;
    this.etat = etat;
  }
}


var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "testdb"
});

con.connect(function(err) {
  if (err) throw err;
  con.query("SELECT * FROM voitures", function (err, result, fields) {
    if (err) throw err;

    for(i=0 ; i < nbVoiture; i++)
    {
      tableVoitures.push(new Car(result[i].Plaque, result[i].modele, result[i].couleur, result[i].etat));
    }
    console.log(tableVoitures);
  });

});
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('rentCar');
});

module.exports = router;