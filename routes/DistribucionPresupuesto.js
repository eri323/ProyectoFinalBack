import { Router } from "express";
import { check } from "express-validator";
import httpDistribucionPresupuesto from "../controllers/DistribucionPresupuesto.js"; 
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();

routers.get('/dispresupuestobusca', [validarCampos], httpDistribucionPresupuesto.getDistribucionPresupuesto); 

routers.get('/dispresupuestobuscaid/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.getDistribucionPresupuestoId); 

routers.post('/dispresupuestocrear', [ 
    check("Presupuesto", "Indique un presupuesto").not().isEmpty(), 
    check("Lote_id", "Se necesita el lote presupuesto").not().isEmpty(), 
    check("ItemPresupuesto_id", "Se necesita el ItemPresupuesto_id").not().isEmpty(), 
    validarCampos
  ], httpDistribucionPresupuesto.postDistribucionPresupuesto); 

routers.put('/dispresupuestomodificar/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuesto); 

routers.put('/dispresupuestoinac/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoInactivar); // Cambio de rtbuses.putBusInactivar a httpDistribucionPresupuesto.putAreaInactivar

routers.put('/dispresupuestoact/:id', [ // Cambio de /activarBus/:id a /activarArea/:id
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpDistribucionPresupuesto.putDistribucionPresupuestoActivar);

export default routers;
