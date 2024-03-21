import { Router } from "express"
import httpDestino from "../controllers/Destino.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validar.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersDestino from "../helpers/Destino.js";

const router = new Router()

router.get('/destinobusca', [
    validarJWT
], httpDestino.getDestino)

router.get('/destinobuscaid/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
], httpDestino.getDestinoById)

router.get('/destinobuscaestado/:Estado', [
    validarJWT,
    check('Estado', "Digite el estado").not().isEmpty(),
], httpDestino.getDestinoEstado)

router.post('/destinocrear', [
    validarJWT,
    check('Codigo', "Digite el codigo de la destino").not().isEmpty(),
    check('Codigo', "Ya existe una destino con este codigo").custom(helpersDestino.validarFichaUnica),
    check('Nombre', "Digite el nombre de la destino").not().isEmpty(),
    check('NivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('FechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('FechaInicio', "Fecha Invalida").custom(helpersDestino.validarFechas),
    check('FechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('Area_id', "Digite el ID del área").not().isEmpty(),
    check('Area_id', "No es Mongo ID").isMongoId(),
    validarCampos
], httpDestino.postDestino)

router.put('/destinomodificar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check('Codigo', "Digite el Codigo de la destino").not().isEmpty(),
    check('Codigo', "Ya existe una destino con este Codigo").custom((value, { req }) => {
        const { id } = req.params;
        return helpersDestino.validarFichaUnicaEditar(id, value);
    }),
    check('Nombre', "Digite el nombre de la destino").not().isEmpty(),
    check('NivelFormacion', "Digite el nivel de formacion").not().isEmpty(),
    check('FechaInicio', "Digite la fecha de Inicio").not().isEmpty(),
    check('FechaFin', "Digite la fecha de fin").not().isEmpty(),
    check('Area_id', "Digite el ID del área").not().isEmpty(),
    check('Area_id', "No es Mongo ID").isMongoId(),
    validarCampos
], httpDestino.putDestino)

router.put('/inactivar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
], httpDestino.putInactivar)

router.put('/activar/:id', [
    validarJWT,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    validarCampos
], httpDestino.putActivar)

export default router
