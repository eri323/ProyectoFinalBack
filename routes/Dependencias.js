import { Router } from "express"
import httpDependecia from "../controllers/Dependecias.js";
import { check } from "express-validator";
import validarCampos from "../middlewares/validarcampos.js"
import { validarJWT } from "../middlewares/validar-jwt.js";
import helpersPresupuesto from "../helpers/Presupuesto.js";
import { validarRolAdmin } from "../middlewares/validar-rol.js";
import helpersDependencia from "../helpers/Dependencias.js";

const router=new Router()

// Get
router.get('/dependeciabusca', validarJWT, httpDependecia.getDependencia)
router.get('/dependeciabuscanombre/:Nombre', validarJWT, httpDependecia.getDependenciaNombre) 
router.get('/dependeciabuscaid/:id', [ 
  validarJWT,
  validarRolAdmin,
  check('id', 'Digite el id').not().isEmpty(),
  check('id', 'Digite el id').isMongoId(),
  validarCampos,
], httpDependecia.getDependenciaId) 


// Post
router.post('/dependenciacrear',[
  validarJWT,
  validarRolAdmin,
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersDependencia.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersDependencia.existeCodigo),
    check("presupuesto", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuesto", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
],httpDependecia.postDependencia)

// Put
router.put('/dependenciamodificar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    check("nombre", "Ingrese un nombre").not().isEmpty(),
    check('nombre').custom(helpersDependencia.existeNombre),
    check("codigo", "Ingrese un codigo").not().isEmpty(),
    check('codigo').custom(helpersDependencia.existeCodigo),
    check("presupuestoAsignado", "Ingrese un presupuesto").not().isEmpty(),
    check("presupuestoAsignado", "El presupuesto debe ser mayor a 0").custom(helpersPresupuesto.validarPresupuesto), 
    check('year', 'Ingrese un año').not().isEmpty(),
    validarCampos
], httpDependecia.putEditar)

router.put('/ajustarPresupuesto/:id',[
  validarJWT,
    validarRolAdmin,
    check("id", "Digite el id").not().isEmpty(),
    check("id", "No es mongo ID").isMongoId(),
    check("presupuestoAsignado","No hay ningun presupuesto").not().isEmpty(),
    validarCampos,
],httpDependecia.putAjustarPresupuesto)

router.put('/inactivar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDependecia.putInactivar)

router.put('/activar/:id', [
  validarJWT,
  validarRolAdmin,
    check("id", "ID no válido").isMongoId(),
    validarCampos
], httpDependecia.putActivar)

export default router