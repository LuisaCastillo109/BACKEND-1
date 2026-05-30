const cors = require("cors");
const express = require("express");
const router = require("../Routes/usuario.router");
const factura = require("../Routes/factura.router");

const app = express();

app.use(cors());

// 🔥 ESTO ES LO QUE TE FALTA
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);
app.use("/", factura);

const PORT = process.env.PORT || 3014;

app.listen(PORT, () => {
  console.log(`Servidor corriendo por el puerto ${PORT}`);
});