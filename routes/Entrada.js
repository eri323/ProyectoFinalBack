import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import httpEntrada from "../controllers/Entrada.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
/* import helpersEntrada from "../helpers/entrada.js"; */

const router = new Router();

router.get("/entradabusca", validarJWT, httpEntrada.getEntrada);

router.get(
    "/entradabuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "El id es invalido").isMongoId(),
    ],
    httpEntrada.getEntradaId
);

router.post(
    "/entradacrear",
    [
        validarJWT,
        validarRolAdmin,
        check("cantidad", "Digite cantidad").not().isEmpty(),
        /*     check("cantidad", "").custom(
              helpersEntrada.validarEntradaUnica
            ), */
        check("idProducto", "Por favor digite un producto existente").isMongoId(),
        check("total", "Por favor digite un total").not().isEmpty(),
        validarCampos,
    ],
    httpEntrada.postEntrada
);

router.put(
    "/entradamodificar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "Digite el ID").not().isEmpty(),
        check("cantidad", "Digite cantidad").not().isEmpty(),
        /*     check("cantidad", "").custom(
              helpersEntrada.validarEntradaUnica
            ), */
        check("idProducto", "Por favor digite un producto existente").isMongoId(),
        check("total", "Por favor digite un total").not().isEmpty(),
        validarCampos,
    ],
    httpEntrada.putEntrada
);

router.put(
    "/inactivar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "No exite ID en la petición").not().isEmpty(),
        check("id", "No es Mongo ID").isMongoId(),
        validarCampos,
    ],
    httpEntrada.putInactivar
);

router.put(
    "/activar/:id",
    [
        validarJWT,
        validarRolAdmin,
        check("id", "No exite ID en la petición").not().isEmpty(),
        check("id", "No es Mongo ID").isMongoId(),
        validarCampos,
    ],
    httpEntrada.putActivar
);

export default router;
