import { Router } from "express";
import { check } from "express-validator";
import httpItemPresupuesto from "../controllers/ItemPresupuesto.js";
import validarCampos from "../middelwares/validarcampos.js";

const routers = Router();

routers.get(
  "/itempresubusca",
  [validarCampos],
  httpItemPresupuesto.getItemPresupuesto
);

routers.get(
  "/itempresubuscaid/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
  ],
  httpItemPresupuesto.getItemPresupuestoId
);

routers.post(
  "/itempresucrear",
  [
    check("Nombre", "Nombre del área").not().isEmpty(),
    check("Presupuesto", "Digite el nombre del presupuesto").not().isEmpty(),
    validarCampos,
  ],
  httpItemPresupuesto.postItemPresupuesto
);

routers.put(
  "/itempresumodificar/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    check("presupuesto", "Presupuesto es requerido").not().isEmpty(),
    check("distribucionpresupuestoid", "Distribucion presupuesto es requerido")
      .not()
      .isEmpty(),
    check("fichaid", "La ficha id es requerida ").not().isEmpty().isMongoId(),
    validarCampos,
  ],
  httpItemPresupuesto.putItemPresupuesto
);

routers.put(
  "/itempresuinac/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
  ],
  httpItemPresupuesto.putItemPresupuestoInactivar
);

routers.put(
  "/itempresuact/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos,
  ],
  httpItemPresupuesto.putItemPresupuestoActivar
);

export default routers;
