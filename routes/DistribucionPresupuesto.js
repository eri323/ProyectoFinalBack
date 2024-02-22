import { Router } from "express";
import { check } from "express-validator";
import httpDistribucionPresupuesto from "../controllers/DistribucionPresupuesto.js";
import validarCampos from "../middelwares/validarcampos.js"
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersDisPresupuesto from "../helpers/DistribucionPresupuesto.js";

const routers = Router();

routers.get('/dispresupuestobusca', [validarCampos], httpDistribucionPresupuesto.getDistribucionPresupuesto);

routers.get('/dispresupuestobuscaid/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.getDistribucionPresupuestoId);

routers.post('/dispresupuestocrear', [
    check("Presupuesto", "Indique un presupuesto").not().isEmpty(),
    // check("Presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    // check("Presupuesto").custom(helpersPresupuesto.obtenerDistribucionPresupuestoPorId),
    check("Lote_id", "Se necesita el lote").not().isEmpty(),
    check("Lote_id", "No es Mongo Id").isMongoId(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").not().isEmpty(),
    check("ItemPresupuesto_id", "No es Mongo Id").isMongoId(),
    check("ItemPresupuesto_id", "No es Mongo Id").custom(helpersPresupuesto.obtenerDistribucionPresupuestoPorId),
    check("ItemPresupuesto_id").custom(helpersDisPresupuesto.validarDisPreUnica),
    validarCampos
], httpDistribucionPresupuesto.postDistribucionPresupuesto);

routers.put('/dispresupuestomodificar/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    check("Presupuesto", "Indique un presupuesto").not().isEmpty(),
    check("Presupuesto").custom(helpersPresupuesto.validarPresupuesto),
    check("Presupuesto").custom(helpersPresupuesto.obtenerDistribucionPresupuestoPorId),
    check("Lote_id", "Se necesita el lote").not().isEmpty(),
    check("Lote_id", "No es Mongo Id").isMongoId(),
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").not().isEmpty(),
    check("ItemPresupuesto_id", "No es Mongo Id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuesto);

routers.put('/ajustarPresupuesto/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuesto", "No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
], httpDistribucionPresupuesto.putAjustarPresupuesto)


routers.put('/dispresupuestoinac/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoInactivar);


routers.put('/dispresupuestoact/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es Mongo Id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoActivar);

export default routers;