const express = require("express");
const authController = require('../public/javascripts/cont.js');
const router = express.Router();

class User {
    constructor({ID_CLIENT, NOM, PRENOM, EMAIL, TELEPHONE, NUMERO_CB, MOT_DE_PASSE}){
      this.id = ID_CLIENT;
      this.email = EMAIL;
      this.password = MOT_DE_PASSE;
    }
  }

router.get('/', (req,res)=>{
    res.render('login',{message : "Connexion "});
});

router.post('/signup', (req, res, next)=>{
    const user = new User({
        email: req.body.email,
        password: req.body.password
    });
});


//router.post('/', authController.register);

module.exports = router;