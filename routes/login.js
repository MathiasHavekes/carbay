const express = require("express");
const router = express.Router();
const pool = require("../public/javascripts/dbConnection");

var isOnline = (userId) => {
  if (userId >= 0) {
    return true;
  } else {
    return false;
  }
};

router.get("/", (req, res, next) => {
  res.render("login", {
    succes: false,
    errors: req.session.errors,
    userId: isOnline(req.session.userId),
  });
  req.session.errors = null;
});

router.post("/submit", (req, res, next) => {
  const { email, password } = req.body;

  pool.getConnection((err, connection) => {
    if (err) throw err;
    connection.query(
      "SELECT ID_CLIENT FROM client WHERE EMAIL= ? and MOT_DE_PASSE =?",
      [email, password],
      (err, results, fields) => {
        if (err) throw err;
        if (results.length > 0) {
          req.session.userId = results[0].ID_CLIENT;
          res.redirect("/");
        } else {
          res.redirect("/logIn");
        }
      }
    );
    connection.release();
  });
});

module.exports = router;
