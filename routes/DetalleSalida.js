import { Router } from "express";
import httpDetSalida from "../controllers/DetalleSalida.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDetSalida from "../helpers/detSalida.js";
import helpersSalida from "../helpers/salida.js";

const router = new Router();

router.get("/detsalidabusca", [validarJWT], httpDetSalida.getDetalleSalida);

router.get(
    "/detsalidabuscaid/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check("id").custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.getDetalleSalidaById
);

router.get("/detsalidabuscasalida/:Salida_id", [
    validarJWT,
    check("Salida_id", "Ingrese el salida").not().isEmpty(),
    check("Salida_id", "Id de salida no válida").isMongoId(),
    check("Salida_id").custom(helpersSalida.existeId),
    validarCampos,
], httpDetSalida.getDetalleSalidaBySalida);

router.post(
    "/detsalidacrear",
    [
        validarJWT,
        check("cantidad", "Digite la Cantidad").not().isEmpty(),
        check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
        check("Salida_id", "Digite el id del salida").not().isEmpty(),
        check("Salida_id", "No es Mongo Id").isMongoId(),
        check("Salida_id").custom(helpersSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.postDetalleSalida
);

router.put(
    "/detsalidamodificar/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check("Salida_id").custom(helpersDetSalida.existeId),
        check("cantidad", "Digite la Cantidad").not().isEmpty(),
        check("cantidad", "Tipo de dato no válido para cantidad").isNumeric(),
        validarCampos,
    ],
    httpDetSalida.putDetalleSalida
);

router.put(
    "/inactivar/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check('id').custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.putInactivar
);

router.put(
    "/activar/:id",
    [
        validarJWT,
        check("id", "Digite el id").not().isEmpty(),
        check("id", "No es Mongo Id").isMongoId(),
        check('id').custom(helpersDetSalida.existeId),
        validarCampos,
    ],
    httpDetSalida.putActivar
);

export default router;
