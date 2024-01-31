import { Router } from "express";
import { check } from "express-validator";
import httpFicha from "../controllers/Ficha.js"; 
import validarCampos from "../middelwares/validarcampos.js"

const routers = Router();

routers.get('/fichabusca', [validarCampos], httpFicha.getFichas); 

routers.get('/fichabuscaid/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpFicha.getFichaById); 

routers.post('/fichacrear', [ 
    check("CodigoFicha", "Ingrese codigo ficha").not().isEmpty(), 
    check("Nombre", "Ingrese nombre ficha").not().isEmpty(), 
    check("NivelFormacion", "Ingrese NivelFormacion").not().isEmpty(), 
    check("FechaInicio", "Ingrese Fecha Inicio").not().isEmpty(),
    check("FechaFin", "Ingrese Fecha Fin ").not().isEmpty(),  
    check("Area_Id", "Ingrese Area_Id").not().isEmpty(), 
    validarCampos
], httpFicha.postFicha); 

routers.put('/fichamodificar/:id', [ 
    check("id", "Digite el id").not().isEmpty().isMongoId(),
    check("CodigoFicha", "Ingrese CodigoFicha").not().isEmpty(), 
    check("Nombre", "Ingrese Nombre").not().isEmpty(), 
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
