const cors = require("cors");
const express = require("express");
const UsuarioControllers = require("../Controllers/usuario.controller");
const { VerificarToken, TokenRol } = require("../Jwt/jwt");
const router = express.Router();
const multer = require("multer");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// ============================================
// MULTER
// ============================================

const imagen = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 5 * 1024 * 1024 
    },
    fileFilter: (req, file, cb) => {

        const tiposPermitidos = [
            "image/jpeg",
            "image/png",
            "image/jpg",
            "image/webp"
        ];

        if (tiposPermitidos.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error("Solo se permiten imágenes JPG, JPEG, PNG o WEBP"));
        }
    }
});


// ============================================
// USUARIOS
// ============================================

router.post("/crear", UsuarioControllers.CrearUsuario);

router.post("/CrearCliente", UsuarioControllers.CrearCliente);

router.get(
    "/consultar/:id",
    VerificarToken,
    TokenRol([1]),
    UsuarioControllers.ConsultarUsuarios
);

router.get(
    "/ObtenerUsuarios",
    UsuarioControllers.ObtenerUsuarios
);


// ============================================
// CLIENTES
// ============================================

router.get(
    "/ObtenerClientes",
    UsuarioControllers.ObtenerClientes
);


// ============================================
// ACTUALIZAR USUARIO
// ============================================

router.put(
    "/actualizar/:id",
    UsuarioControllers.ActualizarUsuarios
);

// ============================================
// ACTUALIZAR CLIENTES
// ============================================

router.put("/ActualizarClientes/:id",UsuarioControllers.ActualizarClientes);

// ============================================
// SUBIR FOTO
// ============================================

router.put(
    "/SubirFoto/:id",
    imagen.single("foto"),
    UsuarioControllers.SubirFoto
);


// ============================================
// ESTADO
// ============================================

router.put(
    "/CambiarEstado/:id",
    UsuarioControllers.CambiarEstado
);


// ============================================
// PERFIL
// ============================================

router.put(
    "/ActualizarPerfil/:id",
    UsuarioControllers.ActualizarPerfil
);


// ============================================
// ELIMINAR USUARIO
// ============================================

router.delete(
    "/eliminar/:id",
    VerificarToken,
    TokenRol([1]),
    UsuarioControllers.EliminarUsuarios
);


// ============================================
// ELIMINAR CLIENTE
// ============================================

router.delete(
    "/EliminarClientes/:id",
    UsuarioControllers.EliminarClientes
);


// ============================================
// LOGIN
// ============================================

router.post(
    "/login",
    UsuarioControllers.LoginUsuario
);


// ============================================
// RECUPERAR CONTRASEÑA
// ============================================

router.post(
    "/RecuperarPassword",
    UsuarioControllers.RecuperarPassword
);


// ============================================
// REESTABLECER CONTRASEÑA
// ============================================

router.post(
    "/ReestablecerPassword",
    UsuarioControllers.ReestablecerPassword
);


module.exports = router;