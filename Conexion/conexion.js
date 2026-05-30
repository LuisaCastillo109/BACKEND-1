const mysql= require ("mysql2");
const cors = require ("cors");
const express = require ("express");
const bodyParser = require ("body-parser");

const app = express();
app.use (cors());
app.use (bodyParser.json());

const db = mysql.createConnection(process.env.DATABASE_URL);

db.connect((err) => {
  if (err) {
    console.log("DB ERROR COMPLETO:", err);
    return;
  }
  console.log("Conectado a la base de datos");
});

module.exports = db;