import { Router } from "express"
import httpRedConocimiento from "../controllers/RedConocimiento.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersRedConocimiento from "../helpers/RedConocimiento.js";

const router = new Router()

// Get
router.get('/redconocimientobusca', validarJWT, httpRedConocimiento.getAll)
router.get('/redconocimientobuscanombre/:Nombre', validarJWT, httpRedConocimiento.getPorNombre)

// Post
router.post('/redconocimentocrear', [
    validarJWT,
    validarRolAdmin,
    check("Nombre", "Ingrese un nombre").not().isEmpty(),
    check('Nombre').custom(helpersRedConocimiento.existeNombre),
    validarCampos
], httpRedConocimiento.postRedConocimiento)

// Put
router.put('/redconocimientomodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "ID no válido").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("Nombre", "Ingrese un nombre").not().isEmpty(),
    check('Nombre').custom(helpersRedConocimiento.existeNombre),
    validarCampos
], httpRedConocimiento.putRedConocimiento)


router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpRedConocimiento.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpRedConocimiento.putActivar)

export default router