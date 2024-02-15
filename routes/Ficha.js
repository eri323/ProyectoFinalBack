import { Router } from "express";
import { check } from "express-validator";
import httpFicha from "../controllers/Ficha.js"; 
import helpersGeneral from "../helpers/General.js";
import validarCampos from "../middelwares/validarcampos.js"
import helpersFicha from "../helpers/Ficha.js";

const routers = Router();

routers.get('/fichabusca', [validarCampos], httpFicha.getFichas); 

routers.get('/fichabuscaid/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpFicha.getFichaById); 

routers.post('/fichacrear', [ 
    check("CodigoFicha", "Ingrese codigo ficha").not().isEmpty(), 
    check("CodigoFicha").custom(helpersFicha.validarFichaUnica), 
    check("Nombre", "Ingrese nombre ficha").not().isEmpty(),
    check("Nombre").custom(helpersGeneral.verificarEspacios), 

    check("NivelFormacion", "Ingrese NivelFormacion").not().isEmpty(), 
    check("FechaInicio", "Ingrese Fecha Inicio").not().isEmpty(),
    check("FechaFin", "Ingrese Fecha Fin ").not().isEmpty(),  
    check("Area_Id", "Ingrese Area_Id").not().isEmpty(), 
    validarCampos
], httpFicha.postFicha); 

routers.put('/fichamodificar/:id', [ 
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    check("CodigoFicha", "Ingrese CodigoFicha").not().isEmpty(), 
    check('CodigoFicha').custom((value, { req }) => {
        const { id } = req.params;
        return helpersFicha.validarFichaUnicaEditar(id, value);
    }),
    check("Nombre", "Ingrese Nombre").not().isEmpty(),
    check("Nombre").custom(helpersGeneral.verificarEspacios),  
    check("NivelFormacion", "Ingrese Nivel de formacion").not().isEmpty(), 
    check("FechaInicio", "Ingrese Fecha Inicio").not().isEmpty(),
    check("FechaFin", "Ingrese Fecha Fin ").not().isEmpty(),  
    check("Area_Id", "Ingrese Area_Id").not().isEmpty().isMongoId(), 
    validarCampos
  ], httpFicha.putFicha); 

routers.put('/fichainac/:id', [ 
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    validarCampos
], httpFicha.putFichaInactivar);

routers.put('/fichaact/:id', [
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    validarCampos
], httpFicha.putFichaActivar);

export default routers;
