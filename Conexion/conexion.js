const mysql2 = require ("mysql");
const cors = require ("cors");
const express = require ("express");
const bodyParser = require ("body-parser");

const app = express();
app.use (cors());
app.use (bodyParser.json());

const db = mysql.createConnection({
host : process.env.DB_HOST,
user : process.env.DB_USER,
password: process.env.DB_PASSWORD,
database: process.env.DB_NAME,
port : process.env.DB_PORT || 3306
});

db.connect((err)=>{
if (err){
console.log("DB ERROR COMPLETO:", err)
return 
}
console.log("Conectado a la base de datos")
});

module.exports = db;
