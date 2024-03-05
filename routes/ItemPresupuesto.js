import { Router } from "express";
import { check } from "express-validator";
import httpItemPresupuesto from "../controllers/ItemPresupuesto.js";
import validarCampos from "../middelwares/validarcampos.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import helpersItem from "../helpers/itemPresupuesto.js";

const routers = Router();

routers.get(
  "/itempresubusca",
  [validarCampos],
  httpItemPresupuesto.getItemPresupuesto
);

routers.get('/buscarNombre/:Nombre', httpItemPresupuesto.getPorNombre)

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
    check("Nombre", "Nombre del programa").not().isEmpty(),
    check('Nombre').custom(helpersItem.existeNombre),
    check("Presupuesto", "Digite la cantidad del presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    validarCampos,
  ],
  httpItemPresupuesto.postItemPresupuesto
);

routers.put(
  "/itempresumodificar/:id",
  [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("Nombre", "Nombre del programa").not().isEmpty(),
    check('Nombre').custom(helpersItem.existeNombre),
    check("Presupuesto", "Presupuesto es requerido").not().isEmpty(),
    check("Presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
    validarCampos,
  ],
  httpItemPresupuesto.putItemPresupuesto
);

routers.put('/ajustarPresupuesto/:id',[
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("Presupuesto","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
],httpItemPresupuesto.putAjustarPresupuesto)

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
