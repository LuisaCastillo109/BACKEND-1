const cors = require ("cors");
const express = require ("express");
const bodyParser = require ("body-parser");
const FacturaController = require("../Controllers/factura.controller")
const factura = express.Router();
const multer = require("multer");
const path = require("path");

const app = express();
app.use (cors());
app.use (bodyParser.json());

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024 // 5 MB máximo
    },

    fileFilter: (req, file, cb) => {

        const tiposPermitidos = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(
                new Error("Solo se permiten imágenes JPG, JPEG, PNG o WEBP"),
                false
            );
        }
    }
});


// =====================================================
// MULTER PARA PDF
// =====================================================

const PDF = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024 // 10 MB máximo
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(
                new Error("Solo se permiten archivos PDF"),
                false
            );
        }
    }
});


factura.post("/crearFactura",FacturaController.CrearFactura);
factura.post("/EnviarFacturaFisica/:id",FacturaController.EnviarFacturaFisica);
factura.post("/CrearProducto", upload.single("imagen"),FacturaController.CrearProducto);
factura.get("/ObtenerFacturas/:id",FacturaController.ObtenerFacturas);
factura.get("/ConsultarFactura/:id",FacturaController.ConsultarFactura);
factura.get("/ObtenerClientesConFacturas/:usuario_id",FacturaController.ObtenerClientesConFacturas);
factura.get("/ObtenerFacturaCompleta/:id",FacturaController.ObtenerFacturaCompleta);
factura.get("/ObtenerClientes/:id",FacturaController.ObtenerClientes);
factura.get("/VentasMensuales/:id",FacturaController.VentasMensuales);
factura.get("/DetalleFactura",FacturaController.DetalleFactura);
factura.get("/VentasPorProducto/:id",FacturaController.VentasPorProducto);
factura.put("/PagarFactura/:id",FacturaController.PagarFactura);
factura.put("/SubirPDF/:id", PDF.single("pdf"),FacturaController.SubirPDF);
factura.put("/ActualizarProducto/:id", upload.single("imagen"), FacturaController.ActualizarProducto);
factura.put("/subirFotoProducto",FacturaController.subirFotoProducto);
factura.delete("/EliminarFactura/:id",FacturaController.EliminarFactura);
factura.delete("/EliminarProducto/:id",FacturaController.EliminarProducto);
factura.get("/ObtenerProductos/:id",FacturaController.ObtenerProductos);
factura.get("/ObtenerDashboard/:id",FacturaController.ObtenerDashboard);

module.exports = factura;




