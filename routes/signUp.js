const express = require("express");
const authController = require('./cont.js');
const router = express.Router();

// gère les requêtes get sur la racine 
router.get('/', (req,res)=>{
    res.render('signUp');
});

router.post('/', authController.register);

module.exports = router;