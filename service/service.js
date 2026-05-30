const cors = require ("cors");
const express = require ("express");
const router = require ("../Routes/usuario.router");
const factura = require ("../Routes/factura.router")
const path = require ("path")
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("../service/swagger");
const PORT = process.env.PORT ||3014
const dir = path.join(__dirname, "uploads")

const app = express();
app.use (cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use ("/",router);
app.use ("/",factura)
app.use ("/uploads", express.static(dir))
app.use ("/pdf", express.static(path.join(__dirname,"pdf")))
app.use("/api-docs",swaggerUi.serve,swaggerUi.setup(swaggerSpec));

app.listen(PORT,()=>{
console.log(`Servidor corriendo por el puerto ${PORT}`)
});



