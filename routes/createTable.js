const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "oracle3gs!",
  database: "mydb",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  let sql =
    "requete sql voulu";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log("Table created");
  });
});
