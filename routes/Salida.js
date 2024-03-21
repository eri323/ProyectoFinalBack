import { Router } from "express";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import httpSalida from "../controllers/Salida.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersUsuario from "../helpers/Usuarios.js";
import helpersDestino from "../helpers/Destino.js";

const router = new Router();

router.get("/salidabusca", validarJWT, httpSalida.getAll);

router.get(
    "/salidabuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el ID").not().isEmpty(),
        check("id", "No es un Mongo ID válido").isMongoId(),
        validarCampos,
    ],
    httpSalida.getSalidasId
);

router.get('/salidanumero', validarJWT, httpSalida.getSalidaNumero)

router.post(
    "/salidacrear",
    [
        validarJWT,
        check("Bodeguero_id", "Digite el ID del bodeguero")
            .not()
            .isEmpty(),
        check("Bodeguero_id", "No es un Mongo ID válido").isMongoId(),
        check("Bodeguero_id").custom(helpersUsuario.existeHolderById),
        check("Pedido_id", "Digite la ficha").not().isEmpty(),
        check("Pedido_id", "No es un Mongo ID válido").isMongoId(),
        check("Pedido_id").custom(helpersDestino.existeId),
        validarCampos,
    ],
    httpSalida.postSalida
);

router.put(
    "/editar/:id",
    [
        validarJWT,
        check("id", "Digite el ID").not().isEmpty(),
        check("id", "No es un Mongo ID válido").isMongoId(),
        check("Bodeguero_id", "Digite el ID del bodeguero")
            .not()
            .isEmpty(),
        check("Bodeguero_id", "No es un Mongo ID válido").isMongoId(),
        check("Bodeguero_id").custom(helpersUsuario.existeHolderById),
        check("Pedido_id", "Digite la ficha").not().isEmpty(),
        check("Pedido_id", "No es un Mongo ID válido").isMongoId(),
        check("Pedido_id").custom(helpersDestino.existeId),
        validarCampos,
    ],
    httpSalida.putSalida
);

export default router;
