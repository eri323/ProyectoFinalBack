import { Router } from "express"
import httpDisContratoLote from "../controllers/DistribucionContratoLote.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersDisContratoLote from "../helpers/disContratoLote.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router()

// Get
router.get('/disconlotebusca', validarJWT, httpDisContratoLote.getDisConLote)
router.get('/disconlotebuscaid/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'Digite el id de la distribucion').not().isEmpty(),
    check('id', 'Digite el id de la distribucion').isMongoId(),
    validarCampos
], httpDisContratoLote.getDisConLoteById)

// router.get('/distribucion/:idItem',[
//     validarJWT,
//     validarRolAdmin,
//     check('idItem','Digite el id de la distribucion').not().isEmpty(),
//     check('idItem','Digite el id de la distribucion').isMongoId(),
//     validarCampos
// ],httpDisContratoLote.getDistribucionesById)
// Post
router.post('/disconlotecrear', [
    validarJWT,
    validarRolAdmin,
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Contrato_id", "ID no válido").not().isEmpty(),
    check("Contrato_id", "ID no válido").isMongoId(),
    check("Contrato_id", "ID no válido").custom(helpersDisContratoLote.existeDistribucion),
    check("Lote_id", "ID no válido").not().isEmpty(),
    check("Lote_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisContratoLote.postDisConLote)

// Put
router.put('/disconlotemodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Contrato_id", "ID no válido").not().isEmpty(),
    check("Contrato_id", "ID no válido").isMongoId(),
    check("Contrato_id", "ID no válido").custom(helpersDisContratoLote.existeDistribucion),
    check("Lote_id", "ID no válido").not().isEmpty(),
    check("Lote_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisContratoLote.putDisConLote)

router.put('/ajustarpresupuesto/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisContratoLote.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisContratoLote.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisContratoLote.putActivar)

export default router
