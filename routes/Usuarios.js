import { Router } from "express";
import { check } from "express-validator";
import httpUsuario from "../controllers/Usuarios.js";
import validarCampos from "../middelwares/validarcampos.js";

import helpersUsuario from "../helpers/Usuarios.js";

const routers = Router();


routers.get('/usuariobusca', [validarCampos], httpUsuario.getUsuarios);

routers.get('/usuariobuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    validarCampos
], httpUsuario.getUsuariosId);


routers.post('/login', [validarCampos], httpUsuario.login)


routers.post("/recuperar-password", httpUsuario.recuperarPassword);


routers.post("/confirmarcodigo/:codigo", httpUsuario.confirmarCodigo);


routers.put("/nuevaPassword", [
    check('Correo').custom(helpersUsuario.CorreoExistente2),
    validarCampos
], httpUsuario.nuevaPassword)

routers.post('/usuariocrear', [
    check("Nombre", "Ingrese nombre Usuario").not().isEmpty(),
    check("Identificacion", "Ingrese su identificacion").not().isEmpty(),
    check("Telefono", "Ingrese su numero de telefono").not().isEmpty(),
    check("Correo", "Ingrese su correo").not().isEmpty(),
    check("Contraseña", "Ingrese su contraseña ").not().isEmpty(),
    check("Rol", "ingrese su rol").not().isEmpty(),
    check("Rol").custom(helpersUsuario.validarRol),
    check("Contraseña").custom(helpersUsuario.validarPassword),
    validarCampos
], httpUsuario.postUsuarios);

routers.put('/usuariomodificar/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("Nombre", "Ingrese nombre Usuario").not().isEmpty(),
    check("Identificacion", "Ingrese su identificacion").not().isEmpty(),
    check("Identificacion").custom(helpersUsuario.IdentificacionExistente),
    check("Telefono", "Ingrese su numero de telefono").not().isEmpty(),
    check("Telefono").custom(helpersUsuario.TelefonoExistente),
    check("Correo", "Ingrese su correo").not().isEmpty(),
    check("Correo").custom(helpersUsuario.CorreoExistente),
    check("Contraseña", "Ingrese su contraseña ").not().isEmpty(),
    check("Rol", "ingrese su rol").not().isEmpty(),
    validarCampos
], httpUsuario.putUsuarios);

routers.put('/usuarioinac/:id', [
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    validarCampos
], httpUsuario.putUsuariosInactivar);

routers.put('/usuarioact/:id', [
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    validarCampos
], httpUsuario.putUsuariosActivar);

export default routers;