import { Router } from "express"
import httpDisDependenciaRed from "../controllers/DistribucionDependenciaRed.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersDisDependenciaRed from "../helpers/disDependenciaRed.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router()


router.get('/disdepredbusca', validarJWT, httpDisDependenciaRed.getDisDepRed)
router.get('/disdepredbuscaid/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'Digite el id de la distribucion').not().isEmpty(),
    check('id', 'Digite el id de la distribucion').isMongoId(),
    validarCampos
], httpDisDependenciaRed.getDistribucionById)

/* router.get('/distribucion/:idItem', [
    validarJWT,
    validarRolAdmin,
    check('idItem', 'Digite el id de la distribucion').not().isEmpty(),
    check('idItem', 'Digite el id de la distribucion').isMongoId(),
    validarCampos
], httpDisDependenciaRed.getDisDepRedId) */

router.post('/disdepredcrear', [
    validarJWT,
    validarRolAdmin,
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Dependencia_id", "ID no válido").not().isEmpty(),
    check("Dependencia_id", "ID no válido").isMongoId(),
    check("Dependencia_id", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("Red_id", "ID no válido").not().isEmpty(),
    check("Red_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisDependenciaRed.postDisDepRed)

// Put
router.put('/disdepredmodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Dependencia_id", "ID no válido").not().isEmpty(),
    check("Dependencia_id", "ID no válido").isMongoId(),
    check("Dependencia_id", "ID no válido").custom(helpersDisDependenciaRed.existeDistribucion),
    check("Red_id", "ID no válido").not().isEmpty(),
    check("Red_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisDependenciaRed.putDisDepRed)

router.put('/ajustarpresupuesto/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisDependenciaRed.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependenciaRed.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisDependenciaRed.putActivar)

export default router
