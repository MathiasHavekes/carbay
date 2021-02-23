const mysql = require ('mysql');
exports.register = (req, res) =>{
    const db = mysql.createConnection({
        host: process.env.host,
        user: process.env.user,
        password: process.env.password,
        database :process.env.Database,
    })
    var btn = req.body.button;
    console.log(btn);
    if(btn == "Creation"){
        const {Nom, Prénom, Password, Email, Téléphone}  = req.body;
        console.log(btn);
    db.query('SELECT Email FROM client  WHERE Email= ?', [Email], async (error, result) =>{        
        if(error){
            console.log(error);
        }
        if(result.length > 0){
            console.log('Cet Email est deja utilisé');
            return  res.render('signUp');         
        }
        db.query('INSERT INTO client SET ?', {Nom: Nom,Prénom: Prénom, Password: Password,Email:Email, Téléphone: Téléphone}, (error, result) =>{ 
            if(error){
                console.log(error);
            }else{
                return res.render('index'); 
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
            return res.render('index');            
        }
        else {
            console.log('Identifiants incorrects');
            return res.render('logIn'); 
        }
    });
    }
};