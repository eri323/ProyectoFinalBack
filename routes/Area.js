import { Router } from "express";
import { check } from "express-validator";
import httpArea from "../controllers/Area.js"; 
import validarCampos from "../middelwares/validarcampos.js"
const routers = Router();

routers.get('/areabusca', [validarCampos],
   
httpArea.getArea); 

routers.get('/areabuscaid/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpArea.getAreaId); 

routers.post('/areacrear', [ 
    check("Nombre", "Nombre del área").not().isEmpty(), 
    validarCampos
], httpArea.postArea); 

routers.put('/areamodificar/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpArea.putArea); 

routers.put('/areainac/:id', [ 
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpArea.putAreaInactivar);

routers.put('/areaact/:id', [
    check("id", "Digite el id").not().isEmpty(),
    check("id", "Digite el id").isMongoId(),
    validarCampos
], httpArea.putAreaActivar);

export default routers;
