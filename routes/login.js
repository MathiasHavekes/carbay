const express = require("express");
const authController = require('../public/javascripts/cont.js');
const router = express.Router();

// gère les requêtes get sur la racine 
router.get('/', (req,res)=>{
    res.render('login',{message : "Connexion "});
});

router.post('/', authController.register);

module.exports = router;