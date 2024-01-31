import { Router } from "express";
import { check } from "express-validator";
import httpDistribucionLoteFicha from "../controllers/DistribucionLoteFicha.js"; 
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();
routers.get('/dislotefichabusca', [
  validarCampos
], httpDistribucionLoteFicha.getDistribucionLoteFicha)

routers.get('/dislotefichabuscaid/:id',[
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  validarCampos
], httpDistribucionLoteFicha.getDistribucionLoteFichaId);

routers.post('/dislotefichacrear', [ 
  check("Presupuesto", "Cual es el presupuesto").not().isEmpty(), 
  check("DistribucionPresupuesto_id", "Cual es el id presupuesto").not().isEmpty().isMongoId(), 
  check("Ficha_id", "Cual es el id ficha").not().isEmpty().isMongoId(), 
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