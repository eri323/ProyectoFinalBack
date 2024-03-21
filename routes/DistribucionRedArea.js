import { Router } from "express";
import httpDisRedArea from "../controllers/DistribucionRedArea.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersDisRedArea from "../helpers/DistribucionRedArea.js";

const router = new Router();

router.get("/disredareabusca", [validarJWT], httpDisRedArea.getDisRedArea);

router.get(
    "/disredareabuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es mongo ID").isMongoId(),
        validarCampos,
    ],
    httpDisRedArea.getDisRedAreaId
);

router.get('/disredareabuscadistribucion/:DistribucionPresupuesto_id', [
    validarJWT,
    validarRolAdmin,
    check('DsitribucionDependenciaRed_id', 'Campo Vacio').not().isEmpty(),
    check('DsitribucionDependenciaRed_id', 'Valor no Valido').isMongoId(),
    validarCampos
], httpDisRedArea.getDisRedAreaIdDistribucion)

router.post(
    "/agregar",
    [
        validarJWT,
        validarRolAdmin,
        check("Presupuesto", "Digite el Presupuesto").not().isEmpty(),
        check("Presupuesto", "El Presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
        check("DsitribucionDependenciaRed_id", "Campo Distribucion Vacio").not().isEmpty(),
        check("DsitribucionDependenciaRed_id", "Valor no valido").isMongoId(),
        check("DsitribucionDependenciaRed_id", "Ya existe").custom(helpersDisRedArea.existeDistribucion),
        check("AreaTematica_id", "Campo Ficha Vacio").not().isEmpty(),
        check("AreaTematica_id", "Valor no Valido").isMongoId(),
        validarCampos,
    ],
    httpDisRedArea.postDisRedArea
);


// router.put('/ajustarPresupuesto/:id',[
//   validarJWT,
//   validarRolAdmin,
//   check("id", "Digite el id").not().isEmpty(),
//   check("id", "No es mongo ID").isMongoId(),
//   check("Presupuesto","No hay ningun Presupuesto").not().isEmpty(),
//   validarCampos,
// ], httpDisDependenciaRed.putAjustarPresupuesto)

router.put(
    "/editar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es mongo ID").isMongoId(),
        check("Presupuesto", "Digite el Presupuesto").not().isEmpty(),
        check("Presupuesto", "El Presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto),
        check("DsitribucionDependenciaRed_id", "Campo Distribucion Vacio").not().isEmpty(),
        check("DsitribucionDependenciaRed_id", "Valor no valido").isMongoId(),
        check("DsitribucionDependenciaRed_id", "Ya existe").custom(helpersDisRedArea.existeDistribucion),
        check("AreaTematica_id", "Campo Ficha Vacio").not().isEmpty(),
        check("AreaTematica_id", "Valor no Valido").isMongoId(),
        validarCampos,
    ],
    httpDisRedArea.putDisRedArea
    )

router.put(
    "/inactivar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es mongo ID").isMongoId(),
        validarCampos,
    ],
    httpDisRedArea.putInactivar
);
router.put(
    "/activar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es mongo ID").isMongoId(),
        validarCampos,
    ],
    httpDisRedArea.putActivar
);

export default router;
