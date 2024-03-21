import { Router } from "express"
import httpDisAreaDestino from "../controllers/DistribucionAreaDestino.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersDisAreaDestino from "../helpers/disAreaDestino.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";

const router = new Router()


router.get('/disareadestinobusca', validarJWT, httpDisAreaDestino.getDisAreaDestino)
router.get('/disareadestinobuscaid/:id', [
    validarJWT,
    validarRolAdmin,
    check('id', 'Digite el id de la distribucion').not().isEmpty(),
    check('id', 'Digite el id de la distribucion').isMongoId(),
    validarCampos
], httpDisAreaDestino.getDisAreaDestinoById)

// router.get('/distribucion/:idItem',[
//     validarJWT,
//     validarRolAdmin,
//     check('idItem','Digite el id de la distribucion').not().isEmpty(),
//     check('idItem','Digite el id de la distribucion').isMongoId(),
//     validarCampos
// ],httpDisAreaDestino.getDistribucionesById)

router.post('/disareadestinocrear', [
    validarJWT,
    validarRolAdmin,
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Destino_id", "ID no válido").not().isEmpty(),
    check("Destino_id", "ID no válido").isMongoId(),
    check("Destino_id", "ID no válido").custom(helpersDisAreaDestino.existeDistribucion),
    check("DistribucionRedArea_id", "ID no válido").not().isEmpty(),
    check("DistribucionRedArea_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisAreaDestino.postDisAreaDestino)


router.put('/disareadestinomodificar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    check("PresupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("PresupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    check("Destino_id", "ID no válido").not().isEmpty(),
    check("Destino_id", "ID no válido").isMongoId(),
    check("Destino_id", "ID no válido").custom(helpersDisAreaDestino.existeDistribucion),
    check("DistribucionRedArea_id", "ID no válido").not().isEmpty(),
    check("DistribucionRedArea_id", "ID no válido").isMongoId(),
    check('Año', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDisAreaDestino.putDisAreaDestino)

router.put('/ajustarpresupuesto/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("PresupuestoAsignado", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDisAreaDestino.putAjustarPresupuesto)

router.put('/inactivar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisAreaDestino.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    validarRolAdmin,
    check("id", "Digitel el ID").not().isEmpty(),
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDisAreaDestino.putActivar)

export default router
