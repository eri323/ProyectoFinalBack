import { Router } from "express";
import { check } from "express-validator";
import httpLote from "../controllers/Lote.js";
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();

routers.get('/lotebusca', [validarCampos], httpLote.getLote);

routers.get('/lotebuscaid/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  validarCampos
], httpLote.getLoteId);

routers.post('/lotecrear', [
  check("Nombre", "Nombre del lote").not().isEmpty(),
  validarCampos
], httpLote.postLote);

routers.put('/lotemodificar/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  check("Nombre", "Digite el nombre").not().isEmpty(),
  validarCampos
], httpLote.putLote);

routers.put('/loteinac/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  validarCampos
], httpLote.putLoteInactivar);

routers.put('/loteact/:id', [
  check("id", "Digite el id").not().isEmpty(),
  check("id", "Digite el id").isMongoId(),
  validarCampos
], httpLote.putLoteActivar);

export default routers;
