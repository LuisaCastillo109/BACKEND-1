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
app.use ("/uploads", express.static(dir))
app.use ("/pdf", express.static(path.join(__dirname,"pdf")))
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.listen(PORT, () => {
  console.log(`Servidor corriendo por el puerto ${PORT}`);
});