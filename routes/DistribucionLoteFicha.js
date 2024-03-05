import { Router } from "express";
import { check } from "express-validator";
import httpDistribucionLoteFicha from "../controllers/DistribucionLoteFicha.js"; 
import validarCampos from "../middelwares/validarcampos.js"
import helpersDistLoteFicha from "../helpers/DistribucionLoteFicha.js";


const routers = Router();
routers.get('/dislotefichabusca', [
  validarCampos
], httpDistribucionLoteFicha.getDistribucionLoteFicha)

routers.get('/dislotefichabuscaid/:id',[
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  validarCampos,
], httpDistribucionLoteFicha.getDistribucionLoteFichaId);

routers.get('/distribucion/:DistribucionPresupuesto_id',[
  check('DistribucionPresupuesto_id','Digite el id de la distribucion').not().isEmpty(),
  check('DistribucionPresupuesto_id','Digite el id de la distribucion').isMongoId(),
  validarCampos
],httpDistribucionLoteFicha.getByIdDistribucion);

routers.post('/dislotefichacrear', [ 
  check("Presupuesto", "Cual es el presupuesto").not().isEmpty(), 
  check("DistribucionPresupuesto_id", "Cual es el id presupuesto").not().isEmpty(),
  check("DistribucionPresupuesto_id", "Cual es el id presupuesto").isMongoId(),  
  check("Ficha_id", "Cual es el id ficha").not().isEmpty(), 
  check("Ficha_id", "Cual es el id ficha").isMongoId(), 
  check("Ficha_id", "Presupuesto no valido").custom(helpersDistLoteFicha.existeDistribucion),
  validarCampos
],httpDistribucionLoteFicha .postDistribucionLoteFicha); 


routers.put('dislotefichamodificar/:id',[
  check("id", "Digite el id").not().isEmpty(),
  check("Presupuesto", "Digite el presupuesto").not().isEmpty(),
  check("DistribucionPresupuestoid", "Digite el id del presupuesto").not().isEmpty(),
  check("Fichaid", "Digite la ficha id").not().isEmpty(),
  validarCampos
], httpDistribucionLoteFicha.putDistribucionLoteFicha);


routers.put('dislotefichainc/:id',[
  check("id", "Digite el id").not().isEmpty(),
  validarCampos
], httpDistribucionLoteFicha. putDistribucionLoteFichaInactivar);

routers.put('dislotefichaact/:id', [
  check("id", "Digite el id").not().isEmpty(),
  validarCampos
], httpDistribucionLoteFicha.putDistribucionLoteFichaInactivar);


export default routers;