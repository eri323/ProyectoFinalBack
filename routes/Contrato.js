import { Router } from "express"
import httpContrato from "../controllers/Contrato.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersContrato from "../helpers/Contrato.js";

const router=new Router()

// Get
router.get('/contratobusca', validarJWT, httpContrato.getContrato)
router.get('/contratobuscanombre/:Nombre', validarJWT, httpContrato.getPorNombre) 
router.get('/contratobuscaid/:id', [ 
  validarJWT,
  validarRolAdmin,
  check('id', 'Digite el id').not().isEmpty(),
  check('id', 'Digite el id').isMongoId(),
  validarCampos,
], httpContrato.getContratoId) 


// Post
router.post('/contratocrear',[
  validarJWT,
  validarRolAdmin,
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check('Nombre').custom(helpersContrato.existeNombre),
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersContrato.existeCodigo),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpContrato.postContrato)

// Put
router.put('/contratomodificar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("Nombre", "Ingrese un Nombre").not().isEmpty(),
    check('Nombre').custom(helpersContrato.existeNombre),
    check("Codigo", "Ingrese un Codigo").not().isEmpty(),
    check('Codigo').custom(helpersContrato.existeCodigo),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpContrato.putContrato)

/* router.put('/ajustarPresupuesto/:id',[
  validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
],httpContrato.putAjustarPresupuesto) */

router.put('/inactivar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpContrato.putInactivar)

router.put('/activar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpContrato.putActivar)

export default router