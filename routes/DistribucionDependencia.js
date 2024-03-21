import { Router } from "express"
import httpDisDependencia from "../controllers/DistribucionDependencia.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersDistribucionDepenencia from "../helpers/DistribucionDependencias.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router()

// Get
router.get('/disdepbusca', validarJWT, httpDisDependencia.getDisDependencias)
router.get('/disdepbuscaid/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'Digite el id de la distribucion').not().isEmpty(),
    check('id', 'Digite el id de la distribucion').isMongoId(),
    validarCampos
], httpDisDependencia.getDisDependenciasId)

// router.get('/distribucion/:idItem',[
//     validarJWT,
//     validarRolAdmin,
//     check('idItem','Digite el id de la distribucion').not().isEmpty(),
//     check('idItem','Digite el id de la distribucion').isMongoId(),
//     validarCampos
// ],httpDisDependencia.getDistribucionesById)
// Post
router.post('/disdepcrear', [
    validarJWT,
    validarRolAdmin,
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Dependencia_id", "ID no válido").not().isEmpty(),
    check("Dependencia_id", "ID no válido").isMongoId(),
    check("Dependencia_id", "ID no válido").custom(helpersDistribucionDepenencia.existeDistribucion),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisDependencia.postDisDependencias)

// Put
router.put('/disdepmodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Dependencia_id", "ID no válido").not().isEmpty(),
    check("Dependencia_id", "ID no válido").isMongoId(),
    check("Dependencia_id", "ID no válido").custom(helpersDistribucionDepenencia.existeDistribucion),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisDependencia.putDisDependencia)

router.put('/ajustarpresupuesto/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisDependencia.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependencia.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependencia.putActivar)

export default router
