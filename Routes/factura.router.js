const express = require("express");
const FacturaController = require("../Controllers/factura.controller");
const factura = express.Router();
const multer = require("multer");


// =====================================================
// MULTER PARA IMÁGENES
// =====================================================

const upload = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 5 * 1024 * 1024
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
            cb(new Error("Solo se permiten imágenes JPG, JPEG, PNG o WEBP"), false);
        }
    }
});


// =====================================================
// MULTER PARA PDF
// =====================================================

const PDF = multer({
    storage: multer.memoryStorage(),

    limits: {
        fileSize: 10 * 1024 * 1024
    },

    fileFilter: (req, file, cb) => {

        if (file.mimetype === "application/pdf") {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten archivos PDF"), false);
        }
    }
});


// =====================================================
// FACTURAS
// =====================================================

factura.post(
    "/crearFactura",
    FacturaController.CrearFactura
);

factura.post(
    "/EnviarFacturaFisica/:id",
    FacturaController.EnviarFacturaFisica
);

factura.get(
    "/ObtenerFacturas/:id",
    FacturaController.ObtenerFacturas
);

factura.get(
    "/ConsultarFactura/:id",
    FacturaController.ConsultarFactura
);

factura.get(
    "/ObtenerFacturaCompleta/:id",
    FacturaController.ObtenerFacturaCompleta
);


// =====================================================
// CLIENTES
// =====================================================

factura.get(
    "/ObtenerClientes/:id",
    FacturaController.ObtenerClientes
);

factura.get(
    "/ObtenerClientesConFacturas/:usuario_id",
    FacturaController.ObtenerClientesConFacturas
);


// =====================================================
// PRODUCTOS
// =====================================================

factura.post(
    "/CrearProducto",
    upload.single("imagen"),
    FacturaController.CrearProducto
);

factura.get(
    "/ObtenerProductos/:id",
    FacturaController.ObtenerProductos
);

factura.put(
    "/ActualizarProducto/:id",
    upload.single("imagen"),
    FacturaController.ActualizarProducto
);

factura.put(
    "/subirFotoProducto",
    FacturaController.subirFotoProducto
);

factura.delete(
    "/EliminarProducto/:id",
    FacturaController.EliminarProducto
);


// =====================================================
// PDF
// =====================================================

factura.put(
    "/SubirPDF/:id",
    PDF.single("pdf"),
    FacturaController.SubirPDF
);


// =====================================================
// PAGOS Y REPORTES
// =====================================================

factura.put(
    "/PagarFactura/:id",
    FacturaController.PagarFactura
);

factura.get(
    "/VentasMensuales/:id",
    FacturaController.VentasMensuales
);

factura.get(
    "/VentasPorProducto/:id",
    FacturaController.VentasPorProducto
);

factura.get(
    "/DetalleFactura",
    FacturaController.DetalleFactura
);

factura.get(
    "/ObtenerDashboard/:id",
    FacturaController.ObtenerDashboard
);


// =====================================================
// ELIMINAR FACTURA
// =====================================================

factura.delete(
    "/EliminarFactura/:id",
    FacturaController.EliminarFactura
);


module.exports = factura;