const mysql = require ('mysql');

// traitement de l'authentification
exports.register = (req, res) =>{
    const db = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database :process.env.Database,
    })
    var btn = req.body.button;
    console.log(btn);
    // recuperation des information du formulaire
    if(btn == "Creation"){
        const {Nom, Prénom, Password, Email, Téléphone}  = req.body;
    db.query('SELECT Email FROM client  WHERE Email= ?', [Email], async (error, result) =>{        
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            console.log('Cet Email est deja utilisé');
            return res.render('sign_up');            
        }
        db.query('INSERT INTO client SET ?', {Nom: Nom,Prénom: Prénom, Password: Password,Email:Email, Téléphone: Téléphone}, (error, result) =>{ 
            if(error){
                console.log(error);
            }else{
                return res.render('log_in'); 
            }             
        }
    )})};
    if(btn == "Connexion"){
    const { Email, Password}  = req.body;
    console.log(Email +" "+ Password);
    db.query('SELECT Email FROM client  WHERE Email= ? and Password =?', [Email, Password], async (error, result) =>{        
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            console.log('Connexion Réussie');
            return res.render('log_in');            
        }
        else {
            console.log('Identifiants incorrects');
            return res.render('log_in'); 
        }
    });
    }
};